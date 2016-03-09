var _ = require('underscore');
var $ = require('jquery');
var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');

function BadgeMenu($el) {
  EventEmitter.call(this);
  this.$el = $el;
}
inherits(BadgeMenu, EventEmitter);

BadgeMenu.prototype.init = function() {
  if (this._init) { return; }
  this._init = true;

  var badgeSelector = '> .badges > .badge-wrapper > [data-component="badge"]';
  this.$el.on('click', badgeSelector, _.bind(this._handleSelect, this));
};

BadgeMenu.prototype._handleSelect = function(e, badgeMenu) {
  var $badge = $(e.target).closest('[data-component="badge"]');
  var badge = $badge.attr('data-badge');
  this.emit('select-badge', badge, this);
};

module.exports = BadgeMenu;
