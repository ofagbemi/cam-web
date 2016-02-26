var factory = require('./services/component-factory');

factory.registerComponent('dashboard', require('../views/dashboard/dashboard'));

factory.registerComponent('goal', require('../components/goal/goal'));
factory.registerComponent('create', require('../components/create/create'));
factory.registerComponent('activity-chart', require('../components/activity-chart/activity-chart'));

factory.hydrate(document.documentElement);
