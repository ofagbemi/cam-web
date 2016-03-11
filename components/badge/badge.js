var _ = require('underscore');
var $ = require('jquery');

var TemplateRenderer = require('../../client/services/template-renderer');
var ComponentFactory = require('../../client/services/component-factory');

var BADGES = [
  'anchor', 'balloon', 'bolt', 'feather', 'flag', 'key',
  'kite', 'mountain', 'paw', 'plane', 'rocket', 'silly'
];
var BADGES_CLASSNAME = BADGES.join(' ');

function Badge($el) {
  this.$el = $el;
}

Badge.prototype.init = function() {
  if (this._init) { return; }
  this._init = true;

  this.$editButton = this.$el.find('button.edit');
  this.$editButton.on('click', _.bind(this._handleEdit, this));
  $('html').on('click', _.bind(this._handleHtmlClick, this));
};

Badge.prototype.setEditable = function(editable) {
  if (editable) {
    this.$el.addClass('editable');
  } else {
    this.$el.removeClass('editable');
  }
};

Badge.prototype._initPopover = function() {
  if (this._popInit) { return; }
  this._popInit = true;

  $(document).ready(_.bind(function() {
    this.$el.popover({
      container: this.$el,
      html: true,
      content: _.bind(function() {
        return this._renderBadgeMenuTemplate();
      }, this),
      trigger: 'manual'
    });
  }, this));
};

Badge.prototype._handleEdit = function(e) {
  if(this.$el.hasClass('editable') && !this.$el.hasClass('active')) {
    this._openBadgeMenu();
  }
};

Badge.prototype._handleHtmlClick = function(e) {
  var el = this.$el.get(0);
  if(el !== e.target && !el.contains(e.target)) {
    this._closeBadgeMenu();
  }
};

Badge.prototype._openBadgeMenu = function() {
  this._initPopover(); // just returns if popover's already
                        // been initialized
  this.$el.popover('show');
  this.$el.addClass('active');
};

Badge.prototype._closeBadgeMenu = function() {
  this.$el.popover('hide');
  this.$el.removeClass('active');
};

Badge.prototype._renderBadgeMenuTemplate = function() {
  var $template = TemplateRenderer.renderTemplate('badge-menu/badge-menu', {
    badges: BADGES
  });
  var badgeMenu = ComponentFactory.getComponent($template);
  badgeMenu.on('select-badge', _.bind(this._handleSelectBadge, this));
  return $template;
};

Badge.prototype._handleSelectBadge = function(badge, badgeMenu) {
  this.$el.removeClass(BADGES_CLASSNAME);
  this.setBadge(badge);
};

Badge.prototype.setBadge = function(badge) {
  this.$el.addClass(badge);
};

Badge.prototype.clear = function() {
  this.$el.removeClass(BADGES_CLASSNAME);
};

module.exports = Badge;
