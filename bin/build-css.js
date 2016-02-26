var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var async = require('async');

var sass = require('node-sass');
var postcss = require('postcss');
var autoprefixer = require('autoprefixer');

var IN_PATH = path.join(__dirname, '../views/main.scss');
var OUT_PATH = path.join(__dirname, '../res/css/main.css');

function writeCss(css) {
    fs.writeFile(OUT_PATH, css, function(err) {
        if (err) { console.error(err); process.exit(1); }
        console.log('Wrote css to %s', OUT_PATH);
        process.exit();
    });
}

function handleWarnings(warnings, writeCallback) {
    _.each(warnings, function(warning) {
        console.warn(warning.toString());
    });

    process.stdout.write(
        'Ignore ' + warnings.length + ' warning' +
        (warnings.length === 1 ? '' : 's') + '? ');

    var char;
    async.until(
        function() {
            return char === 'y' || char === 'n';
        },
        function(callback) {
            process.stdin.once('data', function(val) {
                char = val.toString().charAt(0).toLowerCase();
                callback();
            });
        },
        function() {
            if (char !== 'y') { process.exit(1); }
            else { writeCallback(); }
        }
    );
}

sass.render({
    file: IN_PATH,
    outputStyle: 'compressed'
}, function(err, result) {
    if (err) { console.error(err.message); process.exit(1); }
    postcss([autoprefixer]).process(result.css).then(function(result) {
        var warnings = result.warnings();
        if (warnings.length) {
            handleWarnings(warnings, function() {
                writeCss(result.css);
            });
        } else { writeCss(result.css); }
    });
});
