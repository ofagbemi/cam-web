function TextBox($el) {
  this.$el = $el;
}

TextBox.prototype.init = function() {
  this.$input = this.$el.find('input[type="text"]');
};

TextBox.prototype.focus = function() {
  this.$input.focus();
};

module.exports = TextBox;
