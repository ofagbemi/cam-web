var _ = require('underscore');
var $ = require('jquery');

var ComponentFactory = require('../../client/services/component-factory');

function SettingsHamburger($el) {
  this.$el = $el;
}

SettingsHamburger.prototype.init = function() {
  this.navComponent = null;
  $(document).ready(_.bind(function() {
    this.navComponent = ComponentFactory.getComponent($('[data-component="nav"]'));
    this.navComponent.on('open-settings', _.bind(this._open, this));
    this.navComponent.on('close-settings', _.bind(this._close, this));
  }, this));
};

SettingsHamburger.prototype._open = function() {
  this.$el.removeClass('hide');
};

SettingsHamburger.prototype._close = function() {
  this.$el.addClass('hide');
};

module.exports = SettingsHamburger;
