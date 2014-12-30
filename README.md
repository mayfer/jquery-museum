jquery-museum
=============

A zero-clutter jQuery image gallery.

[View Demo](http://muratayfer.com/secret-box/jquery-museum/)

* Single file.
* Works well on desktop &amp; mobile.
* Clicking the image (or hitting arrow keys) goes to the next one.
* Clicking outside the image (or hitting escape) closes the overlay.
* Images can be deep-linked (uses URL hash).
* The browser back button is respected.

No other animations or styling.

Just add `<script src='jquery.museum.js'></script>` to your head and initialize it with `$.museum($('#relevant-context img'));`. Make sure the selected elements are `<img>` tags.

You may also add a fullsize data tag to the img element to load a larger image in the gallery:

`<img src="thumb.jpg" data-fullsize="large.jpg" />`
