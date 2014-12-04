
> Is it feasible to build a responsive, mobile-first Single Page Application
> (SPA)? Here are my initial thoughts on the feasibility and challenges of
> building a responsive SPA. I plan to do more research in the coming weeks to
> hopefully answer this question more completely.

I was recently working on a mobile version of
[FuelMyRoute](http://fuelmyroute.com). I started by using jQuery Mobile and
Backbone, but I found trying to use jQuery Mobile as a UI framework frustrating
so I decided to give [Bootstrap](http://getbootstrap.com/) a try. I was able to
convert my code over to Bootstrap fairly easily, but I started reading about and
thinking about the responsive features of Bootstrap. This got me to thinking
maybe I could make a responsive Single Page Application, one website that would
work well on mobile devices and on desktop computers.

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
have your application code add and remove CSS classes from a top level element
to drive hiding and showing different views, but I've left that sort of thing
out.

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
