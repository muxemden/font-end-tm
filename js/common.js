/**
 * Created by HoangVu on 10/6/2014.
 */
$(document).ready(function(){
    //--Menu
    $('#mega-menu-1').dcMegaMenu({
        speed: 'fast',
        effect: 'slide'
    });

    //--Scroll list manga suggest of top
    $('#manga-carousel-top').carouFredSel({
        auto: false,
        prev: '#prevTop',
        next: '#nextTop',
    });
});