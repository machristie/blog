
> Is it feasible to build a responsive, mobile-first Single Page Application
> (SPA)? Here are my initial thoughts on the feasibility and challenges of
> building a responsive SPA. I plan to do more research in the coming weeks to
> hopefully answer this question more completely.

I was recently working on a mobile version of
[FuelMyRoute](http://fuelmyroute.com). I started by using jQuery Mobile and
Backbone, but I found trying to use jQuery Mobile as a UI framework frustrating
so I decided to give [the Bootstrap CSS framework](http://getbootstrap.com/) a
try. I was able to convert my code over to Bootstrap fairly easily, but I
started reading about and thinking about the responsive features of Bootstrap.
This got me to thinking maybe I could make a responsive Single Page Application,
one website that would work well on mobile devices and on desktop computers.

The benefits are pretty obvious I think. I don't relish the idea of maintaining
two separate web applications. Especially when a lot of the non-UI code would be
very similar.  I could get a mobile site for my application while at the same
time updating and modernizing the existing desktop site.  That's a huge win!

I should probably define what I mean by *responsive SPA*.  First of all, a
Single Page Application is a web application where there is only an initial full
page load. From that point forward AJAX is used to interact with the server to
fetch data (e.g. get new mail) or to perform server side actions (e.g. send an
email). The DOM is manipulated as appropriate in response to user actions and
requested information. A *responsive SPA* is one where the UI of the SPA changes
based on the size of the viewport, so that it is more appropriate/usable on
smaller viewports but also can adapt and take advantage of more screen space on
larger viewports. *Responsive* to me means also taking a *mobile-first* approach
to web application development, where the mobile phone/small tablet use case is
given primary (or at least equal) consideration.

But, I don't really see or hear much about responsive SPAs. I'm talking strictly
about web *applications*, not web *sites*. If you are building, for example, a
blog, then there is a lot of advice and support for making it responsive.
However, for applications, it's different. The received wisdom is that it is
better to have two different sites, one for mobile and one for desktop.  Why?
This is a question I want to answer along with the following:

* What are the problems/tradeoffs that are encountered when making a responsive
  SPA?
* Is it possible to use only CSS, only media queries to switch between different
  layouts for *mobile* and *desktop* usage? Or would it be necessary to have the
  JavaScript code be aware of whether the application is in *mobile* or
  *desktop* mode? (Ideally the responsiveness would be implemented in CSS only)

In this blog post I cover my initial thoughts about how a responsive SPA could
work and what the challenges are likely to be.

#### Responsive Mobile UI Patterns

How would this work in practice?  In this section I'll go over a couple of
common mobile UI patterns and how they would adapt to a larger viewport.

##### Separate "pages" (mobile) vs in-page controls (desktop)

Sometimes the ideal view on mobile is very different from the ideal view on
desktop. A common pattern here is that on desktop you have enough room to
display all controls on the same screen, but on mobile you might want a separate
full page view for certain actions.  For example, imagine an airplane flight
search application.  On desktop you could have the fields for departing city and
arriving city and dates on one page and display the results under those
controls.  On mobile, there isn't enough room for this so you would rather have
a separate full page view for specifying search criteria.

In some ways, this is the least ideal situation. It is always better to be able
to reuse the same controls and just style them differently using media queries.
However, we must anticipate that this might not always be possible and think
about what we could do in that situation.

To accomplish this, we could simply include the mobile full page alternate view
in the page, hidden unless the width of the page is wide enough.  By default,
the mobile view is hidden.

    :::css
    #mobile {
        display:none;
        background-color: #fff;
        z-index:1000;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    @media only screen and (max-width: 480px) {
        .desktop-only {
            display: none;
        }
        #mobile {
            display: block;
        }
    }

I created a [very simple demo of this concept using the airplane ticket search
example](http://jsfiddle.net/machristie/01kypvf5/). In practice, you would want
to have your application code add and remove CSS classes from a top level
element to drive hiding and showing different views, but I've left that sort of
thing out.

This "separate page" view could possible have a use on the desktop layout. You
might have a situation where not all controls fit on the desktop layout so the
same view to show all controls can be used on mobile and desktop.  On mobile it
might be styled as a full page view, whereas on desktop it could be styled as a
modal popup.

Data binding is a little complicated in such a situation.  Ideally, if the user
changes the size of the browser window then switching from "mobile" to "desktop"
or vice versa should be seamless from a user input perspective. Using the
airplane ticket search example, if I am in the "mobile" view and I type in a
*Departing from* city and then decide to expand my browser and get the "desktop"
view, then ideally the *Departing from* control in the "desktop" layout should
be populated with what I had typed on the "mobile" view. This means that I need
to bind to the *keypress* event and update my model as each key is typed in
*Departing from* and keep the "mobile" and "desktop" *Departing from* fields in
sync.

Another challenge with this approach is that you, obviously, have two different
views that have to be maintained. Arguably, this is one of the benefits of
adopting MVC in the first place: your models are independent of views and models
can have more than one view. However, it is still something extra that has to be
maintained. It is probably better than having two separate sites though.

##### List and detail views on separate pages (mobile) vs both on the same page (desktop)

A common pattern with mobile apps is that you have a view(s) that display lists
of data and tapping on a list item takes you to a view that displays details for
that item.  Examples include inbox listing/email detail and contact
listing/contact details.

On desktop however there is enough space to show both the list and the detail,
typically with the list on the left hand side and the detail view on the right.
For example, an email client.

Media queries can be used to achieve both of these layouts. One nice thing here
is that the same views are used on mobile and on desktop. Its just on mobile
they are separate "pages" and on desktop they are all on one page.

How would you achieve this with media queries?  I won't flesh out an entire
example here, but I will outline how it would be done.  The key I think is to
have your SPA router add/remove CSS classes to a root element of the DOM. When
the "list" class is added to the root element, the mobile media query will make
just the list view visible, hiding the detail view.  For desktop, there is no
additional work needed. Likewise, when transitioning to the detail route, the
"list" class is removed from the root element and a "detail" class is added. The
mobile media query would then hide the list view and make the detail view
visible.  On desktop, the presence of the "detail" class on the root element
might cause the currently selected item to be highlighted.

One challenge that this approach highlights (and this was true of the "separate
view" UI pattern above) is that although on mobile the user is seeing only one
view at a time, those other views are still there.  For example, in an email
client app, only the detail view may be visible, but the list view is still
there and still responding to model updates.  So for example, if you have a
periodic check for new email, then the list view is updating to display new
email received.  This is more of a problem for mobile where off screen updates
may cause performance to drag. On desktop the presence of alternate views that
aren't on screen is unlikely to cause much of a problem.

#### Challenges with doing responsive SPA

Some of these challenges were mentioned above. Here I'll summarize them and also
discuss how to address some of them. Not having experience developing a
responsive SPA, this is mostly speculation about what I anticipate would be
challenges building one.

##### Sizing of controls

It's possible to use media queries to size controls differently. You could for
example make buttons large, more "tap friendly" on mobile screens and smaller on
desktop screens.

However, one would have to assume that small screens are tapped on and large
screens are clicked on. And that assumption isn't valid in a lot of cases. For
example, a mobile phone might have a stylus that is able to make very precise
touches. As another example, there are now several Windows 8 devices, some that
are tablet/laptop hybrids, that are basically desktop devices but allow for
touch interaction.

So I think a reasonable approach is to just **size all controls for tapping**.
The tradeoff is that on desktop the controls are going to be "fatter" than
necessary, meaning you won't be able to fit as many controls on the same page,
but I don't think there is any reasonable alternative unless you want to
aggravate uses with large touch screens.

Also, the fact that you can't have as many controls on a desktop view is not
necessarily a bad thing. It will lead to a simplification of the UI, which will
probably end up being easier to use.

##### Off screen view updates on mobile

I mentioned this one above.  What can be done?  For one, I think some testing
and validation that this causes an issue is necessary first.  Are DOM updates
that are off screen as intensive as on screen ones for the browser to handle?
Maybe, hopefully, not. I think it can very much depend on the application and
might only affect certain views but not others.

If it becomes a problem I think one thing that could be done is to delay
re-rendering the view if the view is off screen.  Whenever it is ready to be
brought back on screen the view could first be fully re-rendered. The problem
here is that JS code now needs to know if the app is in "mobile" mode or
"desktop" mode and so far I've been trying to keep the differences purely in CSS
media queries.

##### Duplicate UIs

This one is mentioned above too.  This is most applicable when the "mobile"
version of the app needs a completely different view from the "desktop" version.

To mitigate this, first, obviously, try to use the same views for "mobile" and
"desktop" and simply have them laid out differently.

Also it should be said that the duplication of effort and maintenance is
probably not nearly so much as having two separate sites.

Also as mentioned above, there is also the data binding consideration: you'll
want to keep the "mobile" and "desktop" views in sync at all times because the
user could at any time transition from one to the other. In practice I think
this requires only a little extra effort.  See the discussion on listening for
*keypress* events above.

#### Conclusion

Well that's it for my initial thoughts. I hope to investigate this further and
try some of these techniques out.
