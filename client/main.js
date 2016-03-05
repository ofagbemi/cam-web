var factory = require('./services/component-factory');

factory.registerComponent('text-box', require('../components/text-box/text-box'));
factory.registerComponent('create-mission-card', require('../components/create-mission-card/create-mission-card'));
factory.registerComponent('progress-bar', require('../components/progress-bar/progress-bar'));

//factory.registerComponent('dashboard', require('../views/dashboard/dashboard'));
//factory.registerComponent('mission-card', require('../components/mission-card/mission-card'));
//factory.registerComponent('create', require('../components/create/create'));
//factory.registerComponent('activity-chart', require('../components/activity-chart/activity-chart'));

factory.hydrate(document.documentElement);


window.jQuery = require('jquery');
