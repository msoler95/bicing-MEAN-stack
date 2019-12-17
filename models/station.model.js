var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {

    var stationSchema = new Schema({

        id: { type: Number, required: true },
        name: { type: String, required: true },
        number: { type: Number, required: true },
        loc: { type: { type: String }, coordinates: [Number], name: String },
        times: [{ time: Date, free: Number, bikes: Number }]
    });
    stationSchema.index({ loc: '2dsphere' });
    mongoose.model('Station', stationSchema);
};