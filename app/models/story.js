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
    }]
});

StorySchema.statics = {
    getPopulateFields: function() {
        return 'historyPoints';
    }
};

module.exports = mongoose.model('Story', StorySchema);