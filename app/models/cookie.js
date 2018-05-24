var mongoose = require('mongoose');

module.exports = mongoose.model('Cookie', {
    flavor: {
        type: String,
        default: ''
    },
    tastiness: {
    	type: Number,
    	default: 0
    }
});