var _ = require('underscore');
var $ = require('jquery');

var TemplateRenderer = require('../../client/services/template-renderer');
var ComponentFactory = require('../../client/services/component-factory');

function Lightbox() {
  this.$el = TemplateRenderer.renderTemplate('lightbox/lightbox');
  this.$content = this.$el.find('.content');

  $(document).ready(_.bind(function() {
    var $close = this.$el.find('[data-component="close"]');
    this.closeComponent = ComponentFactory.getComponent($close);
    this.closeComponent.on('close', _.bind(function() {
      this.hide();
    } , this));
  }, this));
  $('body').append(this.$el);
}

Lightbox.prototype.show = function(el, callback) {
  this.$showEl = $(el);
  this.$content.empty().append(this.$showEl);
  this.$el.addClass('show');

  setTimeout(_.bind(function() {
    callback = callback || _.noop;
    callback();
    setTimeout(_.bind(function() {
      this.$content.addClass('show');
    }, this));
  }, this), 600);
};

Lightbox.prototype.hide = function(callback) {

  this.$el.removeClass('show');
  this.$content.removeClass('show');


  setTimeout(function() {
    callback = callback || _.noop;
    callback();
  }, 400);
};

module.exports = new Lightbox();
