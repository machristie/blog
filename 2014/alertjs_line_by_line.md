At work I recently needed to write a jQuery plugin that uses Bootstrap styling, so
I looked at how
[alert.js](https://github.com/twbs/bootstrap/blob/master/js/alert.js) is
implemented, since it is a fairly small plugin.  In this post I'll go over
`alert.js` line by line, and do my best to explain what is going on. You should
have a decent understanding of JavaScript and some familiarity with jQuery, but
I'll assume no knowledge of how to write a jQuery plugin or anything specific to
Bootstrap.

#### Overview

Let's start with an overview of how the Alert plugin can be used. You can find
the [Bootstrap Alert plugin documentation here](http://getbootstrap.com/javascript/#alerts).
Essentially there are two ways to use Alerts, and this applies to other
Bootstrap plugins as well

1. **Use the jQuery plugin function directly.** For Alerts this looks like this

        :::javascript
        $(".alert").alert()

        // To close the alert:
        $(".alert").alert("close")

2. **Data API: use data-\* attributes to configure in a more declarative
   style.** For Alerts, the primary data attribute is `data-dismiss`

        :::html
        <button type="button" class="close" data-dismiss="alert"
            aria-hidden="true">&times;</button>

We'll see how the code in `alert.js` supports both of these styles.

#### What's this `+function` business?

Okay, let's start at the top. The first line of code is this

    :::javascript
    +function ($) {

We have an unnamed (anonymous) function, and a `+` in front of it. What's going
on there? For the moment let's ignore the body of this JavaScript function
definition and look at how this function gets invoked:

    :::javascript
    +function ($) {

        // ...

    }(jQuery);

This is an example of the [Immediately Invoked Function
Expression](http://benalman.com/news/2010/11/immediately-invoked-function-expression/)
(IIFE) pattern. The intent of an IIFE is to introduce stronger lexical scoping
in JavaScript and to allow for some functions defined within the IIFE to remain
*private*. There are several variations of this pattern. One way to do it is to
have the IIFE return an object with references to public functions while leaving
some functions private.  In this case, nothing is returned. Instead, the plugin
is added to the `jQuery` object.  Because nothing is returned by the IIFE, we
can use a trick to get the JavaScript interpreter to call our anonymous function
immediately, and that trick is to put an unary operator in front of the function
definition.

The sole argument passed to the function is `jQuery` for the `$` parameter.  Why
passing `jQuery` as the `$` parameter, why not just use `$` from the global
scope like so?

    :::javascript
    +function () {

        $('#foo').hide(); // etc...
    }();

We could do that, but that would only work as long as `$` refers to the `jQuery`
function.  There are other libraries that define the `$` reference, so in order
to interoperate with them we'll assume only that there is a `jQuery` reference
in the global scope.  But it's nice that we can essentially alias `jQuery` to
`$` within our plugin definition in a lexically scoped and tidy way.


#### `use strict`

The next line of `alert.js` is a String, `'use strict'`:

    :::javascript hl_lines="2"
    +function ($) {
        'use strict';

According to the [Strict mode article on the Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode)

> ECMAScript 5's strict mode is a way to opt in to a restricted variant of
> JavaScript. Strict mode isn't just a subset: it intentionally has different
> semantics from normal code.

Perl has something similar. `'use strict'` is a way of running your JavaScript
code through the interpreter in a less loosy-goosy manner. Here are some
benefits of running in strict mode:

* Impossible to accidentally create global variables (for example, mistyped
  variable names)
* Severals classes of silent errors become thrown exceptions
* Simplifies variable naming which allows JavaScript interpreters to better
  optimize code (for example, `eval` doesn't introduce new variables into the
  surrounding scope)
* Several security enhancing restrictions are added

See the linked article for more information.

#### Alert class definition

Now for the Alert class definition.  Our Alert class has a constructor and one
method, `close`. First, the `dismiss` variable is defined. This is a jQuery
selector that is used here in the constructor to bind to the click event from a
DOM element that matches this selector. The way this works is that any DOM
element that is `el` or a descendant of `el` that has a `data-dismiss` attribute
with value `alert` that fires a click event will be handled by `this.close`:

    :::javascript
    var dismiss = '[data-dismiss="alert"]'
    var Alert   = function (el) {
        $(el).on('click', dismiss, this.close)
    }


#### Alert `close` function

The `close` method is defined for the `Alert` class by adding it to `Alert`'s
prototype.  This method does the following:

1. Figure out the `$parent` element (i.e., the alert div) that should be
   closed.  There are a few different ways to determine the `$parent` and we'll
   look at those shortly.
2. Trigger a custom event before closing the `$parent` and one after it is
   closed.
3. Use a CSS3 transition to fade the `$parent` and then remove it.

##### Finding the `$parent` to close

First, figure out the `$parent` element.  Here's the first part of `close`:

    :::javascript
    Alert.prototype.close = function (e) {
        var $this    = $(this)
        var selector = $this.attr('data-target')

        if (!selector) {
            selector = $this.attr('href')
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
        }

        var $parent = $(selector)

        if (e) e.preventDefault()

        if (!$parent.length) {
            $parent = $this.hasClass('alert') ? $this : $this.parent()
        }
    // ...

In the first line of `close`, `this` refers to the element that is the target of
click event.  So in the standard case where you have a close `<button>` inside a
`<div class="alert">` element, `this` is the `<button>`.  However, `close` could
be called through the plugin function, as we'll see later, so `this` might refer
to the alert itself (`<div class="alert">`).  For now, we'll consider the case
that `this` refers to the close button.

The first option to check is a `data-target` attribute on the close button. The
value is expected to be a selector. You would use it like this:

    :::html hl_lines=3
    <div id="myalert">
        <button class="close" aria-hidden="true"
            data-target="#myalert"
            data-dismiss="alert" type="button">×</button>
        <strong>Holy guacamole!</strong>
        Best check yo self, you're not looking too good.
    </div>

Click on the button should cause `<div id="myalert">` to be closed.

The second option to check is the `href` attribute. This can be used likewise.

This line then checks to see if anything matches those options:

    :::javascript
    var $parent = $(selector)

If we haven't set `data-target` or `href` on our close button, or if we have but
they don't match anything, then `$parent` will have a length of 0.  That's what
is checked for next.  If we still haven't found `$parent` there are a couple
more things to try.

So the third option is to check to see if `$this` has class **alert**. If it does
then we assume that this is the element that should be faded and removed.  

The fourth option, the default if none of the other checks matched anything, is
to set `$parent` to the parent of `$this`.

Like I said earlier, it's possible for the `close` method to be called directly
in which case `$this` is the alert itself.  In that case, it is the third
option that would typically be used for figuring out the `$parent`.

##### Custom events for before and after closing

Before actually closing the alert, `close` dispatches a `close.bs.alert` event
on the `$parent` element.

    :::javascript
    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

The first line creates the custom event, using jQuery's `$.Event` and also sets
it to the variable `e`.  The name of the event, "close.bs.alert", utilizes
[jQuery event namespaces](https://api.jquery.com/on/).  This just makes it
possible to listen for the close event just from Bootstrap's Alert plugin by
binding to the `close.bs.alert` event. It also makes it easier in Bootstrap to
remove event handlers. For example, all of the following would work to remove an
event handler bound to `close.bs.alert`:

    :::javascript
    $(el).off('close.bs.alert');
    $(el).off('close.alert');
    $(el).off('close.bs');
    $(el).off('.bs.alert');
    $(el).off('.alert');
    $(el).off('.bs');

For removing, only one of the namespaces need match.  I put together a [JSFiddle
to demonstrate jQuery event namespaces](http://jsfiddle.net/machristie/eLKKb/)
that I think helps demonstrate how they work:

    :::javascript
    $(document).on('close.bs.alert', function() {
        console.log("close.bs.alert handler");
    });

    $(document).on('close.alert', function() {
        console.log("close.alert handler");
    });

    $(document).on('close.bs', function() {
        console.log("close.bs handler");
    });

    $(document).on('close', function() {
        console.log("close handler");
    });

    console.log("triggering close...");
    $(document).trigger('close'); // triggers 'close.bs.alert', 'close.alert',
                                  // 'close.bs' and 'close'

    console.log("triggering close.bs...");
    $(document).trigger('close.bs'); // triggers 'close.bs.alert' and 'close.bs'

    console.log("triggering close.alert...");
    $(document).trigger('close.alert'); // triggers 'close.bs.alert' and 
                                        // 'close.alert'

    console.log("triggering close.bs.alert...");
    $(document).trigger('close.bs.alert'); // triggers 'close.bs.alert'

    console.log("Remove close.alert handlers and triggering close...");
    $(document).off('close.alert'); // removes close.bs.alert and close.alert
    //$(document).off('.alert'); // removes close.bs.alert and close.alert as well
    $(document).trigger('close');   // triggers 'close.bs' and 'close'

So that's event namespacing and triggering the **close** event.  The next line
is to return if the **close** event had `preventDefault` called on it. The idea
is that a listener for the **close** event could call `e.preventDefault()` to
prevent the alert from actually closing.

The other custom event that the Alert plugin dispatches is the **closed** event
which is named `closed.bs.alert`.  It is dispatched when the Alert is actually
removed from the DOM. We'll see the code to trigger this event in the next
section where we'll look at how the Alert is faded out and removed from the DOM.

##### Removing and fading out the Alert

Now we'll look at how the Alert is faded out and removed from the DOM.

    :::javascript
    $parent.removeClass('in')

    function removeElement() {
      $parent.trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one($.support.transition.end, removeElement)
        .emulateTransitionEnd(150) :
      removeElement()

Fading out the Alert is accomplished by using a CSS3 transition. To understand
how it works, let's look at the CSS:

    :::css
    .fade {
        opacity: 0;
        transition: opacity 0.15s linear 0s;
    }
    .fade.in {
        opacity: 1;
    }

When an element has the **fade** and **in** classes, its opacity is 1 and when
it only has the **fade** class its opacity is 0. The `transition` CSS property
defines how quickly and in what way the `opacity` property changes from 0 to 1
when **in** is added to an element that already has **fade**.  In this case
however, the `close` method is removing the **in** class which causes the
opacity to transition, linearly, from 1 to 0, causing it to fade out of view and
become invisible.

Making the Alert invisible is not enough however. We want to actually remove it
from the DOM. If we don't then it will still take up space on the web page, it
just won't be visible.  To accomplish this we need to know when the transition
finishes.  Once the transition finishes we can then remove the Alert from the
DOM.

The `removeElement` function is defined so as to trigger the `closed.bs.alert`
and then remove the Alert from the DOM.  In an ideal world, we'd just bind the
**transitionend** event to the `removeElement` handler.  However there are a few
complications:

1. It's possible that the Alert doesn't have the **fade** class, in other words,
   it is not desired that it actually fade out.  That's fine, the transition is
   optional.  That's what is checked for with `$parent.hasClass('fade')`.
2. It's possible that this browser doesn't support CSS transitions. That's what
   `$.support.transition` is checking for. More on this later.
3. It's possible that even if the browser supports CSS transitions that it
   doesn't call the *transition end* event **transitionend**. The
   `$.support.transition.end` property holds the name of the *transition end*
   event for that browser.
4. Finally, it's possible that [the *transition end* event won't be
   called](http://blog.alexmaccaw.com/css-transitions).  So we need to
   programmatically dispatch the event if it isn't called. That's what
   `emulateTransitionEnd(150)` is doing.

You can see the tests Bootstrap does to determine the *transition end* event
name in
[transition.js](https://github.com/twbs/bootstrap/blob/master/js/transition.js).
Also defined in `transition.js` is the `emulateTransitionEnd` function.

So let's go line by line. First, we'll remove the **in** class which will start
the transition from opacity 1 to 0 over the course of 0.15 seconds.  Next,
define a function, `removeElement`, that will be called when the transition
finishes. We'll bind `removeElement` to the *transition end* event.

`removeElement` will trigger the `closed.bs.alert` event, the second custom
event, and it will remove the Alert from the DOM.

So next we have a ternary expression. If the browser supports transitions and
the alert (the `$parent`) has class **fade**, then bind `removeElement` to the
*transition end* event exactly once (`$parent.one(...)`). The call to
`emulateTransitionEnd(150)` will set a 150 millisecond timeout and dispatch the
*transition end* event if it hasn't already been dispatched (again, see
[transition.js](https://github.com/twbs/bootstrap/blob/master/js/transition.js)
for details).  If the browser doesn't support Transitions or `$parent` doesn't
have the **fade** class, then just call `removeElement`.

#### Alert jQuery Plugin Definition

Ok, a brief recap. We've defined the Alert class and it's single `close` method,
which does almost all of the heavy lifting for this plugin. Now it's time to
actually define the Alert class as a jQuery plugin. Here's the code:

    :::javascript
    var old = $.fn.alert

    $.fn.alert = function (option) {
        return this.each(function () {
            var $this = $(this)
            var data  = $this.data('bs.alert')

            if (!data) $this.data('bs.alert', (data = new Alert(this)))
            if (typeof option == 'string') data[option].call($this)
        })
    }

    $.fn.alert.Constructor = Alert

First thing here is to capture the current value of `$.fn.alert` into the `old`
variable.  This is used later in `noConflict`, and it just a way to prevent this
`alert` plugin from interfering with another `alert` plugin with the same name.

The `$.fn.alert` function is defined next. The way this function will be used is
like so

    :::javascript
    $('.alert').alert();

So `this` refers to the result of a jQuery selector, which means it is an Array
of DOM elements. So for each matching DOM element we'll run this function:

    :::javascript
    function() {
        var $this = $(this)
        var data  = $this.data('bs.alert')

        if (!data) $this.data('bs.alert', (data = new Alert(this)))
        if (typeof option == 'string') data[option].call($this)
    }

Within the scope of this function, `this` refers to the current DOM element.
`$this` is a jQuery wrapped reference to the DOM element.

When this function creates an `Alert` instance for this DOM element it will
store it as a reference associated with the DOM element.  `var data =
$this.data('bs.alert')` is checking if we've already created an `Alert` instance
for this DOM element.  The third line of the function creates the `Alert`
instance (`data = new Alert(this)`) if it hasn't already been created and it
will be saved to the **bs.alert** key:

    :::javascript
    if (!data) $this.data('bs.alert', (data = new Alert(this)))

Finally, you may have noticed that the plugin function accepts an `options`
argument.  This is a common jQuery plugin pattern. There aren't any actual
options for the `Alert` class, but `options` can also be a string with the name
of a method that you want to invoke on the `Alert` instance.  That's what is
being done here. `data`, remember, is a reference to the `Alert` instance.
`data[option]` therefore refers to a function on the `Alert` instance. It is
called with `$this` as the context (that is, within the method invoked by
`call`, `this` will refer to `$this`).

Also, as a jQuery plugin best practice, the result of calling `this.each` is
returned to enable chaining of jQuery function calls.

The other thing we haven't talked about yet is this line:

    :::javascript
    $.fn.alert.Constructor = Alert

See [this StackOverflow answer for a long
explanation](http://stackoverflow.com/a/10526115/1419499).  but, basically, if
we don't do this then the `Alert` constructor remains *private* to the closure
in which we defined it.  By creating the `Constructor` reference, other code can
directly instantiate an `Alert` instance without needing to invoke it indirectly
through the jQuery API.

#### Alert `noConflict`

Now we're at the `noConflict` function:

    :::javascript
    $.fn.alert.noConflict = function () {
        $.fn.alert = old
        return this
    }

This is a simple convention for handling the situation that there is another
jQuery plugin also called `alert`.  This function sets `$.fn.alert` to its old
value and returns `this` which refers to the `$.fn.alert` function defined
above.

#### Alert Data API

Finally we get to the Data API. This allows for purely declarative use of the
Alert plugin, no JavaScript calls necessary.

    :::javascript
    $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

This binds the 'click' event for any DOM element in the page matching the
`dismiss` selector to `Alert`'s `close` method.  Recall that the `dismiss`
selector was defined as `[data-dismiss="alert"]`.  So any clickable element in
the page that has the attribute `data-dismiss` with value **alert** will have
its *click* event handled by `Alert`'s `close` method.

The difference with the Data API is that there is no actual `Alert` instance
created. Instead `Alert.prototype.close` method is used directly, as a pure
function. The way `close` will be invoked in this case is basically identical to
how it will be invoked via the binding we see in the `Alert` constructor:

    :::javascript
    $(el).on('click', dismiss, this.close)


**Additional Resources**

* [Using CSS Transitions](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Using_CSS_transitions?redirectlocale=en-US&redirectslug=CSS%2FTutorials%2FUsing_CSS_transitions) - at Mozilla Developer Network
* [transitionend](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/transitionend)

