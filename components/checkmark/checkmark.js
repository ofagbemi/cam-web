function Checkmark($el) {
  this.$el = $el;
}

Checkmark.prototype.init = function() {
  if (this._init) { return; }
  this._init = true;
};

Checkmark.prototype.check = function() {
  this.$el.addClass('checked');
};

Checkmark.prototype.uncheck = function() {
  this.$el.removeClass('checked');
};

Checkmark.prototype.toggle = function() {
  this.$el.toggleClass('checked');
};

module.exports = Checkmark;
