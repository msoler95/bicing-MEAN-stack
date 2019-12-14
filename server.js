var express = require('express');
var config = require('./config');
var bodyParser = require('body-parser');
var cors = require('cors');
var http = require('http');
var mongoose = require('mongoose');
var models = require('./models');

//DB
mongoose.connect('mongodb://0.0.0.0:27017/bicing');
models.initialize();

//Server
var app = express();
app.use(bodyParser.json());
app.use(cors());

//Server routes
var stationRouter = require('./routes/stationRoute');
var dummyRouter = require('./routes/dummyDBRoute');

app.use('/stations', stationRouter);
app.use('/createDummyDB', dummyRouter);

var port = config.serverPort;
var adress = config.serverUrl;
http.createServer(app).listen(port, adress, function () {
    console.log('Connected to: ' + adress + ':' + port)
});
