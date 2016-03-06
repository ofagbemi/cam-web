var $ = require('jquery');
var _ = require('underscore');

var ServerData = require('../../client/services/server-data');

function ProgressBar($el) {
  this.$el = $el;
  this.$track = this.$el.find('.track');
  this.mission = JSON.parse(this.$el.find('#mission-data').html());
}

ProgressBar.prototype.init = function() {
  var milestones = this.mission.milestones;

  var numMilestonesCompleted = 0;
  var numMilestones = 0;
  var userTotals = {};
  _.each(milestones, function(milestone) {
    _.each(milestone.userIds, function(userId) {
      var ent = userTotals[userId];
      userTotals[userId] = ent ? ent + 1 : 1;
    });
    numMilestones += (milestone.timesCompleted + milestone.timesRemaining);
  });

  var bars = [];
  _.each(userTotals, function(value, key) {
    var familyMember = ServerData.getFamilyMemberWithId(key);
    var $barEl = $('<div>').addClass('inner')
      .css({
        width: (value * 100 / numMilestones) + '%',
        backgroundColor: familyMember.color
      }).attr({
        "data-toggle": "tooltip",
        "data-placement": "bottom",
        "data-title": familyMember.name
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
