Heya. I go into detail below, and then the questions reiterated
after that.

# How the Gmail floating button bar works

This is an implementation of the Gmail floating (pinned) button bar. You can
the Gmail version by clicking on an email thread, watching the Archive button,
and scrolling down.

The original bones of the first implementation in jquery are from [webspeaks
jquery
tutorial](http://www.webspeaks.in/2011/07/new-gmail-like-floating-toolbar-jquery.html). However,
that implementation relies heavily on the button bar having
`position:absolute` and the `top` attributes set in its CSS. This doesn't
really work out for a whole lot of uses cases.

Instead, this implementation reverse engineers what Gmail itself does. And by
"reverse engineers", I definitely mean "cargo cults".

The first trick is that when the user scrolls down past where the button bar
was original rendered,
Gmail will insert a div of the *same height* as the button bar before the
button bar but within its container. 

At that same time, it also sets the `style` attribute to
"position:fixed!important; top:0px;" on the button bar div in order to make it
scroll down with the user at the top of the browser window. Browers also seem
to reset the width of the button bar div when you do this, so the `style`
attribute is set back to original width of the div before the scrolling is
crucial. Gmail also sets the original left back on the div (which this
implementation does as well) but I haven't found the case where this is
necessary. Like I said, cargo culting.

I do not know why these settings have to be done in the `style`
attribute. Adding a class with the appropriate CSS seems to simply do
nothing.

When the user scrolls back up to where the button bar was, the inserted div is
removed from the DOM and the style on the button bar div is cleared out.

# My Questions

1. Do you have any idea why the element insertion makes this work?
2. Why does setting the style attribute work but adding a class with the same CSS not?
3. Why is the width (possibly the left?) of the button bar div reset by the
browser when you scroll, forcing the implementation to include the original
width and left in the style attribute? (May be because of the div insertion?)
