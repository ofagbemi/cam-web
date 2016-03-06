var $ = require('jquery');
var _ = require('underscore');

var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');

function Close($el) {
  EventEmitter.call(this);
  this.$el = $el;
}
inherits(Close, EventEmitter);

Close.prototype.init = function() {
  if(this._init) { return; }
  this._init = true;

  this.$el.on('click', _.bind(this._handleClick, this));
  $(document).ready(_.bind(function() {
    this.$el.tooltip();
  }, this));
};

Close.prototype._handleClick = function() {
  this.emit('close', this);
};

module.exports = Close;
