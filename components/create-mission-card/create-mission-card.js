var _ = require('underscore');
var $ = require('jquery');

var ComponentFactory = require('../../client/services/component-factory');

function CreateMissionCard($el) {
  this.$el = $el;
}

CreateMissionCard.prototype.init = function() {
  this.titleComponent = ComponentFactory.getComponent(this.$el.find('[data-component="text-box"].title'));

  $('html').on('click', _.bind(this._handleHtmlClick, this));
  this.$el.on('click', _.bind(this._handleClick, this));
};

CreateMissionCard.prototype._handleClick = function() {
  if (this.$el.hasClass('active')) { return; }

  this.$el.addClass('active');
  this.titleComponent.focus();
};

CreateMissionCard.prototype._handleHtmlClick = function(e) {
  var root = this.$el.get(0);
  if (root !== e.target && !$.contains(root, e.target)) {
    this.blur();
  }
};

CreateMissionCard.prototype.blur = function() {
  this.$el.removeClass('active');
};

module.exports = CreateMissionCard;
