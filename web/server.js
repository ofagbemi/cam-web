var express = require('express');
var exphbs = require('express-handlebars');

var http = require('http');

var app = express();


var hbs = exphbs.create({
  handlebars: require('handlebars'),
  layoutsDir: './views/layouts',
  partialsDir: './components',
  defaultLayout: 'main',
  helpers: require('./shared/util/hbs-helpers'),
  extname: '.hbs'
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(express['static']('res'));
app.use(require('./routes'));

var port = Number(process.env.PORT || 4000);
var server = http.createServer(app).listen(port, function() {
    var addr = server.address();
    console.log('Listeing at port %d', addr.port);
});
