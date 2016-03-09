var $ = require('jquery');
var _ = require('underscore');

var ServerData = require('../../client/services/server-data');

function ProgressBar($el) {
  this.$el = $el;
  this.$track = this.$el.find('.track');
  this.data = JSON.parse(this.$el.find('script.data').remove().html());
}

ProgressBar.prototype.init = function() {

  if (!this.data.milestones) { return; }

  var activeMilestones = this.data.milestones.active;
  var completedMilestones = this.data.milestones.completed;

  var numMilestoneSteps = 0;
  var userTotals = {};
  _.each(completedMilestones.concat(activeMilestones), function(m) {
    _.each(m.userIds, function(userId) {
      var ent = userTotals[userId];
      userTotals[userId] = ent ? ent + 1 : 1;
    });
    numMilestoneSteps += (m.timesCompleted + m.timesRemaining);
  });

  var bars = [];
  _.each(userTotals, function(value, key) {
    var familyMember = ServerData.getFamilyMemberWithId(key);
    var $barEl = $('<div>').addClass('inner')
      .css({
        width: (value * 100 / numMilestoneSteps) + '%',
        backgroundColor: familyMember.color
      }).attr({
        "data-toggle": "tooltip",
        "data-placement": "bottom",
        "data-title": 'Agent ' + familyMember.name
      });
    bars.push($barEl)
  });

  // iterate through array of elements so that we can use the index
  // to set the first and last classes
  _.each(bars, _.bind(function($b, index) {
    this.$track.append($b);
    if (index === 0) { $b.addClass('first'); }
    if (index === bars.length - 1) { $b.addClass('last'); }
    $(document).ready(function() {
      $b.tooltip();
    });
  }, this));
};

module.exports = ProgressBar;
