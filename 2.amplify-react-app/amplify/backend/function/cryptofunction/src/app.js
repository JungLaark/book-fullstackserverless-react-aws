/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/
//이게 람다함수인가여? 
var express = require('express')
var bodyParser = require('body-parser')
const axios = require('axios');
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/item', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/item', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/item', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/item', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

/****************************
* /Coin 경로 생성 *
****************************/

// app.get('/coins', (req, res) => {
//   const coins = [
//     {name: 'Bitcoin', symbol : 'BTC', price_usd : '10000'},
//     {name: 'Ethereum', symbol : 'ETH', price_usd : '400'},
//     {name: 'Litecoin', symbol : 'LTC', price_usd : '150'}
//   ];

//   res.json({
//     coins
//   })
// });

app.get('/coins', (req, res) => {
  //기본 url 정의 
  let apiUrl = `https://api.coinlore.com/api/tickers?start=0&limit=100`;

  //쿼리 스트링 매개변수가 있는 경우 기본 URL 수정 
  //이건 무슨 말이지요? 
  //apiGateway : event와 context 변수를 포함하는 속성
  if(req.apiGateway && req.apiGateway.event.queryStringParameters){
    
    const {start=0, limit=100} = req.apiGateway.event.queryStringParameters;
    
    apiUrl = `https://api.coinlore.com/api/tickers?start=${start}&limit=${limit}`;
  }

  axios.get(apiUrl)
        .then(response => {
          res.json({coins: response.data.data});
        }).catch(err => res.json({error: err}));
});


// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
