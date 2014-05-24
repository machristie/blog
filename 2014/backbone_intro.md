
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

By convention, Backbone Events are often *namespaced*, but there is no extra
support for namespaced events really. For example, you can listen to all changes
on a model with `model.on("change", listener)`, but you can also listen to just
a change of the property `"name"` with `model.on("change:name", listener)`. This
works because `Backbone.Model` dispatches an event for each property that
changes and also a "change" event.  This is just a convention though. If you
listen for `"foo"` and a `"foo:bar"` event is trigger your event listener will
not be called.  You would have to trigger both `"foo"` and `"foo:bar"` in your
code.

* listenTo/stopListening
    * The problem these solves is that you have a View listening to a Model,
      which means that the Model has a reference to the View. If you forget to
      remove that listener then the View will not get garbage collected.
* DOM events
    * events hash sets up DOM event listeners. `this` refers to the View.
    * jQuery.on, `this` is the DOM element.

#### Model

* creating a new Model class
    * Extend the Model class
    * add a `defaults` property to specify default values for new Model
      instances
* get/set
    * getting and setting properties via get/set
    * set causes 'change' event to be dispatched

#### Collection

* model - set the Model class for this collection
    * model events are redispatched by collection so you can listen to the
      collection
* add/remove
    * reset - doesn't fire add/remove events. Does dispatch 'reset' event. It's
      there for efficiency.
* Underscore methods
    * each
* create/fetch
    * we'll cover these in Sync below

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
        * <script type="text/template" id="template-id">
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
* [History of MVC](http://heim.ifi.uio.no/~trygver/themes/mvc/mvc-index.html)
* [C2's MVC page](http://c2.com/cgi/wiki?ModelViewController)
* [Namespacing events is just a convention @ StackOverflow](http://stackoverflow.com/a/22803629/1419499)
