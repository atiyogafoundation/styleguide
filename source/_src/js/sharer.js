/**
 * data-share-dialog: window|popup optional
 * data-url: optional
 * data-title: optional
 * data-description: optional
 * data-source: optional
 */
var sharer = (function($, window, document, undefined) {
  "use strict";

  var _this = $('.sharer');

  function init() {
    if (_this.data('__share'))
      return;
    _this.data('__share',true);
    _this.data('share-dialog', 'popup');
    _this.dialog = (_this.data('share-dialog') === undefined) ? 'window' : _this.data('share-dialog');
    _this._url = (_this.data('url') === undefined) ? location.href : _this.data('url');
    _this._title = (_this.data('title') === undefined) ? $('title').text() : _this.data('title');
    _this.find('.facebook').click(facebook);
    _this.find('.twitter').click(twitter);
    _this.find('.google-plus').click(gplus);
    _this.find('.linkedin').click(linkedin);
    _this.find('.email').click(email);
  }

  function facebook(event) {
    event.preventDefault();
    openPopup('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(_this._url), 'facebook-share-dialog', 550, 450);
  }

  function twitter(event) {
    event.preventDefault();
    openPopup('https://twitter.com/intent/tweet?url=' + encodeURIComponent(_this._url) + '&text=' + encodeURIComponent(_this._title), 'twitter-share-dialog', 550, 450);
  }

  function gplus(event) {
    event.preventDefault();
    openPopup('https://plus.google.com/share?url=' + encodeURIComponent(_this._url), 'facebook-share-dialog', 550, 450);
  }

  function linkedin(event) {
    event.preventDefault();
    openPopup('https://www.linkedin.com/shareArticle?url=' + encodeURIComponent(_this._url), 'linkedin-share-dialog', 550, 450);
  }

  function email(event) {
    event.preventDefault();
    var emailTo = '',
      subject = _this._title,
      body = _this._title + "\n\n" + _this._url + "\n\n";
    location.href = 'mailto:' + emailTo + "?Subject=" + escape(subject) + "&Body=" + escape(body);
  }

  function openPopup(url, title, w, h) {
    if (_this.dialog == "popup") {
      var left = (screen.width / 2) - (w / 2), top = (screen.height / 2) - (h / 2);
      return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
    } else {
      return window.open(url);
    }
  }

  init();

})(jQuery, window, document);
