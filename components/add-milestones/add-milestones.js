var _ = require('underscore');
var $ = require('jquery');

var ComponentFactory = require('../../client/services/component-factory');
var TemplateRenderer = require('../../client/services/template-renderer');
var addMilestonesRowTemplate = require('./add-milestones-row.hbs');

function AddMilestones($el) {
  this.$el = $el;
}

AddMilestones.prototype.init = function() {

  this.$rows = this.$el.find('.rows');

  this.milestoneRows = [];
  this.$el.find('[data-component="add-milestones-row"]').each(_.bind(function(index, el) {
    var component = ComponentFactory.getComponent($(el));
    this.milestoneRows.push(component);
    this._bindRowComponentListeners(component)
  }, this));

};

AddMilestones.prototype._bindRowComponentListeners = function(rowComponent) {
  rowComponent.textBoxComponent.on('keyup', _.bind(this._handleKeyup, this));
  rowComponent.on('remove', this._handleRemove);
};

AddMilestones.prototype._handleKeyup = function(e, textBoxComponent) {
  // if this is the last row, then typing in it should
  // add a new "Add new milestone" row

  console.log(_.last(this.milestoneRows).$el);

  if (textBoxComponent === _.last(this.milestoneRows).textBoxComponent) {
    var $addMilestone = $(TemplateRenderer.renderTemplate('add-milestones/add-milestones-row', {
      placeholder: 'Add a milestone'
    })).addClass('hide');

    this.$rows.append($addMilestone);
    setTimeout(function() {
      $addMilestone.removeClass('hide');
    });

    var rowComponent = ComponentFactory.getComponent($addMilestone);
    this.milestoneRows.push(rowComponent);
    this._bindRowComponentListeners(rowComponent);
  }
};

AddMilestones.prototype._handleRemove = function(component) {
  var index = this.milestoneRows.indexOf(component);
  if (index > -1) {
    this.milestoneRows.splice(index, 1);
  }
};

module.exports = AddMilestones;
