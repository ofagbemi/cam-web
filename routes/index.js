var _ = require('underscore');
var fs = require('fs');

var express = require('express');
var router = express.Router();

var ACTION_REDIRECTS = {
  'splash': ''
};

function getPath(action, method) {
  if (ACTION_REDIRECTS.hasOwnProperty(action)) {
    action = ACTION_REDIRECTS[action];
  }
  if (!action && action !== '') {
    return new RegExp('^\\/?$', 'i');
  } else {
    return method ? '/' + action + '/' + method :
                    '/' + action;
  }
}

var actions = fs.readdirSync(__dirname);
_(actions).each(function(action) {
  var dir = __dirname + '/' + action;
  var stat = fs.statSync(dir);
  if(!stat.isDirectory()) { return; }

  var methods = fs.readdirSync(dir);
  if (_.indexOf(methods, 'index.js') > -1) {
    var actionHandler = require('./' + action);
    var path = getPath(action);
    router.use(path, actionHandler);
  }

  _(methods).each(function(method) {

    if (method === 'index.js') { return; }
    if (method[0] === '.' || method[0] === '_') {
      return; // skip dot and _ files
    }
    if (method.indexOf('.js') === -1) { return; }

    var methodStat = fs.statSync(dir + '/' + method);
    if(!methodStat.isFile()) { return; }
    method = method.replace('.js', '');

    var methodHandler = require('./' + action + '/' + method);
    router.use(getPath(action, method), methodHandler);
  });
});

module.exports = router;
