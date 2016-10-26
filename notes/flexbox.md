
# Flexbox

## Hacks and workarounds

### Filling the height of the page

Sometimes you want a flexbox layout that takes advantage of the whole page, but
you can't set the body to height 100% because it might be longer than the
viewport.  In this case you can use `min-height: 100%`, but you still need
to set a height.

    html {
      height: 100%;
    }
    body {
      min-height: 100%;
      height: 1px;
    }

The height: 1px thing is a hack to get child elements to size with respect
to the min-height.  See http://stackoverflow.com/a/21836870.

Note you can also push something to the bottom of the page by doing:

    body {
      position: relative;
      padding-bottom: 78px; /* or whatever is the height of thing at bottom */
    }

    footer {
      position: absolute;
      bottom: 0px;
      width: 100%;
      height: 78px;
    }
