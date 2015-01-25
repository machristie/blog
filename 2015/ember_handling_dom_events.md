
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
solution I found the other day is to add a child view that encapsulates the part
of your view that you want to have handle a specific event.

For this example, I have several text inputs but on one of them I want to run
validation when focus leaves that text input.  To make it a little more concrete
let's say we're making an account registration form. One of the text inputs will
be for providing a desired username. When focus leaves this text input I want to
check to see if this username is already used or not.

Let's start by creating the `RegistrationFormView`.

    :::javascript
    App.RegistrationFormView = Ember.View.extend({
        templateName: "registrationForm",

        focusOut: function(e){
            console.log("focusOut", e.target);
            if (e.target === document.getElementById('username')){
                console.log("focusOut event on username input");
                this.get('controller').send('validateUsername');
            }
        }
    });

And our controller, which will actually do the validation:

    :::javascript
    App.IndexController = Ember.ObjectController.extend({
        validUsername: null,

        showValidUsername: function(){

            return this.get('validUsername') !== null;
        }.property("validUsername"),

        actions: {
            validateUsername: function(){
            var username = this.get('username');
                this.set('validUsername',
                    username !== 'foo' && username !== 'bar');
            }
        }
    });


And the template is

    :::html
    <script type="text/x-handlebars" data-template-name="registrationForm">
        <p>
        Username:
        {{input id="username" type="text" value=username}}
        {{#if showValidUsername}}
        <span {{bind-attr class="validUsername:valid:invalid"}}/>
        {{/if}}
        </p>
        <p>
        Password:
        {{input id="password" type="password" value=password}}
        </p>
        <p>
        Confirm password:
        {{input id="confirmPassword" type="password" value=confirmPassword}}
        </p>
    </script>

`focusOut` will get called whenever focus leaves any of our text inputs in the
registration form. We can figure out which text input it was from `e.target`.
That's the technique used here: when `e.target` is the username input then the
`validateUsername` action is sent to the controller. As long as the username
isn't *foo* or *bar* it will validate as being available.

You can see it as a [JSBin in action
here](http://emberjs.jsbin.com/yegaqu/4/edit?html,js,output).

This works and everything, but it would be nice if we could have `focusOut`
called only for the *username* text input. We can do that with child views.

First, I'll create a child view for the username that is relative to the
RegistrationFormView:

    :::javascript
    App.RegistrationFormView = Ember.View.extend({
        templateName: "registrationForm",

        usernameView: Ember.View.extend({

            focusOut: function(e){
                this.get('controller').send('validateUsername');
            }
        })
    });

Then in my registrationForm template, I'll use a `{{view}}` helper to use the
`usernameView` for the username field part of the template:

    :::html
    <script type="text/x-handlebars" data-template-name="registrationForm">
        <p>
        Username:
        {{#view view.usernameView}}
            {{input id="username" type="text" value=username}}
        {{/view}}
        {{#if showValidUsername}}
            <span {{bind-attr class="validUsername:valid:invalid"}}/>
        {{/if}}
        </p>
        <p>
        Password:
        {{input id="password" type="password" value=password}}
        </p>
        <p>
        Confirm password:
        {{input id="confirmPassword" type="password" value=confirmPassword}}
        </p>
    </script>


Now my DOM event handling in my View is scoped to the exact part of the template
that it is meant to handle.

You can see this version as a [JSBin in action
here](http://emberjs.jsbin.com/yegaqu/5/edit?html,js,output).


Resources:

* You can read more about [inserting views into a template in the Ember
  docs](http://emberjs.com/guides/views/inserting-views-in-templates/).
* [Another example of this on
  StackOverflow](http://stackoverflow.com/a/25068266/1419499)

TODO:

* make sure syntax highlighting is good: HTML+handlebars?  Don't include script
  tags?
* Show the template first and then the view class and then controller?
