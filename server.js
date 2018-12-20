var userList = [];
var mysql = require('mysql');
var express = require('express');
var app = express();
var server = app.listen(3000);
app.use(express.static('public'));
console.log("My Socket is running!");
var socket = require('socket.io');
var io = socket(server);

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'chatroom'
});

connection.connect(function(err) {
  if(err) throw err;
  console.log("Connected database");
});

/*
  calls function when new client connects
*/
io.sockets.on('connection', function (client) {
  //logs new connection and the client id
  console.log('new connection: ' + client.id);
  client.on('disconnect', function() {
    console.log(client.id + 'user disconnected');

  });

  client.on('deleteActiveUser', function(username) {
    userList.splice(userList.indexOf(username), 1);
    io.sockets.emit('deleteActiveUser', username);
  });

  client.on('sending', function(message) {
    io.sockets.emit('sending', message);
  });

  client.on('userExist', function(user, password) {
    var sqlString = 'SELECT * FROM users';
    connection.query(sqlString, function (err, result){
      for(r in result)
        if(user == result[r].username && password == result[r].password) {
          var userName = user;
          userList.push(user);
          return client.emit('userExist', true);
        }
        return client.emit('userExist', false);
    });
  });

  client.on('getAllUsers', function() {
      io.sockets.emit('getAllUsers', userList);
  });

});
