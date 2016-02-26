var router = require('express').Router();

var dummyData = require('../../server/dummy/dashboard.json');

module.exports = router.get('/', function(req, res) {
    res.render('dashboard/dashboard', dummyData);
});
