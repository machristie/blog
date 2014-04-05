<!--
vim: ts=4 sw=4 et ai tw=80:
# CodeMash 2013 Part II: Sessions
-->

In my previous post, [CodeMash 2013 Part
I](http://marcus-christie.blogspot.com/2013/01/codemash-2013-part-i-precompilers.html),
I covered the "precompilers" (that's CodeMash-ese for "tutorial" or "workshop")
that I attended. The last two days of CodeMash, Thursday and Friday, are devoted
to technical talks and presentations (although there's a lot more going on than
just technical talks like open spaces, KidzMash (for the younger geeks), the
[bacon bar](http://www.flickr.com/photos/lsirtosky/6691276793/), etc.).

Continuing with my plan from the first two days I decided to mostly focus on

1. Mobile web development/PhoneGap
2. Javascript MVC Frameworks/Single page applications

## Thursday 9:45 AM: Performance, Productivity. Pick Two with Dart

Seth Ladd gave a talk on Dart. It's an ambitious project to create a new way of
building web applications. At the heart of it is Dart, a optionally statically
typed language that is reminiscent of Java and that can compile down to
JavaScript.

My overall impression is that Dart is a lot to chew off.  Seth showed what the
JavaScript code looks like that Dart can compile to. I found it rather bizarre
looking, not at all like the nice output you get with CoffeeScript. One question
I had going in is if you can call third party JavaScript libraries. You *can*
but you have to use some sort of bridge to do so (which he didn't have time to
show). With CoffeeScript, it's trivial to call third party libraries.

So it's interesting and the tooling is pretty cool, it just feels like you'd end
up cutting yourself off from a big chunk of the web community going with Dart.

## Thursday 11:00 AM: Machine Learning - Understanding the Past

This was a fantastic talk by [Seth Juarez](https://twitter.com/@sethjuarez) on
using machine learning techniques to help make sense of your data. He went over
*unsupervised* learning methods like K-means clustering and principal component
analysis.  He's put [his slides up here](http://numl.net/blog/codemash-2.0.1.3)
in case you're interested.

## Thursday 1:45 PM: HTML 5 and the Great Mobile Debate

This was a great talk about the current state of developing cross platform
mobile applications and whether it makes sense to develop those apps using HTML
5.  [Andy Glover](http://twitter.com/@aglover) gave this talk; he [wrote up a
blog
post](http://www.app47.com/2013/01/24/the-codemash-consensus-best-conference-ever/)
covering his main points.

In summary, Andy suggests not using HTML 5 and if you want to target multiple
mobile platforms with a single codebase, he suggests you look at one of the
cross platform frameworks such as Appcelerator, Xamarin, Corona or Unity.  The
main points of his argument are

* mobile browsers are even more fragmented than native APIs. Here he pointed out
  how even the most advanced mobile browsers don't support all of HTML 5 (he
  used conformance testing tools like [rng.io](http://rng.io) and
  [fmbip.com](http://fmbip.com)).  I'm not sure I agree on this point; there's
  an awful lot in HTML 5 and a browser doesn't need to support all of it to be
  perfectly fine to target with a mobile web app. But he does have a point that
  simply making a mobile web app doesn't mean you don't have to deal with
  fragmentation issues.
* HTML rules on the desktop because it's easier to distribute an app as a web
  application than as a native blob of bits.  The web's strength on the desktop
  doesn't matter on mobile because on mobile the software distribution problem
  is a solved problem.
* Consumer apps with a great user experience (examples he used were Flipboard
  and Angry Birds) have set the bar really high for the UI quality of a mobile
  app.

The talk was very thought provoking, although I think HTML 5 and PhoneGap are
perfectly fine for an app in the enterprise or B2B space.  I don't think I would
use HTML 5 to make a game or a consumer app (well, maybe as a kind of prototype
of a consumer app), but I do think it has a place in the enterprise.

## Thursday 3:35 PM: Lessons from Two Years of Backbone.js

[Chris Nelson](https://twitter.com/@superchris) presented on lessons learned
using Backbone.js.  This was a packed talk that I was unfortunately late to so I
didn't take the greatest notes.  I also can't find his slides online.  Wish I
could find them because he had some interesting material on stuff like how to do
composite views in Backbone.js. Lesson learned: show up early to get a good seat
:)

## Thursday 4:50 PM: Client/Server Apps with HTML5, Play, CoffeeScript, and More

[James Ward](http://www.jamesward.com/) gave a whirlwind tour of a very modern
web application development stack using Play, CoffeeScript, Bootstrap and more.
He tore through the slides but 1 hour just wasn't enough time to complete the
whole thing.

## Friday 10:45 AM: The Native/Mobile Web: Beyond the Basics with PhoneGap

[JC Grubbs](https://twitter.com/@thegrubbsian) gave a talk on some of the real
world concerns with building a PhoneGap app, like how to deal with performance
issues or how to create a build process to target multiple mobile platforms.
[His slides are
here](https://speakerdeck.com/thegrubbsian/beyond-the-basics-with-phonegap).

My notes:

* Structuring a project
    * src - source code
    * www - js and css get concatenated to this directory
    * ios
        * www -> ../www/ - symlink in the www folder to the respective container
          app
    * android
        * www symlinked likewise
* Typical stack
    * Zepto/JQuery
    * backbone/underscore
        * template rendering performance
    * moment.js / gui tools / data libs / JQuery Mobile
    * jasmine / rake-pipeline / sass / ejs
* GUI Toolkits
    * JQuery Mobile
    * iUI
    * Sencha Touch
    * Ratchet
        * this is actually a prototyping toolkit but JC pulled out the UI stuff
          from it to create mobile web UIs
    * Media queries
    * Icon Fonts
        * scales automatically
        * icomoon - Chrome app for browsing icon fonts
    * Flex box / fluid layout
    * scrolling
        * `webkit-overflow-scroll: touch`
        * avoid scrolling libraries
    * iOS Bounce
        * you can turn this off with a PhoneGap setting
* Local vs Remote data
    * use Backbone sync plugins that handle saving dirty records and flush when
      online
* Debugging
    * test in browser - there are PhoneGap shims
    * iOS remote debugger
    * debug.phonegap.com - weinre
    * JSlint
* Testing
    * Jasmine / QUnit
    * Capybara / Cucumber
* Performance
    * Tap vs click
        * use touch events
    * JS vs CSS animations
        * use CSS animations
    * clean the DOM
    * Page everything - no infinite scroll
    * Web workers (iOS 5.1+)
    * Plugins
        * can use them to get native performance
* Deployment
    * TestFlightApp
    * PhoneGap Build
* Backbone/JQuery Mobile
    * use JQuery Mobile for styling/UI, but disable ajax based navigation
    * backbone router is flaky on iOS



## Friday 1:45 PM: Building Rich User Experiences Without JavaScript Spaghetti

This was a talk on using some design patterns to make more maintainable
JavaScript code. The speaker [Jared Faris](http://www.jaredthenerd.com/) and if
you're interested, I believe the same talk is available to view online [at
InfoQ](http://www.infoq.com/presentations/UX-JavaScript-Spaghetti). Here are my
notes from the talk:

* Decouple code that has multiple concerns
* Write small, discrete bits of code
* Think of UI components as separate JS objects
* put DOM stuff in separate layer
* Mediator pattern
* Observer pattern
* Pub/sub - Postal.js (Event routing)
* [Chrome has a
  de-minifier](http://blogs.msdn.com/b/thebeebs/archive/2012/06/26/minifying.aspx)
* EJS templates
* JQuery doTimeout plugin - a better setTimeout
* [Signature Pad](http://thomasjbradley.ca/lab/signature-pad/) - capture a
  signature in a HTML5 canvas
* [SimpleDialog2](http://dev.jtsage.com/jQM-SimpleDialog/demos2/) - better modal
  dialog for JQuery Mobile

## Friday 3:35 PM: AngularJS: The HTML of the Future

This was a very interesting talk for me because I really hadn't seen any
AngularJS before. [John Lindquist](https://twitter.com/@johnlindquist)
demonstrated how to create your own *directives* which basically is a way to
create your own HTML elements.

## What else?

Well there's the [waterpark](http://www.kalahariresorts.com/oh/), right? You
can't go to CodeMash and not spend some time in the waterpark. The family and I
had a good time there on Thursday night.

Also, there's KidzMash, a parallel conference with cool computer programming
activities for kids. I took my youngest daughter (7 years old) to one session where she
learned how to "program" me by creating a list of simple instructions (step,
left, right) that I would then follow on a grid that had been taped into the
floor.  My oldest daughter (10 years old) has been programming in Scratch,
Python and a little Lua and JavaScript recently, so I took her to a talk on
using a Windows Kinect device to create programs that respond to gestures.  That
was a lot of fun too (now she wants a Kinect!).

All in all, it was a great conference. I learned a lot, and I expect I'll be
digging deeper into some of things I was exposed to over the next couple of
months. I hope I get to go back to it next year.
