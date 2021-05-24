// autoplay
// $(function ($) {
//     var autoplaySlider = $('#content-slider').lightSlider({
//         auto: true,
//         keyPress: true,
//         loop: true,
//         pauseOnHover: true,
//         onBeforeSlide: function (el) {
//             $('#current').text(el.getCurrentSlideCount());
//         }
//     });
//     $('#total').text(autoplaySlider.getTotalSlideCount());
// });





$(document).ready(function () {

    if (document.getElementById('#content-slider')) {

    }
    $('#content-slider').lightSlider({
        item: 5,
        enableDrag: true,
        keyPress: true,
        loop: true,
        slideMove: 3,
        easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
        speed: 600,
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    item: 3,
                    slideMove: 1,
                    slideMargin: 6,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    item: 2,
                    slideMove: 1
                }
            }
        ]
    });
});

//menu toggle
$(function () {
    $("#menuBtn").on("click", function () {
        $("#menuItems").toggle(200);
    });
});