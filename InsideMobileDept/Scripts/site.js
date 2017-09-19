
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

    var $toggleButton = $('.toggle-button'),
        $menuWrap = $('.menu-wrap'),
        $menuToggle = $('.menu-toggle'),
        $panelMain = $('.panel-main');
    // Hamburger button
    $toggleButton.on('click', function () {
        $(this).toggleClass('button-open');
        $menuWrap.toggleClass('menu-show');
        $menuToggle.toggleClass('menu-toggle-move');
        $panelMain.toggleClass('panel-main-move');
    });

    var $sidebarArrow = $('.sidebar-menu-arrow');

    // Sidebar navigation arrows

    $sidebarArrow.click(function () {
        $(this).next().slideToggle(300);
    });
})