var express = require('express');
var router = express.Router();
var Station = require('mongoose').model('Station');
var request = require("request");
var async = require("async");
var moment = require("moment");



router.get('/', async function (req, res) {
    var iterations = 4;
    for (let i = 0; i < iterations; ++i) {
        console.log(await busqueda1(i))
        console.log(await busqueda2(i))
        if (i == iterations - 1) res.json({ success: true, msg: 'Stations added' })

    }
    // var url = 'http://api.citybik.es/bicing.json';
    // deleteDB(async function () {
    //     getDataFromBicingApi(url, async function (stations) {
    //         console.log('Data from bicing API adquired')
    //         var iterations = 3;
    //         Array.from({ length: iterations }, async (x, i) => {
    //             await generateBicingDummyData(stations, i, async function (dummyStations) {
    //                 await addDataToDB(dummyStations, function () {
    //                     if (i == iterations - 1) res.json({ success: true, msg: 'Stations added' })
    //                 })
    //             })
    //         });
    //     });
    // })
});

var busqueda1 = function (i) {
    return new Promise(function (res) {
        setTimeout(() => {
            res('busqueda1: ' + i)
        }, 400);
    });
}

var busqueda2 = function (i, callback) {
    return new Promise(function (res) {
        setTimeout(() => {
            res('busqueda2: ' + i)
        }, 400);
    });
}

module.exports = router;