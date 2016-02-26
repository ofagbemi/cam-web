var _ = require('underscore');

function Create($el) {
  this.$el = $el;
}

Create.prototype.init = function() {
  if (this._init) { return; }
  this._init = true;

  this.$openButton = this.$el.find('.open-button');

  this.$form = this.$el.find('.form');
  this.$createButton = this.$form.find('.create-button');
  this.$cancelButton = this.$form.find('.cancel-button');

  this.$openButton.on('click', _.bind(this.open, this));
  this.$createButton.on('click', _.bind(this.create, this));
  this.$cancelButton.on('click', _.bind(this.cancel, this));
};

Create.prototype.open = function() {
  this.$openButton.attr('disabled', 'disabled');
  this.$form.removeClass('hide');
};

Create.prototype.close = function() {
  this.$openButton.removeAttr('disabled');
  this.$form.addClass('hide');
};

Create.prototype.create = function() {
  this.close();
  this.clearForm();
};


Create.prototype.cancel = function() {
  this.close();
  this.clearForm();
};

Create.prototype.clearForm = function() {
  this.$form.find('input[type="text"]').val('');
  this.$form.find('input[type="number"]').val(1);
};

module.exports = Create;
