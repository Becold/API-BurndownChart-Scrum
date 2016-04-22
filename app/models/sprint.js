var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SprintSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },

    finishAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Sprint', SprintSchema);