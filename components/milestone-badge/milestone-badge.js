var _ = require('underscore');

var Lightbox = require('../lightbox/lightbox');
var TemplateRenderer = require('../../client/services/template-renderer');
var ComponentFactory = require('../../client/services/component-factory');

function MilestoneBage($el)  {
  this.$el = $el;
}

MilestoneBage.prototype.init = function() {
  if (this._init) { return; }
  this._init = true;
  this.data = JSON.parse(this.$el.find('script.data').remove().html());

  this.$el.on('click', _.bind(this._handleClick, this));
};

MilestoneBage.prototype._handleClick = function() {
  if (this.$el.attr('data-gallery')) {
    this.$gallery = this._renderGalleryTemplate();
    Lightbox.show(this.$gallery);
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

module.exports = MilestoneBage;
