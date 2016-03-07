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
  if (this._init) { return; }
  this._init = true;

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


  this.$editButton = this.$el.find('button.edit');

  console.log(this.$editButton.length);
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
