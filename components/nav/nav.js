var _ = require('underscore');
var $ = require('jquery');

var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;

var TemplateRenderer = require('../../client/services/template-renderer');
var ServerData = require('../../client/services/server-data');

function Nav($el) {
  EventEmitter.call(this);
  this.$el = $el;
}
inherits(Nav, EventEmitter);

Nav.prototype.init = function() {
  if (this._init) { return; }
  this._init = true;

  this.$activityButton = this.$el.find('button.activity');
  this.$settingsButton = this.$el.find('button.settings');

  $(document).ready(_.bind(function() {
    this.$activityButton.popover({
      container: '[data-component="nav"] .buttons',
      html: true,
      content: _.bind(function() {
        return this._renderActivityTemplate();
      }, this)
    });
  }, this));

  this.$activityButton.on('click', _.bind(this._handleActivityClick, this));

  this.$settingsButton.on('click', _.bind(this._handleSettingsClick, this));
  this.$settingsHamburger = $('[data-component="settings-hamburger"]');

  $('html').on('click', _.bind(this._handleHtmlClickActivity, this));
  $('html').on('click', _.bind(this._handleHtmlClickSettings, this));
};

Nav.prototype._handleActivityClick = function() {
  if(this.$activityButton.hasClass('active')) {
    this._closeActivity();
  } else {
    this._openActivity();
  }
};

Nav.prototype._handleSettingsClick = function() {
  if (this.$settingsButton.hasClass('active')) {
    this._closeSettings();
  } else {
    this._openSettings();
  }
};

Nav.prototype._handleHtmlClickActivity = function(e) {
  if (e.target === this.$activityButton.get(0)) { return; }

  var popoverEl = this.$el.find('.buttons .popover').get(0);
  if (popoverEl && e.target !== popoverEl && !popoverEl.contains(e.target)) {
    this._closeActivity();
  }

};

Nav.prototype._handleHtmlClickSettings = function(e) {
  if (e.target === this.$settingsButton.get(0)) { return; }

  var hamburgerEl = this.$settingsHamburger.get(0);
  if (e.target !== hamburgerEl && !hamburgerEl.contains(e.target)) {
    this._closeSettings();
  }
};

Nav.prototype._openActivity = function() {
  this.$activityButton.addClass('active');
  this.$activityButton.popover('show');
};

Nav.prototype._closeActivity = function() {
  this.$activityButton.removeClass('active');
  this.$activityButton.popover('hide');
};

Nav.prototype._openSettings = function() {
  this.$settingsButton.addClass('active');
  this.emit('open-settings', this);
};

Nav.prototype._closeSettings = function() {
  this.$settingsButton.removeClass('active');
  this.emit('close-settings', this);
};

Nav.prototype._renderActivityTemplate = function() {
  return TemplateRenderer.renderTemplate('activity/activity', {
    activity: ServerData.getActivity()
  });
};

Nav.prototype.activateAgent = function() {
  this.$el.addClass('activate-agent');
};

Nav.prototype.deactivateAgent = function() {
  this.$el.removeClass('activate-agent');
};

module.exports = Nav;
