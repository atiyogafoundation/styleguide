(function($, device, Swiper) {
  var $cardsCarousel = $('.card-carousel');

  $cardsCarousel.each(function() {
    var $current = $(this)

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
    $(this)
      .find('.swiper-container')
      .swiper({
        spaceBetween: 80,
        speed: 800,
        simulateTouch: false,
        pagination: (device.mobile() && !device.tablet()) ? $(this).find('.carousel__pagination') : $(this).find('.carousel__fraction'),
        paginationType: (device.mobile() && !device.tablet()) ? "bullets" : "fraction",
        paginationHide: false,
        nextButton: $(this).find('.carousel__next'),
        prevButton: $(this).find('.carousel__prev'),
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
