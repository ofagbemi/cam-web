var _ = require('underscore');
var $ = require('jquery');

function UserBadge($el) {
  this.$el = $el;
}

UserBadge.prototype.init = function() {
  if (this._init) { return; }
  this._init = true;


  $(document).ready(_.bind(function() {
    this.$el.tooltip();
  }, this));
}


module.exports = UserBadge;
