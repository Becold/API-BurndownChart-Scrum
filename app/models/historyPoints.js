var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var historypointsSchema = new Schema({
    _story: {
        type: Schema.Types.ObjectId,
        ref: 'Story'
    },

    points: {
        type: Number,
        require: true
    },

    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('HistoryPoints', historypointsSchema);