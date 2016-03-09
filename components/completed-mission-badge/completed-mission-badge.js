var _ = require('underscore');
var $ = require('jquery');

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

  this.$moreButton = this.$el.find('button.more');

  this.$el.on('click', _.bind(this._handleClick, this));
  this.$moreButton.on('click', _.bind(this._handleMore, this));
  $('html').on('click', _.bind(this._handleHtmlClick, this));

  $(document).ready(_.bind(function() {
    this.$moreButton.popover({
      container: this.$moreButton,
      html: true,
      content: _.bind(function() {
        return this._renderFamilyListTemplate();
      }, this),
      trigger: 'manual'
    });
  }, this));
};

CompletedMissionBadge.prototype._handleClick = function(e) {
  // if the event's coming from the more button,
  // ignore it
  if ($(e.target).closest('button.more').length > 0) {
    return;
  }

  this.$gallery = this._renderGalleryTemplate();
  Lightbox.show(this.$gallery);
};

CompletedMissionBadge.prototype._handleMore = function() {
  this.$moreButton.addClass('active');
  this.$moreButton.popover('show');
};

CompletedMissionBadge.prototype._handleHtmlClick = function(e) {
  var el = this.$el.get(0);
  if (el !== e.target && !el.contains(e.target)) {
    this.$moreButton.removeClass('active');
    this.$moreButton.popover('hide');
  }
};

CompletedMissionBadge.prototype._renderGalleryTemplate = function() {
  var images = [];

  var that = this;
  _.each(this.data.milestones.completed, function(milestone) {
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

CompletedMissionBadge.prototype._renderFamilyListTemplate = function() {
  return TemplateRenderer.renderTemplate('family-list/family-list', {
    family: this.data.family
  });
};

module.exports = CompletedMissionBadge;
