(function($, device, Swiper) {
  var $cardsCarousel = $('.card-list.card-list--carousel');

  $cardsCarousel.each(function() {
    $(this)
      .find('.swiper-container')
      .swiper({
        speed: 600,
        spaceBetween: 20,
        simulateTouch: false,
        pagination: "",
        paginationType: "bullet", // fraction
        nextButton: "",
        prevButton: "",
        breakpoints: {
          480:  { slidesPerView: 1 },
          790:  { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1920: {
            slidesPerView: 4,
            slidesPerGroup: 2
          }
        }
      });
  });

  var $carousels = $('.carousel');

  $carousels.each(function() {
    var $current = $(this);

    $current
      .find('.swiper-container')
      .swiper({
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
        }
      });
  });

})(jQuery, device, Swiper);
