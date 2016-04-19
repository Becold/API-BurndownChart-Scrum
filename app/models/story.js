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

    currentPoint: Number, // Todo: Checker la doc s'il n'existe pas un type similaire à Int.

    createdAt: {
        type: Date,
        default: Date.now
    },

    finishAt: {
        type: Date,
        default: Date.now
    }
});

StorySchema.statics = {
    getPopulateFields: function() {
        return '_sprint';
    }
};

module.exports = mongoose.model('Story', StorySchema);