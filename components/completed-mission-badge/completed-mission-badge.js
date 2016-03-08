var _ = require('underscore');
var Lightbox = require('../lightbox/lightbox');

var TemplateRenderer = require('../../client/services/template-renderer');
var ComponentFactory = require('../../client/services/component-factory');

function CompletedMissionBadge($el) {
  this.$el = $el;
}

CompletedMissionBadge.prototype.init = function() {
  if (this._init) { return; }
  this._init = true;

  this.data = JSON.parse(this.$el.find('script.data').html());
  this.$el.on('click', _.bind(this._handleClick, this));
};

CompletedMissionBadge.prototype._handleClick = function() {
  this.$gallery = this._renderGalleryTemplate();
  this.galleryComponent = ComponentFactory.getComponent(this.$gallery);

  Lightbox.show(this.$gallery, _.bind(function() {
    this.galleryComponent.masonry();
  }, this));
  window.galleryComp = this.galleryComponent;
};

CompletedMissionBadge.prototype._renderGalleryTemplate = function() {
  var images = [];

  var that = this;
  _.each(this.data.milestones, function(milestone) {
    _.each(milestone.imageUrls, function(url) {
      images.push({
        imageUrl: url,
        main: (that.data.main === url)
      });
    });
  });

  return TemplateRenderer.renderTemplate('gallery/gallery', {
    badge: this.data.badge,
    title: this.data.title,
    images: images
  });
};

module.exports = CompletedMissionBadge;
