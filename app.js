/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

var http = require("http").Server(app);
var io = require("socket.io")(http);

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
http.listen(appEnv.port, '0.0.0.0', function() {
    // print a message when the server starts listening
    console.log("server starting on " + appEnv.url);
});

io.on("connection", function(socket) {

    socket.on("control", function(data) {
        //check target
        switch (data.target) {
            case 'light':
            case 'camera':
            case 'motor':
            case 'sensor':
                io.sockets.emit('node-control', data);
                break;
            default:
                io.sockets.emit('message', 'not this target' + data.target);
                break;
        }
    });

    socket.on("status", function(data) {
        //check target
        switch (data.source) {
            case 'light':
                io.sockets.emit('data', data);
                break;
            case 'camera':
                io.sockets.emit('data', data);
                break;
            case 'motor':
                io.sockets.emit('data', data);
                break;
            case 'sensor':
                io.sockets.emit('data', data);
                break;
            default:
                io.sockets.emit('message', 'not this source' + data.source);
                break;
        }
    });
});