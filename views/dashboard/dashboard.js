var _ = require('underscore');
var $ = require('jquery');

function Dashboard($el) {
  this.$el = $el;
}

Dashboard.prototype.init = function() {

  $(document).ready(_.bind(function() {

    setTimeout(_.bind(function() {
      this.$el.removeClass('loading');
    }, this), 4000);
  }, this));
};

module.exports = Dashboard;
