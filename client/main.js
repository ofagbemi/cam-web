var TemplateRenderer = require('./services/template-renderer');
var ComponentFactory = require('./services/component-factory');

TemplateRenderer.registerTemplate('text-box/text-box', require('../components/text-box/text-box.hbs'));
TemplateRenderer.registerTemplate('milestone-badge/milestone-badge', require('../components/milestone-badge/milestone-badge.hbs'));
TemplateRenderer.registerTemplate('add-milestones/add-milestones-row', require('../components/add-milestones/add-milestones-row.hbs'));

ComponentFactory.registerComponent('text-box', require('../components/text-box/text-box'));
ComponentFactory.registerComponent('create-mission-card', require('../components/create-mission-card/create-mission-card'));
ComponentFactory.registerComponent('progress-bar', require('../components/progress-bar/progress-bar'));

ComponentFactory.registerComponent('add-milestones', require('../components/add-milestones/add-milestones'));
ComponentFactory.registerComponent('add-milestones-row', require('../components/add-milestones/add-milestones-row'));

//ComponentFactory.registerComponent('dashboard', require('../views/dashboard/dashboard'));
//ComponentFactory.registerComponent('mission-card', require('../components/mission-card/mission-card'));
//ComponentFactory.registerComponent('create', require('../components/create/create'));
//ComponentFactory.registerComponent('activity-chart', require('../components/activity-chart/activity-chart'));

ComponentFactory.hydrate(document.documentElement);


window.jQuery = require('jquery');
