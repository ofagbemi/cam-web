var _ = require('underscore');
var $ = require('jquery');

var ComponentFactory = require('../../client/services/component-factory');

function MissionCard($el) {
  this.$el = $el;
}

MissionCard.prototype.init = function() {
  this.titleComponent = ComponentFactory.getComponent(this.$el.find('[data-component="text-box"].title'));
  this.closeComponent = ComponentFactory.getComponent(this.$el.find('[data-component="close"]'));
  this.addMilestonesComponent = ComponentFactory.getComponent(this.$el.find('[data-component="add-milestones"]'));

  this.closeComponent.on('close', _.bind(this._handleClose, this));

  this.$saveButton = this.$el.find('[data-component="button-group"] button.save');
  this.$cancelButton = this.$el.find('[data-component="button-group"] button.cancel');

  this.$saveButton.on('click', _.bind(this._handleSave, this));
  this.$cancelButton.on('click', _.bind(this._handleCancel, this));

//  $('html').on('click', _.bind(this._handleHtmlClick, this));
  this.$el.on('click', _.bind(this._handleClick, this));
};

MissionCard.prototype._handleClick = function() {
  if (this.$el.hasClass('active')) { return; }

  this.$el.addClass('active');
  this.titleComponent.focus();
};

MissionCard.prototype._handleSave = function() {
  this._handleClose();
};

MissionCard.prototype._handleCancel = function() {
  this._handleClose();
};

MissionCard.prototype._handleClose = function() {
  // move past the event loop -- click events trigger
  // _handleClick
  setTimeout(_.bind(function() {
    this.$el.removeClass('active');
    this.clear();
  }, this));
};

MissionCard.prototype.clear = function() {
  if (this.$el.hasClass('create')) {
    this.titleComponent.clear();
  }
  this.addMilestonesComponent.clear();
};

module.exports = MissionCard;
