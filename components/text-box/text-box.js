var _ = require('underscore');
var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;

function TextBox($el) {
  EventEmitter.call(this);
  this.$el = $el;
}
inherits(TextBox, EventEmitter);

TextBox.prototype.init = function() {
  this.$input = this.$el.find('input[type="text"]');

  this.$input.on('keyup', _.bind(this._emitKeyup, this));
};

TextBox.prototype.focus = function() {
  this.$input.focus();
};

TextBox.prototype._emitKeyup = function(e) {
  this.emit('keyup', e, this);
};

TextBox.prototype.clear = function() {
  this.$input.val('');
}

module.exports = TextBox;
