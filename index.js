'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
var sql = require('mssql');
var webconfig = {
server: '192.168.10.77', 
//server: 'VINOD-LAPTOP',
//database: 'salesData',
user: 'sa',
password: 'Q3tech123',
//user: 'Q3TECH\visingh',
//password: 'plmokn@123',
	options: {
		port: 1433,
		database: 'salesData',
		instancename: 'MSSQLSERVER'
	}
}


const server = express();
server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());

server.post('/get-sales-details', function (req, res) {
	sql.close();
	var connection = new sql.connect("Data Source=192.168.1.4,1433;User Id=sa;Password=Q3tech123;Initial Catalog=salesData;Integrated Security=True", function(err) {
	   if(err)      // ... error checks 
        console.log('Database connection error --- 1');
var request = new sql.Request(connection); 
let query1 = "select distinct Amount  from dbo.sheet1 where Month=1 AND SellerName='AMS Party-LC' AND Year=2017;";
request.query(query1, function(err1, recordset) {
   if(err)      // ... error checks 
        console.log('Database connection error');
	else
    console.dir("User Data: "+recordset[0].Amount);
});
});

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
