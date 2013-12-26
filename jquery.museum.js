;(function($) {

    $.gallery = function(el, options) {

        var defaults = {
            namespace: 'murat-',
        }

        var plugin = this;

        plugin.settings = {}

        plugin.current_image = null;

        var init = function() {
            plugin.settings = $.extend({}, defaults, options);
            plugin.el = el;
            plugin.images = [];
            plugin.el.each(function(i, e) {
                var src = $(e).attr('src');
                var title = $(e).attr('title');
                plugin.images[i] = {
                    src: src,
                    title: title,
                    elem: e,
                };
                $(this).wrap($('<a>').attr('href', src).bind('click', function(ev){
                    if(!ev.metaKey) {
                        ev.preventDefault();
                        plugin.show_gallery(i);
                    }
                }));
            });
        }

        plugin.show_gallery = function(i) {
            plugin.container = $('<div>').addClass(plugin.settings.namespace + 'gallery').appendTo($('body'));
            plugin.container.css({
                'position': 'absolute',
                'top': $(document).scrollTop() + 'px',
                'left': '0',
                'min-width': '100%',
                'min-height': '100%',
                'background': 'rgba(0, 0, 0, 0.7)',
                'display': 'table',
                'text-align': 'center',
            });
            plugin.container.click(function(e){
                plugin.close();
            });
            plugin.content = $('<div>').addClass(plugin.settings.namespace + 'content');
            plugin.content.css({
                'visibility': 'invisible',
                'margin': '15px',
                'vertical-align': 'middle',
                'display': 'table-cell',
            });
            plugin.show_loader();
            plugin.show_image(i);
        }

        plugin.show_image = function(i) {
            plugin.current_image = i;
            plugin.content.empty();
            plugin.image = $('<img>').attr('src', plugin.images[i].src).appendTo(plugin.content);
            plugin.image.css({
                'max-height': ( $(window).height() - 30 ) + 'px',
                'max-width': ( $(window).width() - 30 ) + 'px',
                'box-shadow': '0 0 15px 0 #000',
                'cursor': 'pointer',
                'background': 'rgba(0,0,0,0.6)',
            });
            plugin.image.click(function(e) {
                e.stopPropagation();
                plugin.next_image();
            });
            plugin.show_image_when_available();

        }

        plugin.show_image_when_available = function() {
            if(plugin.image[0].height && plugin.image[0].width) {
                plugin.content = plugin.content.appendTo(plugin.container);
                plugin.content.css({
                    'margin': '15px auto',
                    'width': plugin.image.width(),
                    'height': plugin.image.height(),
                });
                plugin.content.css({
                    'visibility': 'visible',
                });
                plugin.hide_loader();
            } else {
                setTimeout(plugin.show_image_when_available, 50);
            }
        }

        plugin.next_image = function() {
            plugin.show_image((plugin.current_image + 1) % plugin.images.length);
        }

        plugin.show_loader = function() {
            // no need
        }

        plugin.hide_loader = function() {
            // no need
        }

        plugin.close = function() {
            plugin.container.remove();
        }

        init();

    }

})(jQuery);
