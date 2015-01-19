
<!--
Title: Researching Responsive Webapps
Target pub date: 2015-01-18
-->

In a previous post I wrote about my initial thoughts regarding responsive Single
Page Applications (SPAs).  I've now done a bit of digging to find out what other
folks think about this topic.

Among the blog posts I read I found Jason Grigsby's series of blog posts
[Responsive Design for
Apps](http://blog.cloudfour.com/responsive-design-for-apps-part-1/) especially
interesting.

#### Consensual Hallucination

In the first blog post in this series, Jason makes the case that web developers
and web UI framework authors have been participating in a [consensual
hallucination](http://adactio.com/articles/5826/) regarding what phones and
tablets and desktop computers are limited to, just as we once assumed desktop
browsers were 960 pixels wide. Web UI frameworks tend to have a library of
mobile widgets (e.g, jQuery Mobile) and a separate library of desktop widgets
(e.g. jQuery UI). The reasoning given by framework authors is that phones and
tablets and desktops are fundamentally different platforms.  But what are these
fundamental differences? A cellular radio? The answer isn't clear and Jason is
dubious that a good answer exists.

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
big enough to be easily tapped on with fingers. Because of [Fitts's
Law](https://en.wikipedia.org/wiki/Fitts%27s_law), desktop users using a mouse
will also benefit because these larger targets are easier to hit.

#### Making desktop app responsive

In [Jason's second
post](http://blog.cloudfour.com/responsive-design-for-apps-part-2/) he looks at
a typical desktop app and tries to reimagine it as a responsive web app.

One of the problems he ran into is that if you take a desktop app design and try
to make it responsive, you kind of run into a brick wall. He starts making
progress when he takes a *mobile first* strategy. He designs a version of the
web app that is optimized for mobile.

Once he has an optimized mobile design, he then looks at how it maps to the
desktop app and finds that it maps pretty well. That's important for a
responsive web app; each screen in the mobile design needs to be able to map to
a corresponding screen in the desktop design.  If there isn't a mapping, that
is, if the mobile design is not just a different layout compared to the desktop
design, then responsive web design probably won't work.

Finally, he takes another look at the desktop design and rethinks it in terms of
the mobile design. This is also an important step in evaluating if responsive
web design is feasible.  For the mobile design he had to compromise in some
places and display less information than on the desktop design.  So its
important to step back and look at if these mobile design components can be used
in the desktop design.

#### Desktop and mobile design patterns

In the [third part of the Jason's
series](http://blog.cloudfour.com/responsive-design-for-apps-part-3/) Jason
looks at how desktop operating systems have been incorporating mobile design
ideas. In particular he looks at Apple's Mail app on iPhone, iPad and Mac OS X.

The iPhone Mail app uses a *nested doll* design pattern: moving froma  list of
items to greater detail or sub-lists of that item.  On the iPad, we see a
slightly different pattern, what has been called the *bento box* pattern: the
list of email messages is displayed on the same screen as the detail. The iPhone
and iPad app actually share views (for example, mail accounts and folders
listing screens).

On Mac OS X, the Mail app there shares a lot of similar design elements although
it does have a different look. One could definitely imagine there being a single
Mail app that runs across all Apple devices and that adapts to the available
screen real estate.

To me it is a little bit of stacking the deck to use the Mail app. Because
information in the Mail app is arranged hierarchically (mail accounts list,
folders list, messages list), it is not too hard to design a responsive Mail
app.  But not all apps are so simple. Word processing apps tend to have a main
content area and several controls for affecting layout and formatting. A mobile
word processing app design would be quite a different design, not likely to
share much with its desktop counterpart.

Also, Jason only looks at views that display lists of accounts and emails and
the views that display the email itself. That is, he only considers the views
related to reading email.  The desktop Mail app includes formatting options and
stationary options when composing email, which would take up too much real
estate on mobile. This is because on mobile users are typically more interested
in reading and filing and flagging and deleting email.  On mobile users only
need to be able to write short responses, typically.  On desktop the email
composing needs are very different.

Nevertheless, I think his conclusion that

> responsiveness for apps is inevitable

is mostly true.  Responsive web design can be a good fit for some apps and even
apps that are better served by different UI designs on mobile and desktop will
benefit from responsive design techniques on mobile (for example a mobile UI
that responds to more real estate on a tablet versus a phone).

#### Conclusions

I find Jason's arguments compelling. The idea that phones are fundamentally
different from tablets and desktops and so require different UI frameworks and
separate apps is undermined by the evidence that not much actually separates
these different devices in terms of technical capability.

However, one thing that I think is missing a little from the discussion is how
these different devices are used and what they are used for. Yes, technically,
there isn't much difference between phones and tablets and desktops except
screen size. On the other hand, users on mobile devices may have different tasks
in mind that they want to accomplish versus users on desktop devices.  As I
mentioned above regarding the Mail app example, mobile users mostly want to read
and deal with email by flagging, filing, deleting etc.  Composing longer or more
format heavy emails are saved for when the user is at a desktop computer. Now,
this isn't a big difference in goals for mobile and desktop users for this
particular app, but for certain apps mobile users may have very different goals
from desktop users.  This needs to be kept in mind when designing optimal
desktop and mobile UIs. I'll expand on this a bit in future posts, but to me
this is one of the most important reasons why you might want separate mobile and
desktop apps.

