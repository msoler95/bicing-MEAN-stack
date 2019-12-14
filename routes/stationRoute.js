var express = require('express');
var router = express.Router();
var Station = require('mongoose').model('Station');
var request = require("request");
var async = require("async");
var moment = require("moment");

router.get('/', async function (req, res) {

    let stations = [];


    //Filter by location
    if (req.query.loc) {
        var locArray = req.query.loc.split(',');
        stations = await getStationsByLocation(locArray)
    }
    //Filter by station
    else if (req.query.id) stations = await getOneStation(req.query.id);
    //Not filtering 
    else stations = await getAllStations();

    //Filter by time
    if (req.query.timeFrom) stations = await filterByTimeFrom(req.query.timeFrom, stations)
    if (req.query.timeEnd) stations = await filterByTimeTo(req.query.timeEnd, stations)

    console.log('ending')
    res.status(200).json(stations);

});

var getStationsByLocation = function (locArray) {
    return new Promise(function (res) {
        let location = {
            lat: Number(locArray[0]),
            lng: Number(locArray[1]),
            distance: Number(locArray[2])
        }
        console.log('entramos')
        var maxDistance = location.distance; //km
        maxDistance = maxDistance * 1000;
        Station.collection.geoNear(location.lat, location.lng, { "distanceMultiplier": 6371, spherical: true, maxDistance: maxDistance / 6370000 }, function (err, result) {
            if (err) console.log(err)
            else {
                var stationsLocated = []
                for (var i = 0; i < result.results.length; ++i) {
                    stationsLocated.push(result.results[i].obj)
                }
                res(stationsLocated)
            }
        });
    });
}

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
        if (stations.length != 0) indexToStart = await findStartTimePosition(stations[0], timeFrom) //Finds the first element before the time setted
        if (indexToStart != -1) {
            for (var i = 0; (i < stations.length); ++i) //For each station, delete the data before the time setted 
                stations[i].times.splice(0, indexToStart)
        }
        res(stations)
    })
}



var filterByTimeTo = function (timeFrom, stations) {


    return new Promise(async function (res) {
        var indexToStart = -1;
        var stationsLength = -1;
        if (stations.length != 0) {
            stationsLength = stations[0].times.length;
            indexToStart = await findStartTimePosition(stations[0], timeFrom) //Finds the first element before the time setted
        }
        if (indexToStart != -1) {
            for (var i = 0; (i < stations.length); ++i) //For each station, delete the data before the time setted 
                stations[i].times.splice(indexToStart, stationsLength - indexToStart)
        }
        res(stations)
    })
}

var findStartTimePosition = function (station, timeFrom) {
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


