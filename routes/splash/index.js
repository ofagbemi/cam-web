var router = require('express').Router();

module.exports = router.get('/', function(req, res) {
  // assume successful login...
  res.redirect(301, '/dashboard');
});
