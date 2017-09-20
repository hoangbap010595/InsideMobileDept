
$(document).ready(function () {
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll < 100) {
            $("#headerBottom").removeClass("navbar-fixed-top");
            $("#menu").addClass("menu");
        }
        else {
            $("#menu").removeClass("menu");
            $("#headerBottom").addClass("navbar-fixed-top");
        }
    });
})