var factory = require('./services/component-factory');

factory.registerComponent('progress-bar', require('../components/progress-bar/progress-bar'));

//factory.registerComponent('dashboard', require('../views/dashboard/dashboard'));
//factory.registerComponent('mission-card', require('../components/mission-card/mission-card'));
//factory.registerComponent('create', require('../components/create/create'));
//factory.registerComponent('activity-chart', require('../components/activity-chart/activity-chart'));

factory.hydrate(document.documentElement);


window.jQuery = require('jquery');
