var express = require('express');
var router = express.Router();
var Station = require('mongoose').model('Station');
var request = require("request");
var async = require("async");

router.get('/', function (req, res) {

    if (req.query.id) {
        Station.findOne({ id: req.query.id }, function (err, station) {
            if (err) {
                console.log(err)
                res.status(500).json({ msg: 'Something went wrong' });
            }
            else res.status(200).json(station);
        })
    }
    else {
        Station.find({}, function (err, stations) {
            if (err) {
                console.log(err)
                res.status(500).json({ msg: 'Something went wrong' });
            }
            else res.status(200).json(stations);
        })
    }
});


module.exports = router;

/* TODO:
- Mostrar varies stations
- Afegir les bicis a una hora d'una station
- Mostrar varies stations amb les seves hores */

