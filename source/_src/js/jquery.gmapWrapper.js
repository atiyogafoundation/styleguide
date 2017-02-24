/**
 * jQuery Google Maps Wrapper
 *
 * Create a fast google map instance using data attributes:
 *
 * data-lat: place latitude
 * data-lng: place longitude
 * data-zoom: init map zoom level
 * data-marker-icon: define marker icon url
 * data-url: define url to open on marker click
 */

(function($) {

  'use strict';

  $.fn.gmapWrapper = function(options) {

    var
      $window = $(window),
      $map = this,
      isApiLoaded = $window.data('gmaploaded'),
      settings = $.extend({
        api: 'http://maps.googleapis.com/maps/api/js?v=3&sensor=false',
        mapSettings: {}
      }, options)
    ;

    function loadScript(src, callback){
      var script = document.createElement("script");
      script.type = "text/javascript";
      if(callback)script.onload=callback;
      document.getElementsByTagName("head")[0].appendChild(script);
      script.src = src;
    }

    function draw() {
      var
        location = new google.maps.LatLng($map.data('lat'), $map.data('lng')),
        map,
        marker,
        markerOptions = {}
      ;

      map = new google.maps.Map($map[0], $.extend({
        center: location,
        zoom: $map.data('zoom') ? $map.data('zoom') : 10,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.SMALL,
          position: google.maps.ControlPosition.LEFT_CENTER
        }
      }, settings.mapSettings));

      markerOptions.position = location;
      markerOptions.map = map;

      if ($map.data('url')) {
        markerOptions.url = $map.data('url');
      }

      if ($map.data('marker-icon')) {
        markerOptions.icon = $map.data('marker-icon');
      }

      marker = new google.maps.Marker(markerOptions);

      google.maps.event.addListener(marker, 'click', function() {
        window.open(this.url);
      });

      // Show map when it is full loaded
      google.maps.event.addListenerOnce(map, 'tilesloaded', function(e) {
        $map.addClass('loaded');
      });

      $window.on('resize', function() {
        map.setCenter(location);
      });
    }

    if (isApiLoaded === true) {
      draw();
    } else {
      $window.one('gmaploaded', function() {
        draw();
      });
    }

    if (isApiLoaded === undefined) {
      $window.data('gmaploaded', 'loading');

      loadScript(settings.api, function() {
        $window
          .data('gmaploaded', true)
          .trigger('gmaploaded');
      });
    }
  };

})(jQuery);
