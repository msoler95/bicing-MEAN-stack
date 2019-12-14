var express = require('express');
var router = express.Router();
var Station = require('mongoose').model('Station');
var request = require("request");
var async = require("async");
var moment = require("moment");

router.get('/', async function (req, res) {

    let stations = [];

    //Filter by station
    if (req.query.id) stations = await getOneStation(req.query.id);
    else stations = await getAllStations();

    //Filter by time
    var timeFrom = "2019-12-15T13:49:23.546Z";
    var timeTo = "2019-12-15T15:49:23.546Z"
    if (req.query.timeFrom) stations = await filterByTimeFrom(timeFrom, stations)
    if (req.query.timeEnd) stations = await filterByTimeTo(timeTo, stations)

    console.log('ending')
    res.status(200).json(stations);

});

var getOneStation = function (id) {
    return new Promise(function (res) {
        Station.find({ id: id }, function (err, station) {
            if (err) console.log(err)
            else res(station)
        })
    })
}

var getAllStations = function () {
    return new Promise(function (res) {
        Station.find({}, function (err, stations) {
            if (err) console.log(err)
            else res(stations)
        })
    })
}

var filterByTimeFrom = function (timeFrom, stations) {


    return new Promise(async function (res) {
        var indexToStart = -1;
        if (stations.length != 0) indexToStart = await getStartPosition(stations[0], timeFrom) //Finds the first element before the time setted
        if (indexToStart != -1) {
            for (var i = 0; (i < stations.length); ++i) //For each station, delete the data before the time setted 
                stations[i].times.splice(0, indexToStart)
        }
        res(stations)
    })
}

var getStartPosition = function (station, timeFrom) {
    return new Promise(function (res) {
        var found = -1;
        for (var i = 0; (i < station.times.length) && (found == -1); ++i) {
            if (moment(station.times[i].time).isAfter(timeFrom))
                found = i;
        }
        res(found)
    })
}

var filterByTimeTo = function (timeFrom, stations) {


    return new Promise(async function (res) {
        var indexToStart = -1;
        var stationsLength = -1;
        if (stations.length != 0) {
            stationsLength = stations[0].times.length;
            indexToStart = await getEndPosition(stations[0], timeFrom) //Finds the first element before the time setted
        }
        console.log(indexToStart)
        if (indexToStart != -1) {
            for (var i = 0; (i < stations.length); ++i) //For each station, delete the data before the time setted 
                stations[i].times.splice(indexToStart, stationsLength - indexToStart)
        }
        res(stations)
    })
}

var getEndPosition = function (station, timeFrom) {
    return new Promise(function (res) {
        var found = -1;
        for (var i = 0; (i < station.times.length) && (found == -1); ++i) {
            if (moment(station.times[i].time).isAfter(timeFrom))
                found = i;
        }
        res(found)
    })
}

module.exports = router;


