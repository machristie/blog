
[Backbone](http://backbonejs.org/) is a JavaScript Model-View-Controller (MVC)
library that can be used to create single page applications (SPAs). This article
introduces the most important concepts in Backbone (Models, Collections, Views,
Events, Router and Sync) and how they relate to building a client side
JavaScript application.

#### What is Model-View-Controller (MVC)?

Model-View-Controller might be one of the most misunderstood software patterns
ever.  I'm not even sure I really understand what the original idea was (at
least, what it meant to Smalltalk developers when first developed at Xerox
PARC), and of course it has evolved over time into several different closely
related ideas.

So this is far from authoritative, and I'll try to keep it simple.  To me, MVC
is a way to organize the implementation of a user interface in a way that
separates concerns.  Here, at a high level, are the various parts of a MVC
framework:

* **Model** - this is the representation of data that models the domain of
  interest.  For example, for a TODO application, a model might be a TODO item.
  But Models aren't just data structures, they also contain the domain logic. A
  TODO item might expose a `complete` method that knows how to mark a TODO item
  as completed and properly manage any additional details related to task
  completion.
* **View** - views are visual representations of models. A view reacts to
  changes in a model by updating the view to reflect that change.
* **Controller** - controllers handle user input, both displaying views that the
  user requests and handling keyboard and mouse events.  Controllers typically
  translate user input into updates on Model instances.

The goal is separation of concerns. Models know nothing of views; in a web
application, models would have nothing in them relating to HTML or CSS, for
example.  Views know only how to represent a model, but they contain no business
logic. Views respond to changes in a model, but know nothing of what the user is
doing.  Controllers are the only place in the application to handle things like
navigation through the application, display of multiple views at once,
transitions between views and translating user actions into model updates.  But
controllers don't contain business logic.

#### How does Backbone relate to traditional MVC?

The Backbone API has the following types:

* Events
* Model
* Collection
* View
* Router
* Sync

Where do each of these concepts fit into the traditional MVC pattern?

`Backbone.Events` are the primary mechanism for loose coupling between the
models and views. Backbone Views bind to changes on the Models or Collections.

`Backbone.Model` and `Backbone.Collection` are the M of MVC: these types can be
extended to provide the data and the implementation of domain logic for the
application.

`Backbone.View` classes are a little V and a little C when compare to classical
MVC. `Backbone.View` contains a `render` method that is responsible for
generating/updating the DOM that is the view of the model, and for doing so it
is typical to have a template. The template is more the V of MVC than the View
class. `Backbone.View` also acts as a Controller in that it binds user events to
methods on the View class that will update Models.

`Backbone.Router` is also fairly controller-ish in the traditional MVC
understanding.  The Router responds to user requests for specific URLs and can
handle them by showing the right type of Views and by making sure that Model
instances are available.

`Backbone.sync` is the RESTful persistence mechanism for saving/updating models.
In Backbone, the models (Model and Collection instances) know how to persist
themselves (which endpoint to call, how to serialize/deserialize, etc.). In that
sense, `sync` is more in the M of MVC than anything else, but I'm not sure that
persistence is in the scope of traditional MVC. (Another way to think of it is
that `sync` is a translation layer between a client side model and a server side
model, which are just two representations of the same domain object.)

#### Events

`Backbone.Events` provides standard event listening and triggering behavior.

* `Events.on(event, listener)` adds a listener
* `Events.off(event, listener)` removes listener
* `Events.trigger(event)`

`Backbone.Events` can also be *mixed in* to other objects or classes via
underscore's `_.extend` mechanism, and it is mixed in to `Backbone.View`,
`Backbone.Model` etc. So these methods are available from most Backbone types.

By convention, Backbone Events are often *namespaced*. For example, you can listen to all changes
on a model with `model.on("change", listener)`, but you can also listen to just
a change of the property `"name"` with `model.on("change:name", listener)`.

But keep in mind there is no extra support in the implementation of
`Backbone.Events` for namespaced events really, not like [jQuery namespaced
events](http://marcus-christie.blogspot.com/2014/04/bootstraps-alertjs-plugin-line-by-line.html).
`"change:name"` works because `Backbone.Model` dispatches an event for each
property that changes and also a "change" event.  As another example, if you
listen for `"foo"` and a `"foo:bar"` event is triggered, your event listener
will not be called.  You would have to trigger both `"foo"` and `"foo:bar"` in
your code if you wanted to support namespacing.

One problem with setting up event listeners, especially with a View listening to
changes on a Model, is that the object being listened to has a reference to the
listener.  For example, let's say you have a ContactView that is listening for
changes to a Contact Model instance. If you dispose of the ContactView but
forget to remove all of the event listeners, then the Contact Model still has a
reference to your ContactView.  This leads to a couple problems. First, your
ContactView instance won't get garbage collected, so your app is now leaking
memory. Second, whenever the Contact Model updates it will continue to call the
event listener on the *zombie* ContactView and update it, so you have a lot of
unnecessary code execution (and debugging this can get really confusing when you
see code executed several times instead of just once as expected).

To solve this, `Backbone.Events` has two helpful methods, `listenTo` and
`stopListening`.  `listenTo` has this method signature

    :::JavaScript
    object.listenTo(other, event, callback)

Whereas you call `on` on the object you want to listen to, `listenTo` is called
on the listening object.  The advantage here is that the listening object can
keep track of all of the listeners and can remove them all at once, which is
what `stopListening` does.

One other note about events. In a Backbone app, you typically have two types of
events: Backbone events and DOM events.  DOM events are typically set up for a
View in the *events hash*, which we'll get to later.  When using the *events
hash*, `this` refers to the View, pretty much what you expect.  However, keep in
mind, if you programmatically use the jQuery API to bind to DOM events then
`this` refers to the DOM element.

#### Model

To create a `Backbone.Model`, extend the `Backbone.Model` class.  You can
specify `default` values for various properties.

    :::javascript
    app.Todo = Backbone.Model.extend({

        // Default attributes ensure that each todo created has `title` and `completed` keys.
        defaults: {
            title: '',
            completed: false
        }
    });

To instantiate a Model instance, call the constructor and pass in the attributes
for the instance.  Any defaulted attributes that aren't specified will receive
their default values.

Models have `get` and `set` functions for reading and writing attribute values.
As mentioned above, calling `set("myattr", newvalue)` causes two events to be
dispatched: "change:myattr" and "change".

Models also have a special property called `id` which uniquely identifies a
Model instance. This can be set to an integer or UUID string.  You pass it in
the attributes hash when creating a Model instance. You can also set the
`idAttribute` property on the Model class if you have a property on your Models
that can be used to uniquely identify instances.

#### Collection

Create a new Collection by extending `Backbone.Collection`. You typically set
the `model` property to the Model class of this collection.

    :::JavaScript
    var TodoList = Backbone.Collection.extend({

        // Reference to this collection's model
        model: app.Todo,

    });

Collections redispatch Model events, so you can simply listen, for example, to
"change" events on the Collection and you'll be notified whenever a Model
instance changes.

You can `add` and `remove` Models to and from a Collection. These methods will
dispatch "add" and "remove" events.  Removing a model occurs when you call
`remove` and pass in a Model instance that has the same `id` as a Model instance
already in the Collection. Collections also have a `reset` method which updates
the Collection all at once and dispatches just a single "reset" event, which is
more efficient for example when initially loading a Collection.

[Collections have several Underscore
methods](http://backbonejs.org/#Collection-Underscore-Methods), like `_.each`,
that you can call directly.

Collections are typically where you will set up the RESTful URL by setting the
`url` property.  You can then call `fetch` to retrieve all of the model
instances in the collection and add them to the collection instance. We'll look
at this more in the *Sync* section below.

#### View

Backbone View's always have a DOM element that they can render into. By default
`Backbone.View` will create the DOM element for you, but if the DOM element you
want to attach this View instance to is already in the page you can set `el` to
a selector for that DOM element

    :::JavaScript
    var MyView = Backbone.View.extend({
        el: '#myview',
        //...
    });

If you let Backbone create your DOM element, you can specify `tagName`,
`className`, `id` and `attributes` to be set on that DOM element and Backbone
will apply them. That is, if you specify a `tagName` of *li* and a `className`
of *todo-item*, Backbone will create a `<li class="todo-item" />` element in the
DOM for you.

As a convenience, View's also have a `$el` property which is the jQuery wrapped
reference to the View's DOM element.

A typical thing to do when you initialize a View is to pass it the `model` or
`collection` instance you want it to bind to.  In the View's `initialize`
method, you can then bind to changes to that Model or Collection:

    :::JavaScript
    var TodoView = Backbone.View.extend({
        tagName: "li",
        className: "todo-item",
        initialize: function(){
            this.listenTo( this.model, "change", this.render );
            //...
        }
    });

    var todo = new TodoView({model: aTodo});

Besides binding to events on the Model, a View typically binds to DOM events.
This is one of the *controller-ish* things a Backbone View does. To bind to DOM
events, specify the `events` hash when creating the view. The keys in the events
hash are in the form of `'eventName selector'` and the value of each is the name
of a function (or a function reference instead if you want).

    :::JavaScript
    var TodoView = Backbone.View.extend({
        events: {
            'click .toggle': 'toggleCompleted',
            // ...
        }
    });

Inside of a DOM event handler, `this` refers to the View.

To actually render a view to the page, you provide an implementation of
`render`. The job of `render` is to update `this.el` however necessary.  The
typical way to do this is to have a String based template, by default, an
[Underscore template](http://underscorejs.org/#template). You'll set `template`
in a view to a template function that takes an object with the properties of
your model and returns a String of HTML with the model properties applied.

There are several approaches to how to organize your templates, but the simplest
way is to put them in the web page inside a `<script>` tag with type set to
*text/template*.

    :::html
    <script type="text/template" id="template-id">
        <input type="checkbox" <%= completed ? 'checked' : '' %> />
        <label><%- description></label>
    </script>

In your View class, you can read in the template once with 

    :::javascript
    //... inside View class
        template: _.template( this.$('#template-id').html() );

Then you can implement `render` like so:

    :::javascript
    //... inside View class
        render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );

            // Anything else you might want to do...

            return this;
        }

Note that `this.$` is a reference to the jQuery object. Also, `render` returns
`this` so that parent View components can render child View components and then
include them in themselves.  For example, a container of these TodoView
instances might do something like:

    :::javascript
        render: function() {

            todos.each( function(todo) {
                var todoView = new TodoView({model: todo});
                this.$el.append( todoView.render().el );
            }
        }

When you are done with a View, you can call `remove` on it. This removes
`this.el` from the DOM and also calls `stopListening` to remove all of its event
listeners.

#### Router

`Backbone.Router` allows mapping URLs to actions and events.  You create a
router instance by extending `Backbone.Router`. You can specify a `routes` hash
that maps url patterns to function names (or function references). This is
somewhat similar to the events hash in a View.

Route url patterns can use the `:param` syntax of the `*param` splat syntax.
`:param` is used to match a part of a URL.  A splat matches the rest of the URL.

    :::javascript
    var Router = Backbone.Router.extend({

        routes: {
            '/search/:query': 'search',
            //....
        },

        search: function(query){
        }
    });

As an example of how you would use a Router, consider an email application. When
the user navigates to an email folder, the app will display a list of the email
messages in that folder. You would set up a route for an email folder, maybe
like so:

    :::javascript
    routes: {
        '/folder/:folderId': 'goToFolder'
    }

Then when a user clicks on the email folder, you can call
`Router.navigate('/folder/123', {trigger: true})`.  If you want to handle
updating the view to show the folder and just have the router update the URL,
you would not pass `{trigger: true}`.

So now you need to kick things off for your app and have your Router handle
whatever the current URL is (for example, if the user bookmarked that email
folder link and navigated to it directly). To do that you call `start` on
`Backbone.history`.

    :::javascript
    var appRouter = new Router();
    Backbone.history.start({pushState: true});

Backbone.history is a kind of global router. It can make use of the History API,
calling pushState if available, falling back to updating the URL fragment if not
available. You have to pass `{pushState: true}` to `start` to make use of
pushState; it is something you opt into in Backbone.

#### Sync

`Backbone.sync` handles persistence. By default, it supports RESTfully
retrieving and saving models to a server, assuming a JSON API.  In the simplest
cases, you just define the base url on your Collections.

    :::javascript
    app.Library = Backbone.Collection.extend({
        model: app.Book,
        url: '/api/books'
    });

When you call the following methods, the following URLs are invoked via AJAX:

* Collection.create maps to a POST to the URL `/api/books`
    * Collection.create is a convenience function that saves the new model to
      the server and adds it to the Collection.
* Collection.fetch maps to a GET to the URL `/api/books`
* Collection.update maps to a PUT to the URL `/api/books/{id}`
* Collection.delete maps to a DELETE to the URL `/api/books/{id}`

There's a lot you can customize however.  Models can implement `Model.parse` to
have custom response parsing logic.  You can override `Backbone.ajax` to
customize the AJAX logic. And you can go whole hog and override `Backbone.sync`
to completely customize how to load/persist data, for example, [using
LocalStorage as a backing store for your app](https://github.com/jeromegn/Backbone.localStorage).


#### Additional Resources

* [Backbone Fundamentals](http://addyosmani.github.io/backbone-fundamentals/)
    * A lot of the code examples in this blog post come from Backbone
      Fundamentals. **Highly recommended.**
* [History of MVC](http://heim.ifi.uio.no/~trygver/themes/mvc/mvc-index.html)
* [C2's MVC page](http://c2.com/cgi/wiki?ModelViewController)
* [Namespacing events is just a convention @ StackOverflow](http://stackoverflow.com/a/22803629/1419499)
* [Caniuse.com pushState](http://caniuse.com/history)
