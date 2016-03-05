var $ = require('jquery');
var _ = require('underscore');

var ServerData = require('../../client/services/server-data');

function ProgressBar($el) {
  this.$el = $el;
  this.$track = this.$el.find('.track');
  this.mission = JSON.parse(this.$el.find('#mission-data').html());
}

ProgressBar.prototype.init = function() {
  var checkpoints = this.mission.checkpoints;

  var numCheckpointsCompleted = 0;
  var numCheckpoints = 0;
  var userTotals = {};
  _.each(checkpoints, function(checkpoint) {
    _.each(checkpoint.userIds, function(userId) {
      var ent = userTotals[userId];
      userTotals[userId] = ent ? ent + 1 : 1;
    });
    numCheckpoints += (checkpoint.timesCompleted + checkpoint.timesRemaining);
  });

  _.each(userTotals, _.bind(function(value, key) {
    this.$track.append($('<div>').addClass('inner').css({
      width: (value * 100 / numCheckpoints) + '%',
      backgroundColor: ServerData.getFamilyMemberWithId(key).color
    }));
  }, this));

};

module.exports = ProgressBar;
