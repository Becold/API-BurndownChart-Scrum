var _ = require('lodash');

module.exports = {
    jsonError: function(res, text, err) {
        res.status(400);

        if(_.isUndefined(err))
            return res.json({success: false, message: text});
        else
            return res.json({success: false, message: text, error: err});
    }
}