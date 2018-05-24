var Cookie = require('./models/cookie');
var Soda = require('./models/soda');
var DatePriceWeatherLoc = require('./models/datepriceweatherloc');

module.exports = function (app) {

    app.post('/api/dataanalyze/dimensions', function (req, res) {
        var dim1 = req.body.dimensions[0];
    	var dim2 = req.body.dimensions[1];
    	//we need documents where both dimensions are not null so we can plot them
    	var query = DatePriceWeatherLoc.find({}).
    	where(dim1).ne(null).
    	where(dim2).ne(null);
    	query.select(dim1 + ' ' + dim2);
    	var promise = query.exec();
    	promise.then(function (datepriceweatherlocs) {
    		var dataPoints = [];
    		//put the retrieved data into an array of points for easier plotting in UI
			for (var i = 0; i < datepriceweatherlocs.length; i++) {
        		var xVal = eval("datepriceweatherlocs[i]." + dim1);
        		var yVal = eval("datepriceweatherlocs[i]." + dim2);
        		dataPoints[i] = [xVal, yVal];
    		}
    		var data = {};
    		data.dataPoints = dataPoints;
    		res.send(data);
    	});
    });

    app.post('/api/dataanalyze/summarystats', function (req, res) {
    	var feature = req.body.feature;
		var summarystats = {};
		//first get the average which excludes nulls
		DatePriceWeatherLoc.aggregate([
		{
            $group: {
                _id: null,
                avg: { $avg: "$" + feature} 
            }
        }], function (err, result) {
        	summarystats.avg = result[0].avg;
        	//now get all the data for this feature and manually find num nulls and min/max.
        	//mongoose/mongodb has tools to do this but I couldn't figure out the dynamic code generation because
        	//we are passing in the attribute of interest as a string
        	var query = DatePriceWeatherLoc.find({});
	        query.select(feature);
	        var promise = query.exec();
	        promise.then(function (datepriceweatherlocs) {
	        	var vals = [];
	        	var valIter = 0;
	        	var numNulls = 0;
				for (var i = 0; i < datepriceweatherlocs.length; i++) {
					var stringToEval = "datepriceweatherlocs[i]." + feature;
            		var currVal = eval(stringToEval);
            		if(currVal != null){
            			vals[valIter] = currVal;
            			valIter++;
            		} else{
            			numNulls++;
            		}
        		}

        		summarystats.numNulls = numNulls;
        		var valsSorted = vals.sort(function(a, b){return a - b});
        		summarystats.min = valsSorted[0];
        		summarystats.max = valsSorted[valsSorted.length - 1];

        		res.send(summarystats);
	        });
    	});
    });

};