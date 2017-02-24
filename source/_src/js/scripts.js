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
          1920: { slidesPerView: 3 }
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
