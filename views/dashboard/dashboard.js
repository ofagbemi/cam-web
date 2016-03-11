var _ = require('underscore');
var $ = require('jquery');

var ComponentFactory = require('../../client/services/component-factory');

function Dashboard($el) {
  this.$el = $el;
}

Dashboard.prototype.init = function() {

  $(document).ready(_.bind(function() {
    this.navComponent = ComponentFactory.getComponent($('[data-component="nav"]'));
  }, this));

  this.$buttonGroup = this.$el.find('> [data-component="button-group"]');
  this.$activeMissionsButton = this.$el.find('button.active-missions');
  this.$completedMissionsButton = this.$el.find('button.completed-missions');

  this.$activeMissionsButton.on('click', _.bind(this._handleActiveClick, this));
  this.$completedMissionsButton.on('click', _.bind(this._handleCompletedClick, this));


  this.$missionCardsWrapper = this.$el.find('section.active-missions > .mission-cards');
  this.$activeMissionsWrapper = this.$el.find('section.active-missions #active-missions');


  this.$missionCards = this.$el.find('[data-component="mission-card"]');
  this.$missionCards.each(_.bind(function(index, el) {
    this._bindCreateListeners($(el));
  }, this));

  $(document).ready(_.bind(function() {
    setTimeout(_.bind(function() {
      this.$el.removeClass('loading');
    }, this), 4000);
  }, this));
};

Dashboard.prototype._bindCreateListeners = function($createEl) {
  var card = ComponentFactory.getComponent($createEl);
  card.on('save-create', _.bind(this._handleSaveCreate, this));
};

Dashboard.prototype._handleSaveCreate = function($newCreateEl, cardComponent) {
  this.$missionCardsWrapper.prepend($newCreateEl);
  this.$activeMissionsWrapper.prepend(cardComponent.$el);
  this._bindCreateListeners($newCreateEl);
};

Dashboard.prototype._handleCompletedClick = function() {
  var $activeButton = this.$buttonGroup.find('.active');
  if ($activeButton.get(0) === this.$completedMissionsButton.get(0)) { return; }

  this.navComponent.activateAgent();

  $activeButton.removeClass('active');
  this.$completedMissionsButton.addClass('active');
  this.$el
    .removeClass('active-missions')
    .addClass('completed-missions');
};

Dashboard.prototype._handleActiveClick = function() {
  var $activeButton = this.$buttonGroup.find('.active');
  if ($activeButton.get(0) === this.$activeMissionsButton.get(0)) { return; }

  this.navComponent.deactivateAgent();

  $activeButton.removeClass('active');
  this.$activeMissionsButton.addClass('active');
  this.$el
    .removeClass('completed-missions')
    .addClass('active-missions');
};

module.exports = Dashboard;
