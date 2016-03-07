var TemplateRenderer = require('./services/template-renderer');
var ComponentFactory = require('./services/component-factory');

TemplateRenderer.registerTemplate('badge-menu/badge-menu', require('../components/badge-menu/badge-menu.hbs'));
TemplateRenderer.registerTemplate('badge/badge', require('../components/badge/badge.hbs'))
TemplateRenderer.registerTemplate('activity/activity', require('../components/activity/activity.hbs'));
TemplateRenderer.registerTemplate('text-box/text-box', require('../components/text-box/text-box.hbs'));
TemplateRenderer.registerTemplate('milestone-badge/milestone-badge', require('../components/milestone-badge/milestone-badge.hbs'));
TemplateRenderer.registerTemplate('add-milestones/add-milestones-row', require('../components/add-milestones/add-milestones-row.hbs'));

ComponentFactory.registerComponent('badge', require('../components/badge/badge'));
ComponentFactory.registerComponent('text-box', require('../components/text-box/text-box'));
ComponentFactory.registerComponent('mission-card', require('../components/mission-card/mission-card'));
ComponentFactory.registerComponent('progress-bar', require('../components/progress-bar/progress-bar'));

ComponentFactory.registerComponent('add-milestones', require('../components/add-milestones/add-milestones'));
ComponentFactory.registerComponent('add-milestones-row', require('../components/add-milestones/add-milestones-row'));

ComponentFactory.registerComponent('checkmark', require('../components/checkmark/checkmark'));
ComponentFactory.registerComponent('user-badge', require('../components/user-badge/user-badge'));

ComponentFactory.registerComponent('close', require('../components/close/close'));

ComponentFactory.registerComponent('nav', require('../components/nav/nav'));
ComponentFactory.registerComponent('settings-hamburger', require('../components/settings-hamburger/settings-hamburger'));

ComponentFactory.hydrate(document.documentElement);


window.jQuery = require('jquery');
