var express = require('express');
var router = express.Router();
var Station = require('mongoose').model('Station');
var request = require("request");
var async = require("async");
var moment = require("moment");



router.get('/', async function (req, res) {

    await deleteDB()
    var url = 'http://api.citybik.es/bicing.json';
    let stations = await getDataFromBicingApi(url)
    var iterations = 25;
    console.log('Generating ' + 25 + ' fake requests')
    for (let i = 0; i < iterations; ++i) {
        let dummyStations = await generateBicingDummyData(stations, 1)
        await addDataToDB(dummyStations)
        if (i == iterations - 1) {
            res.json({ success: true, msg: 'Stations added' })
            console.log(iterations + ' fake requests save in DB')
        }
    }
});


var deleteDB = async function () {
    return new Promise(async function (res) {
        await Station.deleteMany(function () {
            console.log('DB deleted')
            res();
        });
    })
}

var getDataFromBicingApi = function (url) {
    return new Promise(async function (res) {
        await request(url, function (error, response, body) {
            if (error) console.log(error)
            else {
                var stations = JSON.parse(body);
                console.log('Data from bicing API adquired')
                res(stations)
            }
        });
    })
}

var generateBicingDummyData = async function (stations, iteration) {

    return new Promise(function (res) {
        async.each(
            stations,
            async function (station) {
                var fecha = await moment(station.timestamp).add(iteration, 'hours');
                station.timestamp = fecha;
            },
            function (err) {
                if (err) console.log(err)
                res(stations);
            }
        )
    })
}


var addDataToDB = async function (stations) {
    return new Promise(function (res) {
        async.each(
            stations,
            async function (station) {
                let exists = await existsStation(station.id)
                if (!exists) {
                    await createStation(station)
                    await addTime(station)
                }
                else {
                    await addTime(station)
                }
            },
            function (err) {
                if (err) console.log(err)
                res();
            }
        )
    })
}

var existsStation = function (id) {
    return new Promise(async function (res) {
        await Station.findOne({ id: id }, function (err, station) {
            if (station != null) res(true);
            else res(false);
        });
    })

}
var createStation = function (station) {
    return new Promise(async function (res) {
        var loc = { "type": "Point", "coordinates": [station.lat * 0.000001, station.lng * 0.000001], "name": station.name }
        var stationObj = {
            id: station.id,
            name: station.name,
            number: station.number,
            loc: loc,
            times: []
        }
        var new_station = new Station(stationObj);
        await new_station.save(function (err, data) {
            if (err) {
                console.log(err);
                res();
            } else {
                res();
            }
        })
    });
}

var addTime = function (station) {
    return new Promise(async function (res) {
        var totalBikes = (station.bikes + station.free)
        var randomFreeBikes = Math.floor(Math.random() * totalBikes);
        var time = { time: moment(station.timestamp), free: randomFreeBikes, bikes: totalBikes - randomFreeBikes };
        await Station.findOneAndUpdate({ id: station.id }, { $push: { times: time } }, function (err, s) {
            if (err) {
                console.log(err);
                res();
            }
            else {
                res();
            }
        });
    })

}

module.exports = router;