var _ = require('underscore');
var $ = require('jquery');

var PROPS = ['-webkit-transform', '-ms-transform', 'transform'];
var TRANSITION_END = 'transitionend webkitTransitionEnd oTransitionEnd';

function Gallery($el) {
  this.$el = $el;
}

Gallery.prototype.init = function() {
  if (this._init) { return; }
  this._init = true;

  this._transitioning = false;

  this.data = JSON.parse(this.$el.find('script.data').remove().html());

  this._position = 0;
  this._translatePixels = 0;

  this.$theater = this.$el.find('.theater');
  this.$theaterMain = this.$theater.find('.main');

  this.$slide = this.$theater.find('.slide');
  this.$slideInner = this.$slide.find('> .slide-inner-wrap > .slide-inner');
  this.$slideItems = this.$slideInner.find('.slide-item');

  this.$slideInner.on('click', '.slide-item', _.bind(this._handleSlideItemClick, this));

  this.$backButton = this.$slide.find('> button.back');
  this.$forwardButton = this.$slide.find('> button.forward');

  this.$forwardButton.on('click', _.bind(this._handleForward, this));
  this.$backButton.on('click', _.bind(this._handleBackward, this));

  // select the first slide item
  this.selectSlideItem(0);
};

Gallery.prototype.selectSlideItem = function(index) {
  $(this.$slideInner.find('.slide-item').get(index)).click();
};

Gallery.prototype._handleForward = function() {
  if (this._transitioning) { return; }

  var position = this._position + 1;
  if (position > this.data.images.length - 1) {
    position = this.data.images.length - 1;
  }
  // check to make sure we didn't go below 0
  if (position < 0) {
    position = 0;
  }
  this.selectSlideItem(position);
};

Gallery.prototype._handleBackward = function() {
  if (this._transitioning) { return; }

  var position = this._position - 1;
  if (position < 0) {
    position = 0;
  }
  this.selectSlideItem(position);
};

Gallery.prototype._handleSlideItemClick = function(e) {
  if (this._transitioning) { return; }

  var $slideItem = $(e.target).closest('.slide-item');
  var $selectedEl = this.$slideInner.find('.slide-item.selected');
  if ($selectedEl.get(0) === $slideItem.get(0)) {
    this._transitioning = false;
    return;
  }

  $selectedEl.removeClass('selected');
  $slideItem.addClass('selected');

  var imageUrl = $slideItem.attr('data-image-url');
  this._setMainTheaterImage(imageUrl);

  this._position = $slideItem.index();

  // if the left edge of the slide item is less than 0, we need
  // to translate
  var slideItemLeft = (this._position * $slideItem.outerWidth(true)) + this._translatePixels;
  if (slideItemLeft < 0) {
    // translate a couple behind the position we want
    // to view
    var p = this._position - 2;
    if (p < 0) { p = 0; }
    this._translateTo(p);
  }

  // if the right edge of the slide item extends past the edge of the
  // slide inner, then we need to translate
  var slideItemRight = ((this._position + 1) * $slideItem.outerWidth(true)) + this._translatePixels;
  if (slideItemRight > this.$slideInner.width()) {
    this._translateTo(this._position);
  }
};

Gallery.prototype._setMainTheaterImage = function(imageUrl) {
  this.$theaterMain.find('> .image').css('background-image', 'url(\'' + imageUrl + '\')');
};

Gallery.prototype._translateTo = function(position) {
  if (this._transitioning) { return; }
  this._transitioning = true;

  var slideItemWidth = this.$slideInner.find('.slide-item').outerWidth(true);
  this._translatePixels = -position * slideItemWidth;

  var translate = 'translate(' + this._translatePixels + 'px, 0)';
  _.each(PROPS, _.bind(function(transform) {
    this.$slideInner.css(transform, translate);
  }, this));

  setTimeout(_.bind(function() {
    this._transitioning = false;
  }, this), 600);
};

module.exports = Gallery;
