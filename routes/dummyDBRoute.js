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
    var iterations = 2;
    for (let i = 0; i < iterations; ++i) {
        console.log('iteracion ' + i + ': generateBicingDummyData empezamos')
        let dummyStations = await generateBicingDummyData(stations, i)
        console.log('iteracion ' + i + ': addDataToDB empezamos')
        await addDataToDB(dummyStations)
        console.log('iteracion ' + i + ': addDataToDB acabamos')
        if (i == iterations - 1) res.json({ success: true, msg: 'Stations added' })
    }
});

var prueba = async function (i, callback) {
    await setTimeout(async () => {
        console.log('iteracion ' + i + ': prueba finalizada')
        callback();
    }, 300);

}


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
                var fecha = await moment(station.timestamp).subtract(iteration, 'h');
                station.timestamp = fecha;
            },
            function (err) {
                if (err) console.log(err)
                console.log('iteracion ' + iteration + ': generateBicingDummyData finalizado')
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
            bikes: station.bikes,
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
        var time = { time: moment(station.timestamp), free: station.free };
        await Station.findOneAndUpdate({ id: station.id }, { $push: { times: time } }, function (err, s) {
            if (err) {
                console.log(err);
                res();
            }
            else {
                if (station.id == 1) console.log('Added to DB: ' + moment(station.timestamp).format())
                res();
            }
        });
    })

}

module.exports = router;