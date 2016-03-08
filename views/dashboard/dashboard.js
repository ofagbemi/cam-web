var _ = require('underscore');
var $ = require('jquery');

function Dashboard($el) {
  this.$el = $el;
}

Dashboard.prototype.init = function() {

  this.$buttonGroup = this.$el.find('> [data-component="button-group"]');
  this.$activeMissionsButton = this.$el.find('button.active-missions');
  this.$completedMissionsButton = this.$el.find('button.completed-missions');

  this.$activeMissionsButton.on('click', _.bind(this._handleActiveClick, this));
  this.$completedMissionsButton.on('click', _.bind(this._handleCompletedClick, this));

  $(document).ready(_.bind(function() {
    setTimeout(_.bind(function() {
      this.$el.removeClass('loading');
    }, this), 4000);
  }, this));
};

Dashboard.prototype._handleCompletedClick = function() {
  var $activeButton = this.$buttonGroup.find('.active');
  if ($activeButton.get(0) === this.$completedMissionsButton.get(0)) { return; }

  $activeButton.removeClass('active');
  this.$completedMissionsButton.addClass('active');
  this.$el
    .removeClass('active-missions')
    .addClass('completed-missions');
};

Dashboard.prototype._handleActiveClick = function() {
  var $activeButton = this.$buttonGroup.find('.active');
  if ($activeButton.get(0) === this.$activeMissionsButton.get(0)) { return; }

  $activeButton.removeClass('active');
  this.$activeMissionsButton.addClass('active');
  this.$el
    .removeClass('completed-missions')
    .addClass('active-missions');
};

module.exports = Dashboard;
