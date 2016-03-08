var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');

var ComponentFactory = require('../../client/services/component-factory');

function CompletedMilestonesRow($el) {
  EventEmitter.call(this);
  this.$el = $el;
}
inherits(CompletedMilestonesRow, EventEmitter);

CompletedMilestonesRow.prototype.init = function() {
  if (this._init) { return; }
  this._init = true;

  this.data = JSON.parse(this.$el.find('script.data').remove().html());
  this.$milestoneBadge = this.$el.find('[data-component="milestone-badge"]');
  this.milestoneBadgeComponent = ComponentFactory.getComponent(this.$milestoneBadge);
  this.milestoneBadgeComponent.on('show-gallery', _.bind(this._handleShowGallery, this));
};

CompletedMilestonesRow.prototype._handleShowGallery = function(galleryComponent) {
  galleryComponent.on('redo', _.bind(this._handleRedo, this));
};

CompletedMilestonesRow.prototype._handleRedo = function(imageUrl) {
  this.setTimesCompleted(this.getTimesCompleted() - 1)
  this.setTimesRemaining(this.getTimesRemaining() + 1)
  this.emit('redo', imageUrl, this);
};

CompletedMilestonesRow.prototype.getTimesCompleted = function() {
  return this.data.timesCompleted;
};

CompletedMilestonesRow.prototype.setTimesCompleted = function(num) {
  this.data.timesCompleted = num;
  this.milestoneBadgeComponent.setTimesCompleted(num);
};

CompletedMilestonesRow.prototype.getTimesRemaining = function() {
  return this.data.timesRemaining;
};

CompletedMilestonesRow.prototype.setTimesRemaining = function(num) {
  this.data.timesRemaining = num;
};

module.exports = CompletedMilestonesRow;
