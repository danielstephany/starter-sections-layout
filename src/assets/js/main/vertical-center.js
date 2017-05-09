/*!
 * vertical center code relies on the imagesLoaded PACKAGED v4.1.1 located in img-load.js
 */

(function($){
    verticalCenter();

    function verticalCenter() {
        var $centeredItem = $('[data-center=true]');
        var breakpoint = 768;
        function center_call(){
            $centeredItem.each(function(){
                var $item = $(this);
                $item.css({
                    "padding-top": "0",
                    "margin": "0"
                });
                var $item_img = $item.find('img');
                // checking if there is an img as a child of the centered item so center call can be delayed till after image loads.
                if($item_img.length){
                    $item.imagesLoaded(function() {
                        center($item);
                    });
                } else {
                    center($item);
                }
            });
        }

        // function used to centers the item
        function center($item){
            var newPadding;
            var ItemHeight = $item.outerHeight();
            var parentH = $item.parent().outerHeight();
            newPadding = (parentH - ItemHeight)/2;
            if (newPadding <= 0){
                newPadding = 0;
            }
            if($(window).width() >= breakpoint){
                $item.css({
                    "padding-top": newPadding,
                    "margin": "0"
                });
            } else {
                $item.css({
                    "padding-top": "0",
                    "margin": "0"
                });
            }
        }

        center_call();
        $(window).on('resize', function(){
            center_call();
        });
    }
})(jQuery);
