
[Backbone|http://backbonejs.org/] is a JavaScript Model-View-Controller (MVC) library that can be used
to create single page applications (SPAs). This article introduces the most
important concepts in Backbone (Models, Collections, Views, Events, Router and
Sync) and how they relate to building a client side JavaScript application.

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
available to be shown and interacted with.

`Backbone.sync` is the RESTful persistence mechanism for saving/updating models.
In Backbone, the models (Model and Collection instances) know how to persist
themselves (which endpoint to call, how to serialize/deserialize, etc.). In that
sense, `sync` is more in the M of MVC than anything else, but I'm not sure that
persistence is in the scope of traditional MVC. (Another way to think of it is
that `sync` is a translation layer between a client side model and a server side
model, which are just two representations of the same domain object.)

#### Events

* namespacing
* listenTo
* stopListening
* DOM events

#### Model

* get/set
* id/cid
* events

#### Collection

* add/remove/create
* events

#### View

* el, tagName, className, id
* model
* initialize/listenTo
* events hash
* render
* remove

#### Router

* routes
* Backbone.history.start()

#### Sync


#### Additional Resources

* [History of MVC](http://heim.ifi.uio.no/~trygver/themes/mvc/mvc-index.html)
* [C2's MVC page](http://c2.com/cgi/wiki?ModelViewController)