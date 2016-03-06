var fs = require('fs');
var path = require('path');
var browserify = require('browserify');
var hbsfy = require('hbsfy');

var IN_PATH = path.join(__dirname, '../client/main.js');
var OUT_PATH = path.join(__dirname, '../res/js/main.js');

var stream = fs.createWriteStream(OUT_PATH)
    .on('error', function(err) {
        console.error(err);
    })
    .on('close', function() {
        console.log('Wrote js to %s', OUT_PATH);
    });

browserify([IN_PATH], {
  transform: [hbsfy]
}).bundle()
.pipe(stream);
