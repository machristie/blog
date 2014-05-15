
#### CSS :empty - hiding a border when an element is empty

I recently had a situation where I have an element in the DOM that draws a
border around some content, but the element is initially empty and isn't
populated until the user does some action. The problem is, even though the
element is empty, the border (or at least, part of it) gets drawn on the page.

Let's say this is my element:

    :::html
    <span class="count"></span>

Well, what I can do to remove the border when the element is empty is to use the
[`:empty` pseudo-class selector](https://developer.mozilla.org/en-US/docs/Web/CSS/:empty):

    :::css
    .count:empty {
        border: none;
    }

That's it. One caveat though, `:empty` **only works if the element is completely
empty, including whitespace**.  Firefox does have a
[-moz-only-whitespace](https://developer.mozilla.org/en-US/docs/Web/CSS/:-moz-only-whitespace)
pseudo-class selector, but its not standard and I'm not sure if any other
browser has anything similar.
