
<!--
Title: Responsive Webapp Conclusions
Target pub date: 2015-01-31
-->

I've spent a few weeks now reading and thinking about whether it makes sense to
use responsive web design techniques to build a single page web application
(SPA) that works well on mobile and desktop computers.  I [started with my
initial thoughts]() and reviewed arguments [for responsive webapps]() and
[against responsive webapps](). I haven't done as much reading as I would like
and there is still a lot of good stuff out there to read and learn from. But I
think I have learned enough to come to some conclusions.

##### Recommendation

The first step in deciding whether to go responsive or not with a single page
web application is to first design what the ideal mobile UI and the ideal
desktop UI for your app. Obviously phones and desktop computers have different
real estate to work with, but when you are designing an ideal UI for your app
think also about the different use cases that users on mobile versus desktop
computers will have.  Don't just think "how do I make this work on small and
large screens".  For example, consider an email campaign management app.  On
desktop the UI would likely be optimized for creating new email messages or
templates and bulk loading and editing of emaili lists.  On a mobile device the
UI would be more geared to checking the status of email campaigns: open rates,
bounceback rates, unsubscribes. Design a UI that makes the most sense for your
users on both platforms.

Now, if the UI is basically the same except for layout, then Responsive Web
Design techniques could be a good fit. You can use media queries to adapt the
layout of the app on different devices.

However, you might still not choose to go responsive. Why?

1. You might want to optimize what is downloaded on mobile devices.  Not only to
   achieve a smaller download size but also to exclude running JavaScript code
   that would be intensive for mobile devices.
2. You want the flexibility to diverge the UIs in the future.  Sure, today,
   maybe before you even have any users, you think that the ideal mobile and
   desktop UIs only differ in layout.  But apps should evolve based on feedback
   from users and they grow new capabilities. This point might actually be the
   nail in the coffin for me regarding responsive SPAs. It seems far more
   pragmatic to start by having separate mobile and desktop UIs.

##### Other recommendations

###### Only two device classes: phone and desktop (or small and large)

There used to be such a clear cut divide between phones and tablets, but any
more I don't see much point in developing separate UIs for them.  They share a
lot of the same considerations:

* modest computational resources
* on mobile networks
* access to sensors like GPS

I think it is sufficient to just have two device classes.

One thing that does seem reasonable is to use responsive web design techniques
to have your mobile UI adapt to larger screen area.  For example, you could
implement the kind of UI like in the iPad Mail app where in portrait you see
only the email message but in landscape you see a list of emails in that folder
on the left and the email message on the right.

Also, allow the user to switch between the phone and desktop UIs if they desire.
A theme running throughout these blog posts is to try to not make any hard
assumptions and this is, to me, one of the big advantages of the device class
approach.  You might think that the user will best be served by the mobile UI
but that user may want the desktop UI. (This also dovetails nicely with thinking
about different use cases on mobile and desktop: the user may be on a desktop
computer but want to use the mobile UI because it is optimized for the kind of
task the user currently has in mind.)

###### Make everything optimized for touch

Whether you go responsive or take the device classes approach, make everything
optimized for touch. Size controls so that they can be tapped on and respond to
touch events.

----

* Recommendation: start out with designing what your best mobile UI and desktop
  UIs will look like.  Think about the different use cases: mobile users may
  have different tasks they want to complete vs your desktop users.
    * if the UI is the same except for layout, then RWD techniques could be a
      good fit
    * otherwise go the *device classes* approach, sharing as much code as
      possible except for view code
* Why you might still not choose RWD:
    * you want to optimize what is downloaded on mobile. Smaller download sizes.
    * flexibility to diverge the UIs in the future
* Examples of when to do RWD:
    * Grisby expense entry form
    * Walker Survey
        * Caveat: still would choose not to do RWD in this particular case
          because we need to be able to do extensive client customization
* Only two device classes, small and large, mobile and desktop
    * Question: what are the breakpoints?
* Everything is optimized for touch
    * add that user on mobile may choose desktop version
