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

// Emmit events go here
io.sockets.on('connection', function(socket){
  // Connect
  // Array of connections being pushed to socket
  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length)

  // Disconnect
  socket.on('disconnect', function(data){
    users.splice(users.indexOf(socket.username), 1);
    updateUsernames();
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s sockets connected', connections.length);
  });

  // Send message
  socket.on('send message', function(data){
    // console.log(data)
    io.sockets.emit('new message', {msg: data});
  });

  // New user
  socket.on('new user', function(data, callback){
    callback(true);
    socket.username = data;
    users.push(socket.username);
    updateUsernames();
  });
  function updateUsernames(){
    io.sockets.emit('get users', users);
  }
});
