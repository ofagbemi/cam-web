var $ = require('jquery');
var _ = require('underscore');

var data = {};
try {
  data = JSON.parse($('#server-data').remove().html());
} catch (e) {
  console.log(e);
}

function ServerData(d) {
  this.data = d;
  var familyMembers = {};
  _.each(this.data.familyMembers, function(familyMember) {
    familyMembers[familyMember.id] = familyMember;
  });
  this.familyMembers = familyMembers;
}

ServerData.prototype.getFamilyMemberWithId = function(id) {
  return this.familyMembers[id];
};

module.exports = new ServerData(data);
