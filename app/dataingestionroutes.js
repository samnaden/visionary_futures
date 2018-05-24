var Cookie = require('./models/cookie');
var Soda = require('./models/soda');
var DatePriceWeatherLoc = require('./models/datepriceweatherloc');

module.exports = function (app) {

    /*
    COOKIE RELATED HANDLERS
    */

    //load the cookie collection
    app.post('/api/dataingestion/cookies/loadcollection', function (req, res) {
        console.log("in load cookie collection endpoint");

        'use strict';
        const fs = require('fs');

        var rawdata = fs.readFileSync('data/cookiecollection.json');
        var cookierecords = JSON.parse(rawdata).records;

        for (var i = 0; i < cookierecords.length; i++) {
            persistCookie(cookierecords[i].flavor, cookierecords[i].tastiness, res);
        }
        res.send({status:'successfully loaded cookie collection into mongo'});
    });

    //wipe the cookie collection
    app.delete('/api/dataingestion/cookies/wipecollection', function (req, res) {
        deleteCookies(res);
    });

    function persistCookie(flavor, tastiness, res) {
        Cookie.create({
            flavor: flavor,
            tastiness: tastiness
        }, function (err, cookie) {
            if (err){
                res.send(err);
            }
        });
    }

    function deleteCookies(res){
        Cookie.remove({}, function (err) {
            if (err){
                res.send(err);
            }
        });
        res.send({status:'successfully wiped cookie collection'});
    }

    /*
    SODA RELATED HANDLERS
    */

    //load the soda collection
    app.post('/api/dataingestion/sodas/loadcollection', function (req, res) {
        console.log("in load soda collection endpoint");

        'use strict';
        const fs = require('fs');

        var rawdata = fs.readFileSync('data/sodacollection.json');
        var sodarecords = JSON.parse(rawdata).records;

        for (var i = 0; i < sodarecords.length; i++) {
            persistSoda(sodarecords[i].brand, res);
        }
        res.send({status:'successfully loaded soda collection into mongo'});
    });

    //wipe the soda collection
    app.delete('/api/dataingestion/sodas/wipecollection', function (req, res) {
        deleteSodas(res);
    });

    function persistSoda(brand, res) {
        Soda.create({
            brand: brand
        }, function (err, soda) {
            if (err){
                res.send(err);
            }
        });
    }

    function deleteSodas(res){
        Soda.remove({}, function (err) {
            if (err){
                res.send(err);
            }
        });
        res.send({status:'successfully wiped soda collection'});
    }

    /*
    DATEPRICEWEATHERLOC RELATED HANDLERS
    */

    //load the datepriceweatherloc collection
    app.post('/api/dataingestion/datepriceweatherloc/loadcollection', function (req, res) {
        console.log("in load datepriceweatherloc collection endpoint");

        'use strict';
        const fs = require('fs');

        var rawdata = fs.readFileSync('data/datepriceweatherloccollection.json');
        var records = JSON.parse(rawdata).records;

        //todo: consider using a bulk insert here as described in NMM chapter 6
        for (var i = 0; i < records.length; i++) {
            persistDatePriceWeatherLoc(records[i], res);
        }
        res.send({status:'successfully loaded datepriceweatherloc collection into mongo'});
    });

    //wipe the datepriceweatherloc collection
    app.delete('/api/dataingestion/datepriceweatherloc/wipecollection', function (req, res) {
        deleteDatePriceWeatherLocs(res);
    });

    function persistDatePriceWeatherLoc(record, res) {
        var formattedDate;
        if(record.Date){
            var dateString = record.Date;
            var dateArray = dateString.split("-");
            //dateArray now contains [year, month, day]
            formattedDate = new Date(dateArray[0], dateArray[1], dateArray[2]);
        }

        //remember the data model for this collection is in datepriceweatherloc.js
        DatePriceWeatherLoc.create({
            Date: formattedDate,
            US_gas_pump_price: record.US_gas_pump_price,
            Midwest_gas_pump_price: record.Midwest_gas_pump_price,
            Gulf_coast_gas_pump_price: record.Gulf_coast_gas_pump_price,
            Settle: record.Settle,
            Volume: record.Volume,
            Miami_PRCP: record.USW00012839_PRCP,
            Miami_TMIN: record.USW00012839_TMIN,
            Miami_TMAX: record.USW00012839_TMAX,
            Freeport_PRCP: record.USC00413340_PRCP,
            Freeport_TMIN: record.USC00413340_TMIN,
            Freeport_TMAX: record.USC00413340_TMAX,
            NewOrleans_PRCP: record.USW00012916_PRCP,
            NewOrleans_TMIN: record.USW00012916_TMIN,
            NewOrleans_TMAX: record.USW00012916_TMAX,
            Chicago_PRCP: record.USW00094846_PRCP,
            Chicago_TMIN: record.USW00094846_TMIN,
            Chicago_TMAX: record.USW00094846_TMAX
        }, function (err, datepriceweatherloc) {
            if (err){
                res.send(err);
            }
        });
    }

    function deleteDatePriceWeatherLocs(res){
        DatePriceWeatherLoc.remove({}, function (err) {
            if (err){
                res.send(err);
            }
        });
        res.send({status:'successfully wiped DatePriceWeatherLoc collection'});
    }

};