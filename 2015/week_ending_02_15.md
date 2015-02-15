
<!--
Title: From the Notebook: An Ember Bootstrap Modal Dialog and How to Deal with
state in Ember controllers
-->

# Bootstrap Modal Dialog for Ember

To create a Bootstrap styled modal dialog for an Ember app at work, I mostly
[followed the Ember cookbook entry on modal
dialogs](http://emberjs.com/guides/cookbook/user_interface_and_interaction/using_modal_dialogs/).
One difference is using Bootstrap for the modal dialog, of course. Here are the
steps I took.

1. Added a modal outlet to the application template

        :::html+handlebars
        {{outlet}}
        {{outlet modal}}

2. On my ApplicationRoute.js I have the following:

        :::javascript
        actions: {
            openModal: function(modalName, model) {

                return this.render(modalName, {

                    into: 'application',
                    outlet: 'modal',
                    model: model
                });
            },

            closeModal: function() {

                return this.disconnectOutlet({

                    outlet: 'modal',
                    parentView: 'application'
                });
            }
        }

    This allows me to pass a model to the modal.  One implication of this is that
    the modal view needs to have a corresponding Controller so that Ember can set
    the model on that Controller.  It appears that by default Ember Routes will
    supply an ArrayController or ObjectController for routes that don't have one
    defined, but the same doesn't hold for these non-route views.

3. I then defined a `modal-dialog` component, but also split out `modal-body`
   and `modal-footer` components since those are the ones I'm expecting to
   customize from modal dialog to modal dialog.

        :::html+handlebars
        <script type="text/x-handlebars" data-template-name="components/modal-dialog">
            <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="dialogTitle" aria-hidden="true">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"
                            aria-label="Close"> <span
                            aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="dialogTitle">{{title}}</h4>
                    </div>
                    {{yield}}
                </div>
                </div>
            </div>
        </script>

        <script type="text/x-handlebars" data-template-name="components/modal-body">
            <div class="modal-body">
                {{yield}}
            </div>
        </script>

        <script type="text/x-handlebars" data-template-name="components/modal-footer">
            <div class="modal-footer">
                {{yield}}
            </div>
        </script>

4. For the component code I need to call `.modal()` on the modal dialog to pop
   it up. I also wanted to handle the Bootstrap modal closed event and then
   remove the modal from the DOM (i.e., disconnect the outlet).  Removing the
   modal from the DOM is not strictly necessary I guess, but I think it is nice
   to remove it from the DOM when it is no longer needed. If it is rendering a
   model, there's no point for the hidden modal to re-render when that model
   changes.

        :::javascript
        App.ModalDialogComponent = Ember.Component.extend({
            sendCloseAction: function(){
                this.sendAction('close');
            },
            didInsertElement: function() {
                this.$('.modal').modal();
                this.$('.modal').on('hidden.bs.modal', this.sendCloseAction.bind(this));
            },
            willDestroyElement: function() {
                this.$('.modal').off('hidden.bs.modal');
            }
        });

5. To use it, just need to create a view that uses the `modal-dialog` component.

        :::html+handlebars
        <script type="text/x-handlebars" data-template-name="myModal">
            {{#modal-dialog close="closeModal" title=title}}
                {{#modal-body}}
                    {{message}}
                {{/modal-body}}
                {{#modal-footer}}
                    <button type="button" class="btn btn-default" {{action 'save'}}>Save</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                {{/modal-footer}}
            {{/modal-dialog}}
        </script>

    One problem I ran into was that Components can only send actions based on
    names that they are given.  My ModalDialogComponent can't call
    `this.sendAction('closeModal')` and have that be handled by the
    ApplicationRoute.  Instead ModalDialogComponent calls
    `this.sendAction('close')` where the actual named action to send is
    specified in the view using the component.  Here in the myModal template I'm
    specifying that for *close* the component should send the *closeModal*
    action. See [Sending Actions from Components to Your
    Application](http://emberjs.com/guides/components/sending-actions-from-components-to-your-application/)
    for more details.


# Ember Controllers Are Singletons

One surprising thing about Ember for me as I've been learning over the past
couple months is that Controllers are (kind of, sort of) singletons.  Ember
instantiates a controller for a route once.  So any state in a Controller is
*sticky*. But often times you'll want to reset the state in your Controller when
switching from one model to another. So what to do?

Found a couple of interesting blogs regarding this problem:

* [Case Against Ember Controllers](http://gregbabiars.com/case-against-ember-controllers/)
* [Ember Gotcha: Controllers Are Singletons](http://balinterdi.com/2014/06/26/ember-gotcha-controllers-are-singletons.html)

Both suggest resetting the controller in Route's `setupController` as one way to
address this problem. (Note: Ember.Route also has a `resetController` hook;
haven't used it but seems to cover exactly this need.) Balint Erdi's post has an
interesting idea about having the reset logic in the Controller itself and having it
observe some property that can be used to trigger a reset.

When thinking about Controller state and Routes, and where to put this state, it
occurs to me that there are 3 kinds of view state. A view might want to take
advantage of all 3 types of view state.

1. **Transient view state**

    This is view state that you don't want to be sticky at all.  Maybe
    expanding/collapsing an accordion type view, or form validation error display.

    Basically, if the model changes, you want to reset this the transient state.
    For this you can define a resetState function that is called whenever the model
    changes.

        :::javascript
        resetState: function(){
            // reset transient stuff here
        }.observes("model")

2. **Sticky state, but not serialized to the URL**

    This would be view state that you want to be sticky so that when the user
    moves from view to view this state remains. However, for whatever reason,
    you don't want to serialize this state to a Route URL.  *This is the default
    way that Ember works.*

    Can't actually think of a good example here. Maybe a sub-view that you
    expand or show and as you move through different models you want to keep
    showing that sub-view?

3. **Sticky state that should be serialized to the URL**

    If you have some view state that you want to be persistent, then you should
    really think about moving that to the Route and serializing to the URL.  If
    that works for your use case, then you can do that and move that view state
    out of the Controller entirely.

To me, #1 is a more common type of view state than #2, so it seems weird that
the default for Ember Controllers is #2. However, the fact that Ember
Controllers are singletons makes #2 possible and then one just needs to reset
state to make #1 work.  If Ember Controllers weren't singletons, its hard to see
where #2 style view state would be stored.

# Odds and Ends

* **Console2: a better Windows console.** I played around with setting up
  Console2 to get a better console window than `cmd.exe`.  The following were
  helpful resources

    * [http://www.hanselman.com/blog/Console2ABetterWindowsCommandPrompt.aspx](http://www.hanselman.com/blog/Console2ABetterWindowsCommandPrompt.aspx)
    * [http://www.kevwebdev.com/blog/in-search-of-a-better-windows-console-using-ansicon-console2-and-git-bash.html](http://www.kevwebdev.com/blog/in-search-of-a-better-windows-console-using-ansicon-console2-and-git-bash.html)

    Here's what I like about Console2:

    * You can configure it to copy on select and paste with a right click.
    * You can resize the window (but you have to configure it to have more
      columns first, which is kind of weird). I sometimes like to have the
      console take up a full screen.
    * It is tabbed.
    * You can configure it to start a cmd shell or Git bash. I have Git bash as
      a default and hitting Ctrl+Shift+T opens a new Git bash tab.

* **Ember dot notation**. Learned that in Ember instead of doing

        :::javascript
        this.get('foo').get('bar').get('baz');

    You can do

        :::javascript
        this.get('foo.bar.baz');

    If `bar` is not defined, then the first one would fail but the second would
    return `undefined`.

* **Git: counting words in a specific revision of a file**.  I wanted to be able
  to count how many words are in a previous version of a blog post.  There might
  be a better way to do this, but here's how I did it.

    1. Get the file's blob hash.  You can do

            git log --raw -- path/to/file

        Seems the easiest way. This prints the before and after blob hash for
        each revision

            ...
            :100644 100644 c5d00fe... 2403611... M  path/to/file
            ...

        Where `2403611` is the blob hash for this revision and `c5d00fe` is the blob
        hash for the previous revision.

    2. cat the blob and count the words.  Getting the blob hash was the hard
       part, now we can simply do

            git cat-file -p 2403611 | wc -w


