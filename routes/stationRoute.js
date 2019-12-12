var express = require('express');
var router = express.Router();
var Station = require('mongoose').model('Station');
var request = require("request");
var async = require("async");

router.get('/', function (req, res) {
    res.json({ success: true, msg: 'Aquí estan tus bikes' });
});

router.post('/createDummyDB', function (req, res) {

    var url = 'http://api.citybik.es/bicing.json';
    deleteDB(function () {
        getDataFromBicingApi(url, function (stations) {
            addDataToDB(stations, function () {
                res.json({ success: true, msg: 'Stations added' })
            })
        });
    })
});

var deleteDB = function (callback) {
    Station.deleteMany(function () {
        callback();
    });
}

var getDataFromBicingApi = function (url, callback) {
    request('http://api.citybik.es/bicing.json', function (error, response, body) {
        if (error) console.log(error)
        else {
            var stations = JSON.parse(body);
            callback(stations)
        }
    });
}

var addDataToDB = function (stations, callback) {
    async.each(
        stations,
        function (station, callbackAsync) {

            var loc = { "type": "Point", "coordinates": [station.lat * 0.000001, station.lng * 0.000001], "name": station.name }
            var stationObj = {
                id: station.id,
                name: station.name,
                number: station.number,
                loc: loc,
                times: []
            }
            stationObj.times.push({ time: new Date(station.timestamp), free: station.free });
            var new_station = new Station(stationObj);
            new_station.save(function (err, data) {
                if (err) {
                    console.log(err);
                    callbackAsync();
                } else {
                    console.log('Station number ' + station.number + ' added')
                    callbackAsync();
                }
            })
        },
        function (err) {
            callback();
        }
    )

}

module.exports = router;

/* TODO:
- Mostrar varies stations
- Afegir les bicis a una hora d'una station
- Mostrar varies stations amb les seves hores */

