
<!--
Title: Researching Responsive Webapps
Target pub date: 2015-01-18
-->

In a previous post I wrote about my initial thoughts regarding responsive Single
Page Applications (SPAs).  I've now done a bit of digging to find out what other
folks think about this topic.

I found Jason Grigsby's series of blog posts [Responsive Design for
Apps](http://blog.cloudfour.com/responsive-design-for-apps-part-1/) especially
interesting.

#### Consensual Hallucination

In the first blog post in this series, Jason makes the case that web developers
and web UI framework authors have been participating in a [consensual
hallucination](http://adactio.com/articles/5826/) regarding what phones and
tablets and desktop computers are limited to, just as we once assumed desktop
browsers were 960px wide. Web UI frameworks have a library of mobile widgets and
a separate library of desktop widgets. The reasoning given is that phones and
tablets and desktops are fundamentally different platforms.  But what are these
fundamental differences? A cellular radio?

Jason looks at the size of phones and tablets and points out that the height of
the larger phones out there easily exceeds the width of the smaller tablets
available.  His article was published in early 2013 and since then the gap has
only narrowed. In fact Jason at one point says

> The small gaps that exist are either things that seem inevitable (high-dpi on
> large screens) or are so small to be inconsequential (does it matter that we
> don't have six inch displays?).

And of course, we now have [6-inch phones](http://www.google.com/nexus/6/) and
[6-inch tablets](http://www.amazon.com/dp/B00KC6I06S).

There's no clear line between phones and tablets, but what about desktops?  We
used to be able to assume that touch was a fundamentally distinct mode of
interaction on mobile devices.  However, Windows 8 and all of the touch screen
desktop and laptop products that are built for it obliterates that assumption.
He points to research to suggest that touchscreen desktops are not a fad.  I've
yet to have a chance to play with a Windows 8 touchscreen device myself but I
agree. I have to believe that eventually Apple will have to catch up too.

One of the key takeaways for me from this article is that every application
should be designed for touch interaction. Primarily this means making targets
big enough to be easily tapped on with fingers. Because of Fitt's Law, desktop
users using a mouse will also benefit because these larger targets are easier to
hit.

* A lot of the web UI frameworks have a library of mobile widgets and a library
  of desktop widgets
* Some of these web framework authors make the point that phones are a
  fundamentally different platform from tablets and likewise different from
  desktop
* However, Jason wonders what is that fundamental difference and where are the
  lines being drawn
* We now have many large phones and small tablets so that the height of a large
  phone can easily exceed the width of a tablet
* Windows 8 devices with touch screens also challenge what we can assume about
  input devices based on the size of the screen
* He writes about how Jeremy Keith once wrote about how web designers
  participate in collective, consensual hallucination. The idea that laptops
  have a large screen and keyboard and tablets have large screens and touch fit
  into that.
* If you design targets for touch then desktop users will be able to use them
  too. In fact, they will be easier to use due to Fitt's law
* Found that making a desktop component/app responsive is very hard.  It is
  easier to figure out how the app would be designed for mobile first and then
  enhance it for desktop.
* Embracing constraints to lead to better design.
* Content itself is the interface
* Rethink the desktop app in terms of the mobile first design
* Look at how Apple designs iPhone, iPad and Mac Mail app
* Nested doll design pattern: from list of items to greater detail or sub-lists
  of that item
* Bento box pattern: display list and detail on the same screen
* adaptive layout - multiple fixed sizes (as opposed to fluid)
* "responsiveness for apps is inevitable"
