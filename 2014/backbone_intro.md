
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
  But Models are just data structures, they also contain the domain logic. A
  TODO item might expose a `complete` method that knows how to mark a TODO item
  as completed and properly manage any additional details related to task
  completion.
* **View** - views are visual representations of models. A view reacts to changes
  in a model by updating the view to reflect that change.
* **Controller** - controllers handle user input, both displaying views that
  the user requests and handling keyboard and mouse events.  Controllers
  typically translate user input into updates on Model instances.

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

`Backbone.Router` is also the controller in the traditional MVC understanding.
The Router responds to user requests for specific URLs and can handle them by
showing the right type of Views and by making sure that Model instances are
available.

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
mind, if you use the jQuery API to bind to DOM events then `this` refers to the
DOM element.

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

* View's always have a DOM element
    * tagName, className, id, attributes will be set on the DOM that View
      creates
    * el is a reference to this DOM element. However, you can specify the DOM
      element to attach to if already in the page, by setting el to a selector.
    * $el is a jQuery wrapped reference to the DOM element
* Binding to the model/collection
    * constructor/initialize function options. You can specify the
      model/collection in the options
    * this.listenTo( model, 'change', this.render )
    * `this` refers to the View instance
* Binding to DOM events
    * event hash
        'eventName selector': 'functionName'
    * `this` refers to the View instance
* Rendering the View
    * template
        * Underscore templates: _.template( $('#template-id').html() );
        * `<script type="text/template" id="template-id">`
    * render
        * this.$el.html( this.template( this.model.toJSON() ) );
    * this.$ is a jQuery reference
* Disposing of a View
    * View.remove
        * removes the DOM element
        * calls stopListening to remove all event listeners

#### Router

* Router allows mapping URLs to actions and events.
    * Route for an email app might be a mail folder or a contact listing.
    * routes can have parameters or "splats"
        * parameters use the :param syntax, "splats" use *param
* Backbone.history.start()
    * support for History API via {pushState: true}

#### Sync

* Backbone.sync has default support for RESTfully retrieving and saving models,
  assuming a JSON API
    * Collections define the URL "/books"
    * Collection.create maps to a POST to the URL /books
    * Collection.fetch maps to a GET to the URL /books
    * Collection.update maps to a PUT to the URL /books/{id}
    * Collection.delete maps to a DELETE to the URL /books/{id}
* You can override Backbone.sync to specify a custom method. Or you can override
  Backbone.ajax to just override the default Ajax behavior.


#### Additional Resources

* [Backbone Fundamentals](http://addyosmani.github.io/backbone-fundamentals/)
    * A lot of the code examples in this blog post come from Backbone
      Fundamentals. **Highly recommended.**
* [History of MVC](http://heim.ifi.uio.no/~trygver/themes/mvc/mvc-index.html)
* [C2's MVC page](http://c2.com/cgi/wiki?ModelViewController)
* [Namespacing events is just a convention @ StackOverflow](http://stackoverflow.com/a/22803629/1419499)
