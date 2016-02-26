var _ = require('underscore');
var ComponentFactory = require('../../client/services/component-factory');

function Dashboard($el) {
  this.$el = $el;
}

Dashboard.prototype.init = function() {
  this.$goalsContainer = this.$el.find('#unfinished-goals');
  this.$goals = this.$goalsContainer.find('[data-component="goal"]');
  this.goalComponents = [];
  this.$goals.each(_.bind(function(i, el) {
    var goal = ComponentFactory.getComponent(el);
    goal.on('hide', _.bind(this.onGoalHide, this));
    this.goalComponents.push(goal);
  }, this));
};

Dashboard.prototype.onGoalHide = function() {
  if (!this.$goalsContainer.find('[data-component="goal"]:not(.hide)').length) {
    this.$goalsContainer.addClass('empty');
  }
};

module.exports = Dashboard;
