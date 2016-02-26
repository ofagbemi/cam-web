var _ = require('underscore');
var ComponentFactory = require('../../client/services/component-factory');

function Dashboard($el) {
  this.$el = $el;
}

Dashboard.prototype.init = function() {

  // set up goals pending review
  this.$reviewGoalsContainer = this.$el.find('#review-goals');
  this.$reviewGoals = this.$reviewGoalsContainer.find('[data-component="goal"]');
  this.reviewGoalComponents = [];
  this.$reviewGoals.each(_.bind(function(i, el) {
    var goal = ComponentFactory.getComponent(el);
    goal.on('hide', _.bind(this.onReviewGoalHide, this));
    this.reviewGoalComponents.push(goal);
  }, this));

  // set up goals still
};

Dashboard.prototype.onReviewGoalHide = function() {
  if (!this.$reviewGoalsContainer.find('[data-component="goal"]:not(.hide)').length) {
    this.$reviewGoalsContainer.addClass('empty');
  }
};

module.exports = Dashboard;
