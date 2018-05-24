var mongoose = require('mongoose');

//IF YOU MODIFY THIS SCHEMA, make sure to also update entityList variable in dataanalyzecontroller.js.
//The strings in entityList need to match the attributes defined below.
module.exports = mongoose.model('DatePriceWeatherLoc', {
    Date: {
        type: Date
    },
    US_gas_pump_price: {
    	type: Number
    },
    Midwest_gas_pump_price: {
    	type: Number
    },
    Gulf_coast_gas_pump_price: {
    	type: Number
    },
    Settle: {
    	type: Number
    },
    Volume: {
    	type: Number
    },
    Miami_PRCP: {
    	type: Number
    },
    Miami_TMIN: {
    	type: Number
    },
    Miami_TMAX: {
    	type: Number
    },
    Freeport_PRCP: {
    	type: Number
    },
    Freeport_TMIN: {
    	type: Number
    },
    Freeport_TMAX: {
    	type: Number
    },
    NewOrleans_PRCP: {
    	type: Number
    },
    NewOrleans_TMIN: {
    	type: Number
    },
    NewOrleans_TMAX: {
    	type: Number
    },
    Chicago_PRCP: {
    	type: Number
    },
    Chicago_TMIN: {
    	type: Number
    },
    Chicago_TMAX: {
    	type: Number
    }
});