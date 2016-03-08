var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');

var Lightbox = require('../lightbox/lightbox');
var TemplateRenderer = require('../../client/services/template-renderer');
var ComponentFactory = require('../../client/services/component-factory');

function MilestoneBage($el)  {
  this.$el = $el;
}
inherits(MilestoneBage, EventEmitter);

MilestoneBage.prototype.init = function() {
  if (this._init) { return; }
  this._init = true;
  this.data = JSON.parse(this.$el.find('script.data').remove().html());

  this.$el.on('click', _.bind(this._handleClick, this));
  this.$timesCompleted = this.$el.find('.times-completed');
};

MilestoneBage.prototype._handleClick = function() {
  if (this.$el.attr('data-gallery')) {
    this.$gallery = this._renderGalleryTemplate();
    this.galleryComponent = ComponentFactory.getComponent(this.$gallery);
    Lightbox.show(this.$gallery, _.bind(function() {
      this.emit('show-gallery', this.galleryComponent);
    }, this));
  }
};

MilestoneBage.prototype._renderGalleryTemplate = function() {
  var images = _.map(this.data.imageUrls, function(url) {
    return { imageUrl: url };
  });
  return TemplateRenderer.renderTemplate('gallery/gallery', {
    title: this.data.title,
    images: images
  });
};

MilestoneBage.prototype.setTimesCompleted = function(num) {
  if (num > 0) {
    this.$el.addClass('show-times-completed');
  } else {
    this.$el.removeClass('show-times-completed');
    this.$el.css('background-image', '');
  }

  this.data.timesCompleted = num;
  this.$timesCompleted.find('> span').text(num);
};

MilestoneBage.prototype.getTimesCompleted = function(num) {
  return this.data.timesCompleted;
};

module.exports = MilestoneBage;
