var _ = require('underscore');
var $ = require('jquery');

var ComponentFactory = require('../../client/services/component-factory');

function UserBadge($el) {
  this.$el = $el;
}

UserBadge.prototype.init = function() {
  if (this._init) { return; }
  this._init = true;

  this.checkmarkComponent = ComponentFactory.getComponent(this.$el.find('[data-component="checkmark"]'));

  this.$el.on('click', _.bind(this._handleClick, this));

  if (this.$el.get(0).hasAttribute('data-toggle')) {
    $(document).ready(_.bind(function() {
      this.$el.tooltip();
    }, this));
  }
};

UserBadge.prototype.select = function() {
  if (!this.$el.hasClass('selected')) {
    this.checkmarkComponent.check();
    this.$el.addClass('selected');
  }
};

UserBadge.prototype.deselect = function() {
  if (this.$el.hasClass('selected')) {
    this.checkmarkComponent.uncheck();
    this.$el.removeClass('selected');
  }
};

UserBadge.prototype._handleClick = function() {
  if (!this.$el.get(0).hasAttribute('data-selectable')) { return; }

  if (this.$el.hasClass('selected')) {
    this.deselect();
  } else {
    this.select();
  }
};


module.exports = UserBadge;
