var _ = require('underscore');
var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;

function Goal($el) {
  this.$el = $el;
  EventEmitter.call(this);
}
inherits(Goal, EventEmitter);

Goal.prototype.init = function() {
  if (this._init) { return; }
  this._init = true;

  this.$completeButton = this.$el.find('.complete-button');
  this.$completeButton.on('click', _.bind(this.markAsComplete, this));

  this.$redoButton = this.$el.find('.redo-button');
  this.$redoButton.on('click', _.bind(this.askToRedo, this));
};

Goal.prototype.markAsComplete = function() {
  this.$el.addClass('hide');
  this.emit('complete');
  this.emit('hide');
};

Goal.prototype.askToRedo = function() {
  this.$el.addClass('hide');
  this.emit('redo');
  this.emit('hide');
};

module.exports = Goal;
