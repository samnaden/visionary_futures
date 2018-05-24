var mongoose = require('mongoose');

module.exports = mongoose.model('Soda', {
    brand: {
        type: String,
        default: ''
    },
    birthDate: {
    	type: Date,
    	default: Date.now
    }
});