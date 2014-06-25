
<!-- A Backbone-JQuery Mobile skeleton project -->

I've been playing around with integrating Backbone and jQuery Mobile. I'm
planning on using them as the framework for implementing a mobile version of
[FuelMyRoute](http://fuelmyroute.com).

I started with Christophe Coenraets'
[backbone-jquerymobile](https://github.com/ccoenraets/backbone-jquerymobile)
sample app and made changes to bring it up to date with the most recent versions
of jQuery Mobile and jQuery.  I also made a couple different design choices.  In
this post I'll go over the changes I made.

# jQuery.on

A couple of jQuery's event listener methods were removed in 1.9: `live` and
`bind`. I updated several event listeners, like the `mobileinit` event listener,
to use [jQuery.on](http://api.jquery.com/on/) instead.

# mobileinit

To configure jQuery Mobile, you set up a listener for the `mobileinit` event and
set properties on the `$.mobile` object.  Here's what I have so far.

    $(document).on("mobileinit", function () {
        $.mobile.ajaxEnabled = false;
        $.mobile.linkBindingEnabled = false;
        $.mobile.hashListeningEnabled = false;
        $.mobile.pushStateEnabled = false;
        $.mobile.autoInitializePage = false;
    });

This is identical to Coenraets' config except that I also added setting
`autoInitializePage` to false. We'll get to that in a bit.  The other settings
are there to turn off the routing and *link hijacking* behaviour in jQuery
Mobile so we can use Backbone for routing instead. Coenraets explains [in his
blog post on the
topic](http://coenraets.org/blog/2012/03/using-backbone-js-with-jquery-mobile/)
and [the jQuery Mobile project also has notes on integrating with
Backbone](http://demos.jquerymobile.com/1.4.2/backbone-requirejs/).

# autoInitializePage

By default jQuery Mobile will call `initializePage()` when it starts up.
`initializePage()` is important because it initializes the pagecontainer and
sets up navigation events.  It will try to find the first div with
data-role="page" and change to that page. If there isn't a page in the DOM, it
will create an initial dummy page. This generally works out fine if you are
using jQuery Mobile in the more typical way where you have multiple pages
defined in the one page. However, with our Backbone integration, there isn't any
page until the router runs and injects the first page into the DOM so it doesn't
make sense to automatically call `initializePage()`.

So what I did was set `autoInitializePage` to false. The Router will call
`initializePage()` after it adds the first page to the DOM.

    var AppRouter = Backbone.Router.extend({

        ...
        changePage:function (page) {
            // Render and add page to DOM once
            if ($('#'+page.id).length === 0) {
                $('body').append(page.render().$el);
            }
            if (this.firstPage) {
                // We turned off $.mobile.autoInitializePage, but now that we've
                // added our first page to the DOM, we can now call initializePage.
                $.mobile.initializePage();
                this.firstPage = false;
            }
            $( ":mobile-pagecontainer" ).pagecontainer( "change", page.$el,
                    { changeHash: false });
        }
        ...
    });


# Managing Pages as Views

There are a couple different ways to go when managing page Views. You could
`remove` them and recreate them each time or you could not `remove` them and
just let jQuery Mobile hide and show them.  Coenraets went with the "recreate
each time" approach. I went with the approach of letting jQuery Mobile hide and
show pages.  My page Views are rendered and then added to the DOM once.

I did this because it seems a better fit with jQuery Mobile.  Also I think there
is a performance benefit on mobile to keeping DOM manipulations to a minimum.

However, I am still concerned about my page Views being bound to models even
when they aren't being shown.  Offscreen pages might re-render unnecessarily due
to model/collection updates.

I might add to my router the ability to let pages know when they are being
hidden or shown and that would allow a page to deal with offscreen rendering
performance issues. One thing a page View might do is unbind its listeners when
being hidden and rebind them when being shown again, which might be appropriate
if intermediate events can be safely ignored.  Another thing a page View might
do when not being shown is continue to listen for events but defer any
re-rendering until actually shown.  I'll explore this more as needed, but I need
a real world example to guide the design.

# Enhancing pages

I did a little exploration into how you would handle jQuery Mobile enhancement
if you re-rendered page.  Basically, whenever render() is called, the page needs
to be re-enhanced. jQuery Mobile will automatically enhance a page the first
time it is changed to, but after that you need to call it yourself. I
implemented a `View` base class I call [PageView](https://github.com/machristie/backbone-jquerymobile/blob/master/js/views/PageView.js) that has an `enhance` method.
It allows you to implement `render` like so:

    render: function () {
        // do some rendering
        // ...
        this.enhance(); // See PageView.enhance for details
        return this;
    }

Keep in mind, though, re-rendering and re-enhancing the entire page is
discouraged for performance reasons.


# Minor stuff

* $.mobile.changePage is deprecated. I switched to the `change` method on the
  `pagecontainer`. See the `changePage` method on the AppRouter above.
* Instead of `<div data-role="content">`, use `<div class="ui-content"
  role="main">`
* Contrary to Coenraets, I didn't find I needed to disable the first page
  transition, so I removed that code.
* I also switched to project to use Bower and RequireJS to manage dependencies.
* I never got around to dealing with transitions. Delegating routing to Backbone
  means you miss out on the declarative transition stuff in jQuery Mobile. I'm
  thinking that eventually I might add a `transitions` hash to the Router that
  would allow you to define page to page transitions, something like

        :::javascript
        transitions: {
            'page1:page2':  'slide',
            // etc...
        }
