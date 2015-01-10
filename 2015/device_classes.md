
<!--
Title: An alternative to responsive webapps: Device Classes
Target pub date: 2015-01-25
-->

This week I spent some time with Boris Smus' article, [A non-responsive approach
to building cross-device
webapps](http://www.html5rocks.com/en/mobile/cross-device/). As the title
suggests, Boris presents an alternative to using media queries and responsive
design for building webapps that work on a range of devices. It's a good article
and I recommend reading it.  In this blog post I'll review his arguments and
give my thoughts on the matter.

To start with, Boris sees a few problems with Media Queries (or at least, with
using just media queries to adapt layout for different screen sizes):
* All devices get the same assets: the same JavaScript, CSS, images etc. So
  there is a good chance that devices are downloading a lot more than they would
  absolutely need to.
* All devices start with the same DOM.  To get the DOM to look one way on one
  device and look another way on a different device could lead to overly
  complicated CSS.
* Not much flexibility to customize the UI for different types of devices.  You
  _can_ do it with a media query approach but even if you have a mobile view
  that is just completely different from a desktop view, you will have duplicate
  views and the application code has to be careful to trigger both views at
  once, depending on screen size. That is, while creating a custom view for a
  certain type of device, you have to think about how it will work for all other
  types of devices.

Smus recommends developing separate UIs for three different _device classes_:
1. mobile phones (small screen width + touch)
2. tablets (large screen width + touch)
3. desktops (no touch)

He suggests using device width and whether the device is touch enabled to
distinguish between these device classes.  How reasonable are these criteria?

As [one of the commenters
mentions](http://www.html5rocks.com/en/mobile/cross-device/#comment-762768971),
hindsight is 20/20. We live in an era of touchscreen desktop Windows 8
computers, and they don't appear to be going anywhere.  We can no longer assume
that lack of touch support equals desktop or vice versa. One of my big takeaways
from this whole investigation is that *all controls should be designed to be
touch friendly*.

What about the small screen/large screen divide?  As I wrote about in my
previous post, we now have many large phones and small tablets such that the
height of a large phone can easily exceed the width of a tablet. I still think a
line can be drawn somewhere and I do think that it is useful to design a mobile
friendly version of a webapp.  But that line is continually moving and blurring.

Okay, now that we have 3 device classes (personally I only see two: mobile and
desktop), what does Smus recommend for detecting and serving up these different
experiences?  Smus compares doing server side and client side detection and
comes down on client side detection, mostly because it is feature detection
based (more future proof) instead of user agent based.  I agree there.

Smus suggests using [Device.js](https://github.com/borismus/device.js)
(apparently one of his open source projects) to do this client side detection.

He also suggests using a MVC framework and only making separate View classes for
the difference device classes.  This allows you to get a lot of reuse while also
being able to fully tailor the UI for a particular device class.

Overall, I'm impressed with this approach. If your application is best
implemented with a different UI on mobile versus desktop, I think this is
probably the best approach.  Responsive Web Design seems to be a good fit only
when the UI is basically the same on mobile and desktop with only the layout
needing to be a little different. For example, at [Walker
Information](http://walkerinfo.com), we have a survey application. On mobile and
on desktop, the UI is the same. Each page has a list of questions and controls
for providing answers, with _Back_ and _Next_ buttons to navigate through the
survey.  This is a good candidate for being designed responsively.  As a counter
example, consider something like a webapp for MailChimp. On desktop it might be
optimized for creating emails and setting up campaigns whereas on mobile the UI
might be quite different and be focused on monitoring open rates, bounceback
rates, etc. In this case, having two completely different apps would be a better
fit.

There are some downsides with this separate app for device classes approach:
* If the device class is part of the URL then bookmarks, shared links would
  include it as part of the URL. It would be nice to have canonical URLs.
* Separate views for the device classes is extra work and has its own
  maintenance overhead
* Doesn't respond to orientation changes or browser resizing
    * However, it would be possible to combine both approaches. You might create
      a separate view for the mobile device class that itself uses media queries
      to adjust the UI between phone-like sizes and tablet-like sizes.

On a closing note, there is one other thing I like about Smus' approach.  He
recommends having links in the app to the different device classes. This way if
you are on a mobile phone and really want the desktop view, you can get to it. I
think this is in line with the thinking from the last blog post that challenges
the _consensual hallucination_ that we as web developers tend to participate in.
Our assumption about what is mobile, what is a desktop computer are being
challenged all the time. It would be good to make fewer assumptions. Letting a
user switch to a non-default device class, to me, fits in with that line of
thinking.  We only have a limited understanding of the kinds of devices that
exist today. Hopefully the devices that arrive in the future will surprise us
and challenge our assumptions. And hopefully our webapps will be ready.

Additional Resources:
* Really liked [this post by Brad
  Frost](http://bradfrost.com/blog/web/responsive-web-design-missing-the-point/)
  that Smus links to. He makes the point that while media queries are great, the
  most important thing to optimize on mobile is performance.
