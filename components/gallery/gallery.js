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
  this.position = 0;

  this.$theater = this.$el.find('.theater');
  this.$theaterMain = this.$theater.find('.main');
  this.$slide = this.$theater.find('.slide');
  this.$slideInner = this.$slide.find('.slide-inner');

  this.$slideInner.on('click', '.slide-item', _.bind(this._handleSlideItemClick, this));

  this.$backButton = this.$slide.find('button.back');
  this.$forwardButton = this.$slide.find('button.forward');

  this.$forwardButton.on('click', _.bind(this._handleForward, this));
  this.$backButton.on('click', _.bind(this._handleBackward, this));

  this.$grid = this.$el.find('.grid');
  this.$grid.on('click', '.grid-item', _.bind(this._handleGridItemClick, this));

  this.masonry();
};

Gallery.prototype.masonry = function() {
  var msnry = new Masonry( this.$grid.get(0), {
    itemSelector: '.grid-item',
    columnWidth: 150,
    transitionDuration: 0
  });
};

Gallery.prototype.getTranslate = function(position) {
  var slideItemWidth = this.$slideInner.find('.slide-item').outerWidth(true);
  return 'translate(' + (-position * slideItemWidth) + 'px, 0)';
};

Gallery.prototype._handleForward = function() {

  if (this._transitioning) { return; }

  this._transitioning = true;

  this.position += 2;
  if (this.position > this.data.images.length - 2) {
    this.position = this.data.images.length - 2;
  }

  var translate = this.getTranslate(this.position)
  _.each(PROPS, _.bind(function(transform) {
    this.$slideInner.css(transform, translate);
  }, this));

  setTimeout(_.bind(function() {
    this._transitioning = false;
  }, this), 600);
};

Gallery.prototype._handleBackward = function() {

  if (this._transitioning) { return; }

  this._transitioning = true;
  this.position -= 2;
  if (this.position < 0) {
    this.position = 0;
  }

  var translate = this.getTranslate(this.position)
  _.each(PROPS, _.bind(function(transform) {
    this.$slideInner.css(transform, translate);
  }, this));

  setTimeout(_.bind(function() {
    this._transitioning = false;
  }, this), 600);
};

Gallery.prototype._handleSlideItemClick = function(e) {
  var $slideItem = $(e.target).closest('.slide-item');
  var imageUrl = $slideItem.attr('data-image-url');
  this._setMainTheaterImage(imageUrl);
};

Gallery.prototype._handleGridItemClick = function(e) {
  console.log('hi');
  var $gridItem = $(e.target).closest('.grid-item');
  var imageUrl = $gridItem.attr('data-image-url');
  this.$el.addClass('theater-mode');

  console.log(imageUrl);

  this.$slideInner.find('.slide-item[data-image-url="' + imageUrl + '"]').click();

//  var $slideItem = $(e.target).closest('.slide-item');
//  var imageUrl = $slideItem.attr('data-image-url');
//  this._setMainTheaterImage(imageUrl);
};

Gallery.prototype._setMainTheaterImage = function(imageUrl) {
  var $img = $('<img/>', {
    src: imageUrl
  });
  console.log($img.get(0));
  this.$theaterMain.empty().append($img);
};

module.exports = Gallery;
