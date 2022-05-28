var express = require('express');
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');
//var logger = require('morgan');
var routes = require('./API/Config/Routes');
var statusCodeMap = require('./API/Config/StatusCodeMap');
var tokenization = require('./custom_modules/tokenization');
var app = express();
var cors= require('cors')
var logger = require('./custom_modules/logger');
//app.use(logger('dev'));

app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(cors({
//   origin: [
//     'http://localhost:3001',
//   ],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }))
app.use(cors());
var apiRoutes = Object.keys(routes);


app.post("/registeruser",async function (req, res, next) {
  // res.header('Access-Control-Allow-Origin', '*')
  // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

  

  try {
    logger.logInfo("/registeruser");
    let message = {}
    var api = require('./API/BusinessLogic/PostUser');
    api.input(req, message);
    await api.process(message);
      let response = {
        responseBody: {},
      };
      api.output(response, message);
      res.status(statusCodeMap[response.status] ? statusCodeMap[response.status] : 500)
      res.send(response.responseBody);
  }
  catch (ex) {
    logger.logInfo(ex);
    res.status(500);
    res.send({
      errorMessage: "Internal Server Error Occured."
    });
  }
  //next()
});


app.post("/api/user/login",async function (req, res, next) {
  // res.header('Access-Control-Allow-Origin', '*')
  // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

  

  try {
    logger.logInfo("/api/user/login");
    let message = {}
    var api = require('./API/BusinessLogic/logintoken');
    api.input(req, message);
    await api.process(message);
      let response = {
        responseBody: {},
      };
      api.output(response, message);
      res.status(statusCodeMap[response.status] ? statusCodeMap[response.status] : 500)
      res.send(response.responseBody);
  }
  catch (ex) {
    logger.logInfo(ex);
    res.status(500);
    res.send({
      errorMessage: "Internal Server Error Occured."
    });
  }
  //next()
});
app.post("/api/client/login", function (req, res, next) {
  try {
    logger.logInfo("/api/client/login");
    let message = {}
    var api = require('./API/BusinessLogic/loginclienttoken');
    api.input(req, message);
    api.process(message);
    let response = {
      responseBody: {},
    };
    api.output(response, message);
    res.status(statusCodeMap[response.status] ? statusCodeMap[response.status] : 500)
    res.send(response.responseBody);
  }
  catch (ex) {
    logger.logInfo(ex);
    res.status(500);
    res.send({
      errorMessage: "Internal Server Error Occured."
    });
  }
});

for (i = 0; i < apiRoutes.length; i++) {
  
  if (routes[apiRoutes[i]].allowedMethod.includes('GET')) {
    app.get(apiRoutes[i],async function (req, res, next) {

      logger.logInfo(req.route.path);
      var token = req.get('Authorization')
      var userId = tokenization.verifyLoginToken(token);
      if (userId) {
        let message = {}
        message.API_USER_ID = userId != 'client' ? userId : undefined;
        var api = require('./API/BusinessLogic/' + routes[req.route.path].controller);
        api.input(req, message);
        await api.process(message);
        let response = {
          responseBody: {},
        };
        api.output(response, message);
        res.status(statusCodeMap[response.status] ? statusCodeMap[response.status] : 500)
        res.send(response.responseBody);
      }
      else {
        res.status(401);

        res.send({
          errorMessage: "Invalid token provided."
        });
      }

    });
  }
 if (routes[apiRoutes[i]].allowedMethod.includes('POST')) {
    app.post(apiRoutes[i], async function (req, res, next) {
     
     
      try {
       
        logger.logInfo(req.route.path);
        var token = req.get('Authorization')
       
        var userId = tokenization.verifyLoginToken(token);
       
        if (userId) {
          let message = {}
          message.API_USER_ID = userId != 'client' ? userId : undefined;
  
          var api = require('./API/BusinessLogic/' + routes[req.route.path].controller);
          
          api.input(req, message);
          
         await  api.process(message);
         
          let response = {
            responseBody: {},
          };
          api.output(response, message);
          res.status(statusCodeMap[response.status] ? statusCodeMap[response.status] : 500)
          res.send(response.responseBody);
        }
        else {
          res.status(401);
          res.send({
            errorMessage: "Invalid token provided."
          });
        }
      }
      catch (ex) {
       console.log(ex)
        logger.logInfo(ex);
        res.status(500);
        res.send({
          errorMessage: "Internal Server Error Occured."
        });
      }
    });
  }
  if (routes[apiRoutes[i]].allowedMethod.includes('DELETE')) {
    app.delete(apiRoutes[i], async function (req, res, next) {
      try {
       
        logger.logInfo(req.route.path);
        var token = req.get('Authorization')
       
        var userId = tokenization.verifyLoginToken(token);
       
        if (userId) {
          let message = {}
          message.API_USER_ID = userId != 'client' ? userId : undefined;
  
          var api = require('./API/BusinessLogic/' + routes[req.route.path].controller);
          
          api.input(req, message);
          
         await  api.process(message);
         
          let response = {
            responseBody: {},
          };
          api.output(response, message);
          res.status(statusCodeMap[response.status] ? statusCodeMap[response.status] : 500)
         
          res.send(response.responseBody);
        }
        else {
          res.status(401);
          res.send({
            errorMessage: "Invalid token provided."
          });
        }
      }
      catch (ex) {
       console.log(ex);
        logger.logInfo(ex);
        res.status(500);
        res.send({
          errorMessage: "Internal Server Error Occured."
        });
      }


    });
  }
  if (routes[apiRoutes[i]].allowedMethod.includes('PUT')) {

    app.put(apiRoutes[i], function (req, res, next) {
      try {
        logger.logInfo(req.route.path);
        var token = req.get('Authorization')
        var userId = tokenization.verifyLoginToken(token);
        if (userId) {
          let message = {}
          message.API_USER_ID = userId != 'client' ? userId : undefined;
          var api = require('./API/BusinessLogic/' + routes[req.route.path].controller);
          api.input(req, message);
          api.process(message);
          let response = {
            responseBody: {},
          };
          api.output(response, message);
          res.status(statusCodeMap[response.status] ? statusCodeMap[response.status] : 500)
          res.send(response.responseBody);
        }
        else {
          res.status(401);
          res.send({
            errorMessage: "Invalid token provided."
          });
        }
      }
      catch (ex) {
        logger.logInfo(ex);
        res.status(500);
        res.send({
          errorMessage: "Internal Server Error Occured."
        });
      }
    });
  }
}

module.exports = app;
