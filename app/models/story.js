var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StorySchema = new Schema({
    _sprint: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Sprint'
    },

    name: {
        type: String,
        require: true,
        trim: true
    },

    historyPoints: [{
        type: Schema.Types.ObjectId,
        ref: 'HistoryPoints'
    }],

    createdAt: {
        type: Date,
        default: Date.now
    },

    finishAt: {
        type: Date,
        default: Date.now
    }
});

/* StorySchema.statics = {
    getPopulateFields: function() {
        return '_sprint historyPoints';
    }
}; */

module.exports = mongoose.model('Story', StorySchema);