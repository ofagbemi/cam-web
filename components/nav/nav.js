var _ = require('underscore');
var $ = require('jquery');

var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;

function Nav($el) {
  EventEmitter.call(this);
  this.$el = $el;
}
inherits(Nav, EventEmitter);

Nav.prototype.init = function() {
  if (this._init) { return; }
  this._init = true;

  this.$settingsButton = this.$el.find('button.settings');
  this.$activityButton = this.$el.find('button.activity');

  this.$settingsButton.on('click', _.bind(this._handleSettingsClick, this));
  this.$settingsHamburger = $('[data-component="settings-hamburger"]');

  $('html').on('click', _.bind(this._handleHtmlClick, this));
};

Nav.prototype._handleSettingsClick = function() {
  if (this.$settingsButton.hasClass('active')) {
    this._closeSettings();
  } else {
    this._openSettings();
  }
};

Nav.prototype._handleHtmlClick = function(e) {
  if (e.target === this.$settingsButton.get(0)) { return; }

  var hamburgerEl = this.$settingsHamburger.get(0);
  if (e.target !== hamburgerEl && !hamburgerEl.contains(e.target)) {
    this._closeSettings();
  }
};



Nav.prototype._openSettings = function() {
  this.$settingsButton.addClass('active');
  this.emit('open-settings', this);
};

Nav.prototype._closeSettings = function() {
  this.$settingsButton.removeClass('active');
  this.emit('close-settings', this);
};

module.exports = Nav;
