var _ = require('underscore');
var ComponentFactory = require('../../client/services/component-factory');

function Dashboard($el) {
  this.$el = $el;
}

Dashboard.prototype.init = function() {

  // set up goals pending review
  this.$reviewGoalsContainer = this.$el.find('#review-goals');
  this.$reviewGoals = this.$reviewGoalsContainer.find('[data-component="goal-card"]');
  this.reviewGoalComponents = [];
  this.$reviewGoals.each(_.bind(function(i, el) {
    var goal = ComponentFactory.getComponent(el);
    goal.on('hide', _.bind(this.onReviewGoalHide, this));
    this.reviewGoalComponents.push(goal);
  }, this));

  // set up active goals
  this.$activeGoalsContainer = this.$el.find('#active-goals');
  this.$activeGoals = this.$activeGoalsContainer.find('[data-component="goal-card"]');
  this.activeGoalComponents = [];
  this.$activeGoals.each(_.bind(function(i, el) {
    var goal = ComponentFactory.getComponent(el);
    goal.on('hide', _.bind(this.onActiveGoalHide, this));
    this.activeGoalComponents.push(goal);
  }, this));
};

Dashboard.prototype.onReviewGoalHide = function() {
  if (!this.$reviewGoalsContainer.find('[data-component="goal-card"]:not(.hide)').length) {
    this.$reviewGoalsContainer.addClass('empty');
  }
};

Dashboard.prototype.onActiveGoalHide = function() {
  if (!this.$activeGoalsContainer.find('[data-component="goal-card"]:not(.hide)').length) {
    this.$activeGoalsContainer.addClass('empty');
  }
};

module.exports = Dashboard;
