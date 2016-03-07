var _ = require('underscore');
var $ = require('jquery');

var TemplateRenderer = require('../../client/services/template-renderer');

var BADGES = [
  'anchor', 'balloon', 'bolt', 'feather', 'flag', 'key',
  'kite', 'mountain', 'paw', 'plane', 'rocket', 'silly'
];

function Badge($el) {
  this.$el = $el;
}

Badge.prototype.init = function() {
  $(document).ready(_.bind(function() {
    this.$el.popover({
      container: this.$el,
      html: true,
      content: _.bind(function() {
        var $template = this._renderBadgeMenuTemplate();
        return $template.wrap('<div></div>').parent().html();
      }, this)
    });
  }, this));

  this.$el.on('click', _.bind(this._handleClick, this));
  $('html').on('click', _.bind(this._handleHtmlClick, this));
};

Badge.prototype._handleClick = function(e) {
  if (this.$el.hasClass('active')) {
    // don't hide the popover if the click hits the popover
    // element
    var popoverEl = this.$el.find('.popover').get(0);
    if (popoverEl && popoverEl !== e.target && !popoverEl.contains(e.target)) {
      this._closeBadgeMenu();
    }
  } else {
    this._openBadgeMenu();
  }
};

Badge.prototype._handleHtmlClick = function(e) {
  if (e.target === this.$el.get(0)) { return; }

  var popoverEl = this.$el.find('> .popover').get(0);
  if (popoverEl && e.target !== popoverEl && !popoverEl.contains(e.target)) {
    this._closeBadgeMenu();
  }
};

Badge.prototype._openBadgeMenu = function() {
  this.$el.popover('show');
  this.$el.addClass('active');
};

Badge.prototype._closeBadgeMenu = function() {
  this.$el.popover('hide');
  this.$el.removeClass('active');
};

Badge.prototype._renderBadgeMenuTemplate = function() {
  return TemplateRenderer.renderTemplate('badge-menu/badge-menu', {
    badges: BADGES
  });
};

module.exports = Badge;
