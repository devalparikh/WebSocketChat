var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

users = [];
connections = [];

// Hosting client-side html on localhost:3000
server.listen(process.env.PORT || 3000);
console.log('Server running....')

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
