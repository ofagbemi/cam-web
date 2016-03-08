var _ = require('underscore');
var $ = require('jquery');

var ComponentFactory = require('../../client/services/component-factory');
var TemplateRenderer = require('../../client/services/template-renderer');
var addMilestonesRowTemplate = require('./add-milestones-row.hbs');

function AddMilestones($el) {
  this.$el = $el;
}

AddMilestones.prototype.init = function() {

  this.$activeRows = this.$el.find('.active > .active-rows');

  this.activeMilestoneRows = [];
  this.$el.find('[data-component="add-milestones-row"]').each(_.bind(function(index, el) {
    var component = ComponentFactory.getComponent($(el));
    this.activeMilestoneRows.push(component);
    this._bindRowComponentListeners(component);
  }, this));

};

AddMilestones.prototype._bindRowComponentListeners = function(rowComponent) {
  rowComponent.textBoxComponent.on('keyup', _.bind(this._handleKeyup, this));
  rowComponent.on('remove', _.bind(this._handleRemove, this));
};

AddMilestones.prototype._handleKeyup = function(e, textBoxComponent) {
  // hitting enter should jump down to the "Add new milestone row" and trigger
  // its click event if there isn't an "Add new milestone" row, then we should
  //  just ignore the keypress
  if (e.keyCode === 13) {
    var lastRow = _.last(this.activeMilestoneRows);
    if (!lastRow.$el.hasClass('add')) { return; }

    lastRow.$el.click();
    return;
  }

  // if this is the last row, then typing in it should
  // add a new "Add new milestone" row
  if (textBoxComponent === _.last(this.activeMilestoneRows).textBoxComponent) {
    this._addNewMilestoneComponent();
  }
};

AddMilestones.prototype._handleRemove = function(component) {
  var index = this.activeMilestoneRows.indexOf(component);
  if (index > -1) {
    this.activeMilestoneRows.splice(index, 1);
  }

  // if there are no rows remaining, go ahead and
  // add a new addMilestone row
  if (this.activeMilestoneRows.length === 0) {
    this._addNewMilestoneComponent();
  }
};

AddMilestones.prototype._addNewMilestoneComponent = function() {
  var $addMilestone = TemplateRenderer.renderTemplate('add-milestones/add-milestones-row', {
    placeholder: 'Add a milestone'
  }).addClass('hide');

  // flex reversed to fix dropdown menu positioning
  this.$activeRows.prepend($addMilestone);
  setTimeout(function() {
    $addMilestone.removeClass('hide');
  });

  var rowComponent = ComponentFactory.getComponent($addMilestone);
  this.activeMilestoneRows.push(rowComponent);
  this._bindRowComponentListeners(rowComponent);
};

AddMilestones.prototype.clear = function() {
  this.activeMilestoneRows = [];
  this.$activeRows.empty();
  this._addNewMilestoneComponent();
};

module.exports = AddMilestones;
