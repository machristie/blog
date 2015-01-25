
<!--
Title: Handling DOM Events in Ember Views
Target pub date: TBD
-->

Ember Views can respond to DOM events by [implementing functions named after
those events](http://emberjs.com/guides/views/handling-events/). For example, if
in your Ember View you want to handle *click* events then you implement a
function named `click`. This function then gets invoked to handle any and all
*click* events on your View.

Often this is too coarse grained.  What do you do if you want to listen in your
View class for clicks on only one element within your view?

There are probably several ways to do this in Ember, but a fairly elegant
solution I found the other day is to add a child view that encapsulate the part
of your view that you want to have handle a specific event.

For this example, I have several text input but on one of them I want to run
validation when focus leaves that text input.  To make it a little more concrete
let's say we're making an account registration form.

Other example ideas?
* unique username: but pretty sure you can use computed properties for this sort
  of thing
* email validation: same thing
* keypress ENTER is a pretty good case
    * oops, no it isn't. {{inputs}} can have actions
* what about a focusOut validator?

We could just say that this is a contrived example.

Oops! {{inputs}} can have actions: http://emberjs.com/guides/getting-started/creating-a-new-model/
