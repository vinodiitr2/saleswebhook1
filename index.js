'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
var sql = require('mssql');
var webconfig = {
user: 'sa',
password: 'Q3tech123',
server: '192.168.1.4', 
database: 'dbo',
options: {
    encrypt: false // Use this if you're on Windows Azure 
}
}
var connection = new sql.Connection(webconfig, function(err) {
var request = new sql.Request(connection); 
request.query('select * from Sheet1', function(err, recordset) {
   if(err)      // ... error checks 
        console.log('Database connection error');
    console.log("User Data: "+recordset);
});
});
const server = express();
server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());

server.post('/get-sales-details', function (req, res) {

    let salesDetails = req.body.result && req.body.result.parameters && req.body.result.parameters.salesCategory ? req.body.result.parameters.salesCategory : 'The Godfather';
    let reqUrl = encodeURI('http://openstates.org/api/v1/bills/?q=' + salesDetails);
    http.get(reqUrl, (responseFromAPI) => {

        responseFromAPI.on('data', function (chunk) {
            //let movie = JSON.parse(chunk)['data'];
            console.log("No data------------------------*************");
            let dataToSend = 'I don\'t have the required info on that. Here\'s some info on';
            dataToSend += 'The Sales info';
            console.log("No data  1-------------------------*************" + dataToSend);
            var array = ["who","are","you"];
           
            return res.json({
                speech: dataToSend,
                displayText: dataToSend,
                //source: 'get-sales-details'
            });

        });
    }, (error) => {
        return res.json({
            speech: 'Something went wrong!',
            displayText: 'Something went wrong!',
            //source: 'get-sales-details'
        });
    });
});

server.listen((process.env.PORT || 8000), function () {
    console.log("Server is up and running...");
});
