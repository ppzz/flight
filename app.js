var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var async = require('async');
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var fs = require('fs');


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    console.log(req.protocol, req.hostname, req.path);
    next();
});


async.series(
    [
        // 中间件:swagger
        function (callback) {
            try {
                var fsStreamV1 = fs.readFileSync('./swagger/v1/swagger.yaml', 'utf8');
                var ymlStream = jsyaml.safeLoad(fsStreamV1);
            } catch (err) {
                return callback(err);
            }
            
            // 构造swagger中间件:
            swaggerTools.initializeMiddleware(ymlStream, function (middleware) {

                // 给请求加上metadata等数据
                app.use(middleware.swaggerMetadata());

                // 有效性检查
                app.use(middleware.swaggerValidator());

                var options = {
                    controllers: './swagger/v1'
                };

                // 加载路由中间件
                app.use(middleware.swaggerRouter(options));

                callback(null);
            });
        }
    ],
    function (err, result) {
        if (err) {
            return console.log(err);
        }

        app.use('/', routes);
        app.use('/users', users);

        app.use(function (req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });

        if (app.get('env') === 'development') {
            app.use(function (err, req, res, next) {
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: err
                });
            });
        }

        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: {}
            });
        });
    }
);


module.exports = app;
