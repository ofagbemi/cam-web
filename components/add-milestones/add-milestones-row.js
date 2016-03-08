var _ = require('underscore');
var $ = require('jquery');

var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;

var ComponentFactory = require('../../client/services/component-factory');

function AddMilestonesRow($el) {
  EventEmitter.call(this);
  this.$el = $el;
}
inherits(AddMilestonesRow, EventEmitter);

AddMilestonesRow.prototype.init = function() {

  if (this._init) { return; }
  this._init = true;

  this.data = JSON.parse(this.$el.find('script.data').remove().html());

  this.textBoxComponent = ComponentFactory.getComponent(this.$el.find('[data-component="text-box"]'));
  this.badgeComponent = ComponentFactory.getComponent(this.$el.find('[data-component="milestone-badge"]'));

  this.$dropdownToggle = this.$el.find('.dropdown-toggle');
  this.$dropdownMenu = this.$el.find('.dropdown-menu');
  this.$dropdownLabel = this.$el.find('.dropdown-label');

  this.$removeButton = this.$el.find('.remove-button');
  $(document).ready(_.bind(function() {
    this.$removeButton.tooltip();
  }, this));

  this.$removeButton.on('click', _.bind(this._remove, this));
  this.$el.on('click', _.bind(this._handleClick, this));
  this.$el.on('click', 'ul.dropdown-menu > li', _.bind(this._handleDropdownItemClick, this));
};

AddMilestonesRow.prototype._handleClick = function() {
  if (this.$el.hasClass('add')) {
    this.$el.removeClass('add');
    this.textBoxComponent.focus();
  }
};

AddMilestonesRow.prototype._remove = function() {
  this.$el.remove();
  this.emit('remove', this);
};

AddMilestonesRow.prototype.setTimesCompleted = function(num) {
  this.data.timesCompleted = num;
  this.badgeComponent.setTimesCompleted(num);
};

AddMilestonesRow.prototype.getTimesCompleted = function() {
  return this.data.timesCompleted;
};

AddMilestonesRow.prototype._handleDropdownItemClick = function(e) {
  var $prevSelected = this.$dropdownMenu.find('.selected');

  if ($prevSelected.get(0) === e.target) { return; }

  var $target = $(e.target);
  $prevSelected.removeClass('selected');
  $target.addClass('selected');

  var value = $target.attr('value');
  this.$dropdownToggle.find('.text').html(value);

  if (parseInt(value, 10) === 1) {
    this.$dropdownLabel.html('time');
  } else {
    this.$dropdownLabel.html('times');
  }
};

AddMilestonesRow.prototype.setTimesRemaining = function(num) {
  this.data.timesRemaining = num;
  this.$dropdownMenu.find('[value="' + (this.data.timesCompleted + this.data.timesRemaining) + '"]').click();
};

AddMilestonesRow.prototype.getTimesRemaining = function() {
  return this.data.timesRemaining;
};

module.exports = AddMilestonesRow;
