var $ = require('jquery');
var Handlebars = require('hbsfy/runtime');

var ComponentFactory = require('./component-factory');

function TemplateRenderer() {
  this._templates = {};
}

TemplateRenderer.prototype.renderTemplate = function(name, data) {

  var template = this._templates[name];
  if (!template) {
    throw new Error(name + ' template hasn\'t been registered');
  }

  var html = template(data);
  var $nodes = $(html);
  $nodes.each(function() {
    ComponentFactory.hydrate(this);
  });
  return $nodes.get();
};

TemplateRenderer.prototype.registerTemplate = function(name, template) {
  this._templates[name] = template;
  Handlebars.registerPartial(name, template);
};

module.exports = new TemplateRenderer();
