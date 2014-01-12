;(function($) {

    $.museum = function(el, options) {

        var defaults = {
            namespace: 'msm',
            padding: 25,
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
            $(document).keydown(function(e) {
                if (e.keyCode == 27) {
                    plugin.close();
                }
            });

            var plugin_hash ='#' + plugin.settings.namespace+'-gallery';
            if(window.location.hash.substring(0, plugin_hash.length) === plugin_hash) {
                var image_id = window.location.hash.split('-')[2];
                plugin.show_gallery(image_id);
            }
            plugin.prev_hash = window.location.hash;
        }

        plugin.show_gallery = function(i) {
            plugin.container = $('<div>').addClass(plugin.settings.namespace + '-gallery').appendTo($('body'));
            plugin.container.css({
                'position': 'absolute',
                'top': '0',
                'left': '0',
                'width': $(document).width() + 'px',
                'height': $(document).height() + 'px',
                'background': 'rgba(0, 0, 0, 0.7)',
                'text-align': 'center',
            });
            plugin.container.click(function(e){
                plugin.close();
            });
            plugin.content = $('<div>').addClass(plugin.settings.namespace + '-content');


            plugin.content.css({
                'visibility': 'invisible',
            });
            plugin.show_image(i);
        }

        plugin.show_image = function(i) {
            window.location.hash = plugin.settings.namespace + '-gallery-' + i;

            plugin.current_image = i;
            plugin.content.empty();
            var window_height = window.innerHeight ? window.innerHeight : $(window).height()
            var window_width = window.innerWidth ? window.innerWidth : $(window).width()
            plugin.image = $('<img>')
                .css({
                    'max-height': ( window_height - (plugin.settings.padding*2) ) + 'px',
                    'max-width': ( window_width - (plugin.settings.padding*2) ) + 'px',
                    'box-shadow': '0 0 15px 0 #000',
                    'cursor': 'pointer',
                    'background': 'rgba(0,0,0,0.6)',
                })
                .attr('src', plugin.images[i].src)
                .appendTo(plugin.content)
                .click(function(e) {
                    e.stopPropagation();
                    plugin.next_image();
                });
            plugin.show_image_when_available();

        }

        plugin.show_image_when_available = function() {
            // we will know how wide/tall the image is once it starts downloading it
            if(plugin.image[0].height && plugin.image[0].width) {
                plugin.content = plugin.content.appendTo(plugin.container);

                var window_height = window.innerHeight ? window.innerHeight : $(window).height()
                var window_width = window.innerWidth ? window.innerWidth : $(window).width()

                var margin_top = ($(document).scrollTop() + ((window_height - plugin.image.height()) / 2));
                var margin_left = ($(document).scrollLeft() + ((window_width - plugin.image.width()) / 2));

                plugin.content.css({
                    'margin-top': margin_top + 'px',
                    'margin-left': margin_left + 'px',
                    'width': plugin.image.width(),
                    'height': plugin.image.height(),
                });
                plugin.content.css({
                    'visibility': 'visible',
                });
            } else {
                setTimeout(plugin.show_image_when_available, 50);
            }
        }

        plugin.next_image = function() {
            plugin.show_image((plugin.current_image + 1) % plugin.images.length);
        }

        plugin.close = function() {
            window.location.hash = plugin.prev_hash;
            plugin.container.remove();
        }

        init();
    }

})(jQuery);
