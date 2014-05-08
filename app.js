var express = require('express');
var http = require('http');
//var fs = require('fs');
//var https = require('https');
//var privatekey = fs.readFileSync('sslcert/server.key','utf8');
//var certificate = fs.readFileSync('sslcert/server.crt','utf8');

//var credentials = {key: privateKey, cert: certificate };
var https = require('https');
var fs = require('fs');
//var crypto = require('crypto');
var options = {
  key: fs.readFileSync(__dirname + '/ssl/key.pem'),
  cert: fs.readFileSync(__dirname + '/ssl/key-cert.pem')
};
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
var users = require('./routes/user');

var app = express();
https.createServer(options, app).listen(443);
//app.all(/,*/,function(req,res,next){

  /// var host = req.header("host");
   //if(host.match(/ˆwww\..*/i)){
     /*next();
   }else{
     res.redirect(301, "http://www."+host);
   }
});
*/
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.get('/', routes.index);
app.get('/users', users.list);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
