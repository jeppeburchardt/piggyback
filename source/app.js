var express = require('express');
var path = require('path');
var logger = require('morgan');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var socketServer = require('./server')(io);

app.use(logger('dev'));

switch (app.get('env')) {
	
	case 'production':
		app.use(express.static(path.join(__dirname, '../', 'public_build')));
		app.use(defaultTo404);
		app.use(printErrorStatus);
		break;

	case 'development':
		app.use('/bower_components', express.static(path.join(__dirname, '../', 'bower_components')));
		app.use(express.static(path.join(__dirname, '../', 'public_source')));
		app.use(defaultTo404);
		app.use(printErrorStackTrade);
		break;
}


function defaultTo404(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
}

function printErrorStackTrade(err, req, res, next) {
	res.status(err.status || 500);
	res.send(err.stack);
}

function printErrorStatus(err, req, res, next) {
	res.status(err.status || 500);
	res.send(err.message + ' (' + res.statusCode + ')');
}

module.exports = {
	app: app,
	server: server,
}
