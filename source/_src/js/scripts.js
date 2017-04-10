/*============================
=            Menu            =
============================*/

(function($) {
  var
    $body = $('body'),
    $toggle = $('.header__aside__toggle'),
    $navigation = $('.header__aside--navigation')
  ;

  $toggle.on('click', function(e) {
    e.preventDefault();
    $body.toggleClass('menu-toggle');
  });

  $navigation
    .find('.has-children')
    .on('click', 'a:first', function(e) {
      e.preventDefault();

      $(this)
        .next('div')
        .stop()
        .slideToggle({
          duration: 300,
          specialEasing: 'ease-in-out'
        });
    });

})(jQuery);

/*=====  End of Menu  ======*/


/*=================================
=            Carousels            =
=================================*/

(function($, device, Swiper) {
  var $cardsCarousel = $('.card-carousel');

  $cardsCarousel.each(function() {
    var $current = $(this);

    $current
      .find('.swiper-container')
      .swiper({
        spaceBetween: 20,
        speed: 800,
        simulateTouch: false,
        pagination: (device.mobile() && !device.tablet()) ? $current.find('.carousel__pagination') : $current.find('.carousel__fraction'),
        paginationType: (device.mobile() && !device.tablet()) ? "bullets" : "fraction",
        paginationHide: false,
        nextButton: $current.find('.carousel__next'),
        prevButton: $current.find('.carousel__prev'),
        onInit: function() {
          if ($current.find('.swiper-slide').length === 1) {
            $current
              .find('.carousel__pagination, .carousel__nav')
              .remove();
          }
        },
        breakpoints: {
          480:  { slidesPerView: 1 },
          790:  { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1920: { slidesPerView: 3.2 }
        }
      });
  });

  var $productsCarousel = $('.product-carousel');

  $productsCarousel.each(function() {
    var $current = $(this);

    $current
      .find('.swiper-container')
      .swiper({
        spaceBetween: 80,
        speed: 800,
        simulateTouch: false,
        pagination: (device.mobile() && !device.tablet()) ? $current.find('.carousel__pagination') : $current.find('.carousel__fraction'),
        paginationType: (device.mobile() && !device.tablet()) ? "bullets" : "fraction",
        paginationHide: false,
        nextButton: $current.find('.carousel__next'),
        prevButton: $current.find('.carousel__prev'),
        onInit: function() {
          if ($current.find('.swiper-slide').length === 1) {
            $current
              .find('.carousel__pagination, .carousel__nav')
              .remove();
          }
        },
        breakpoints: {
          480:  { slidesPerView: 1 },
          790:  { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
          1920: {
            slidesPerView: 5,
            slidesPerGroup: 2
          }
        }
      });
  });

})(jQuery, device, Swiper);

/*=====  End of Carousels  ======*/


/*====================================
=            Contacts Map            =
====================================*/

(function($) {

  var $maps = $('.map');

  if ($maps.length > 0) {
    $maps.each(function() {
      $(this).gmapWrapper({
        api: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD5uSIjpZp48NhabYqAMXQLTxDxXR1zhL4',
        mapSettings: {
          mapTypeControl: false,
          scaleControl: !device.desktop(),
          streetViewControl: !device.desktop(),
          rotateControl: !device.desktop(),
          panControl: !device.desktop(),
          zoomControl: true,
          scrollwheel: false,
          draggable: device.desktop(),
          styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
        }
      });
    });
  }

})(jQuery);

/*=====  End of Contacts Map  ======*/


/*=======================================
=            Preview Gallery            =
=======================================*/

(function($) {

  var $previews = $('.preview');

  $previews.each(function() {
    var
      $current = $(this),
      galleryList = []
    ;

    $current
      .find('.preview__gallery-list li')
      .each(function() {
        galleryList.push({
          src: $(this).data('src'),
          subHtml: $(this).html()
        });
      });

    console.log(galleryList);

    $current
      .find('.preview__anchor')
      .on('click', function(e) {
        e.preventDefault();

        $current.lightGallery({
          fullScreen: true,
          zoom: true,
          dynamic: true,
          dynamicEl: galleryList
        });
      });

  });

})(jQuery);


/*=====  End of Preview Gallery  ======*/


/*=========================================
=            Footer Scroll Top            =
=========================================*/

(function($) {

  $('.footer__scroll-top').on('click', function(e) {
    e.preventDefault();

    $.scrollTo(0, 1000, {
      axis: 'y',
      interrupt: true
    });
  });

})(jQuery);

/*=====  End of Footer Scroll Top  ======*/


/*=========================================
=            Post Sharer Affix            =
=========================================*/

(function($) {
  var
    $postSharer = $('.post__sharer .sharer'),
    $lastSectionText = $('.post__body .section[data-type="text"]')
  ;

  $postSharer.affix({
    offset: {
      top: 50 + $postSharer.outerHeight(),
      bottom: function () {
        return (this.bottom = $lastSectionText.next().offset().top + 100);
      }
    }
  });

})(jQuery);

/*=====  End of Post Sharer Affix  ======*/


