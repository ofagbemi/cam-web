var _ = require('underscore');
var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;

function GoalCard($el) {
  this.$el = $el;
  this.type = $el.attr('data-type');

  EventEmitter.call(this);
}
inherits(GoalCard, EventEmitter);

GoalCard.prototype.init = function() {
  if (this._init) { return; }
  this._init = true;

  // TODO consider subclassing these behaviors
  if (this.type === 'review') {
    this.$completeButton = this.$el.find('.complete-button');
    this.$completeButton.on('click', _.bind(this.markAsComplete, this));

    this.$redoButton = this.$el.find('.redo-button');
    this.$redoButton.on('click', _.bind(this.askToRedo, this));
  } else if (this.type === 'active') {
    this.$remindButton = this.$el.find('.remind-button');
    this.$remindButton.on('click', _.bind(this.remind, this));

    this.$cancelButton = this.$el.find('.cancel-button');
    this.$cancelButton.on('click', _.bind(this.cancel, this));
  }
};

GoalCard.prototype.markAsComplete = function() {
  this.$el.addClass('hide');
  this.emit('complete');
  this.emit('hide');
};

GoalCard.prototype.askToRedo = function() {
  this.$el.addClass('hide');
  this.emit('redo');
  this.emit('hide');
};

GoalCard.prototype.remind = function() {
  this.$remindButton.attr('disabled', 'disabled');
  this.emit('remind');
};

GoalCard.prototype.cancel = function() {
  this.$el.addClass('hide');
  this.emit('cancel');
  this.emit('hide');
};

module.exports = GoalCard;
