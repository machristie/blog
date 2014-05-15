<!--
vim: ts=4 sw=4 et ai tw=80:
# CodeMash 2013 Part I: Precompilers
-->

This year I went to [CodeMash](http://codemash.org/), a fun, eclectic software
development conference held at the Kalahari Resort in Sandusky, OH. I learned
quite a bit and had a great time. There were so many good sessions that it was
hard to decide which ones to go to. To help me decide I decided to focus in on
two areas I'm currently interested in:

1. Mobile web development/PhoneGap
2. Javascript MVC Frameworks/Single page applications

The first two days of the conference, Tuesday and Wednesday, were devoted to
half and full day workshops/tutorials that CodeMash calls *Precompilers*.  

## Tuesday AM: PhoneGap tutorial

My first precompiler on Tuesday was *Developing Mobile applications with
PhoneGap* by [Ray Camden](http://www.raymondcamden.com/). You can find the
presentation and the labs [on
GitHub](https://github.com/cfjedimaster/DevelopingMobileAppsWithPhoneGap).

The highlight of this presentation was the discussion on how to test mobile web
applications and the various tools that are available.

Probably the coolest one I saw was
[Ripple](https://github.com/blackberry/Ripple-UI). Ripple is a mobile web
application emulator that can run as a Chrome extension. You can simulate
different devices and different frameworks (I believe it can emulate the
PhoneGap API so you can test your code to some extent). You can change network
settings and geolocation data.  You can also fire off mobile specific events
like `deviceready`. The [user
documentation](https://developer.blackberry.com/html5/documentation/getting_started_with_ripple_1866966_11.html)
is hosted on Blackberry's website Ripple is currently an Apache Incubator
project.


<div class="separator" style="clear: both; text-align: center;">
<a href="http://2.bp.blogspot.com/-8GKFI9XA0h8/UQHbjDFqb6I/AAAAAAAABXE/gG1gvGncuGY/s1600/ripple3.png" imageanchor="1" style="margin-left:1em; margin-right:1em"><img border="0" height="220" width="320" src="http://2.bp.blogspot.com/-8GKFI9XA0h8/UQHbjDFqb6I/AAAAAAAABXE/gG1gvGncuGY/s320/ripple3.png" /></a></div>

There were some other tools that looked interesting and were demoed but I
haven't yet played around with them. First, you can [connect the desktop Safari
browser to the mobile Safari browser running in the iOS
Simulator](http://moduscreate.com/enable-remote-web-inspector-in-ios-6/). You
can use all of the normal Safari developer tools but they work with the web page
in mobile Safari.  Very cool. The second tool I'll mention is [Edge
Inspect](http://html.adobe.com/edge/inspect/) which takes that same idea and
extends it so you can remotely inspect mobile web code running on an actual
device. Edge Inspect is a freemium service so you can try before you buy and
perhaps get a lot of use out of it without spending a dime.

Finally I'll mention
[weinre](http://people.apache.org/~pmuellr/weinre/docs/latest/) which wasn't
mentioned (and to be honest I've not used it but have heard of it) but is in the
same vein and is a free and open source project.


## Tuesday PM: Choose Your Own Application

From the guys at SRT Solutions comes the very fun [Choose Your Own
Application](http://chooseyourownapplication.com/)!.  You should **seriously
check this out**. Remember those *Choose Your Own Adventure* books from when you
were a kid? This is the same idea except you choose your software stack. You can
choose to use JavaScript or CoffeeScript, Backbone or Knockout, ASP.NET or Rails
or Node.js, and finally you can choose to deploy to Heroku or Azure.

I chose to use JavaScript with Backbone with a Node.js backend, deployed to
Heroku. The app they have you create is a StackOverflow like web site where
users can submit questions and vote on them (very simplistic implementation).
One cool part of the design is that it uses [Socket.IO](http://socket.io) to
push updates via WebSockets (which ended up falling back to long polling on
Heroku as I recall). You can open up two browser windows, create a question in
one window and see it update in the other window. It's a good way to see the
power of a Javascript MVC framework like Backbone; the model is updated
in the background and the view immediately reflects it.

If you want to see what the code looks like, I've pushed my code to GitHub:
[https://github.com/machristie/chooseyourownapplication-bbjsnodeheroku](https://github.com/machristie/chooseyourownapplication-bbjsnodeheroku).
I found Heroku ridiculously easy to get set up with and a really simple and
powerful way to deploy out a website.  The combination of GitHub and the free
usage tier of Heroku is especially nice for an exercise like this because you
can easily publish the code **and** the working implementation for something you
are learning or some new approach you are trying and would like feedback on.

You can see my running implemenation here
[http://cyoa-mchristie.herokuapp.com/](http://cyoa-mchristie.herokuapp.com/).

## Wednesday AM: Atomic Scala

This session was presented by Dianne Marsh and Bruce Eckel. The idea was to
present concepts in Scala one at a time (or one "atom" at a time). I think
they're intended audience is first time programmers or at least programmers who
don't have a Java background. In any case the pacing of the tutorial was way too
slow, especially for a session with an advertised level of intermediate. They
were kind enough to give us a pre-publish version of their book, [Atomic
Scala](http://www.atomicscala.com), and going at my own pace I would probably
find it useful for learning Scala.  We'll see.

## Wednesday PM: Real-world JavaScript Testing

The Atomic Scala session was actually full day but I skipped out on the second
half and went to [Justin Searls'](https://twitter.com/searls) session on real
world JavaScript testing. This was a great session that combined presenting on
lessons learned in the wild with a fun hands on lab. His slides and the code for
the lab are [up on
GitHub](https://github.com/searls/codemash-jasmine-precompiler). 
The talk started with how to use Jasmine, a JavaScript unit testing framework.
They then added to this by featuring various jasmine addons and other techniques
for making writing unit tests easier:

* [jasmine-fixture](https://github.com/searls/jasmine-fixture) for easily adding
  elements to the DOM that are expected by the tests
* Using Coffeescript which allows for a cleaner syntax making the tests more
  readable
* [jasmine-given](https://github.com/searls/jasmine-given) for "Given", "When",
  "Then" style testing.
* [lineman](https://github.com/testdouble/lineman) is used to automatically
  compile CoffeeScript with `lineman run` and automatically run your tests (or
  *specs*) with `lineman spec`. The nice thing here is that the testing
  framework was also remote driving a Chrome browser window (or headlessly) to
  re-run the tests and display the test results. This gave immediate feedback:
  write a test, save, test is run and status displayed; update production code,
  save, test is re-run. You can see what working with lineman is like by
  watching this screencast: 
  <iframe width="560" height="315"
  src="http://www.youtube.com/embed/BmZ4XRErYAI" frameborder="0"
  allowfullscreen></iframe>

This was an extremely nice and productive setup. We paired up and worked on
creating a test for a fibonacci calculator web application. It was tough since I
didn't know CoffeeScript or Jasmine, but very rewarding as it helped me see how
I would actually use this to test *real* code.  I've posted [my solution on
GitHub](https://github.com/machristie/codemash-jasmine-precompiler).

TODO: I want to dive more into this setup and see how it is actually working.
There are a lot of moving parts here and I'm not familiar with most of them. But
I'm hoping I can use this setup or one like it for my JavaScript code.

# Conclusion

Well, the first two days were kind of mentally exhausting!  But it was fun to be
thrown into the deep end and have to figure out a bunch of stuff using
frameworks and languages that I'm not familiar with. Definitely worth it to do
the Precompilers if you are going to CodeMash.

Next week I'll blog about the other two days of CodeMash.
