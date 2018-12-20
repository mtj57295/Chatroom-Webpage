/*
  Client-side:
*/
var socket;
var name;
var socket = io.connect('http://localhost:3000');

function showAllUsers() {
  var ul = document.getElementById('listOfUsers');
  socket.emit('getAllUsers');
  socket.on('getAllUsers', function(users) {
    for(r in users) {
      if(!contains(ul, users[r])) {
        var node = document.createElement('LI');
        node.setAttribute('class', 'list-group-item');
        node.setAttribute('id', users[r]);
        node.appendChild(document.createTextNode(users[r]));
        ul.appendChild(node);
      }
    }
  });
}

function closingPage() {
  socket.emit('deleteActiveUser', name);
  socket.on('deleteActiveUser', function(username) {
    console.log(username);
    var ul = document.getElementById('listOfUsers');
    ul.removeChild(document.getElementById(username));
  });
  location.href = "index.html";
}

function contains(node, element) {
  for(var i = 0; i < node.childNodes.length; i++)
    if(node.childNodes[i].innerHTML == element)
      return true;
  return false;
}

socket.on('sending', function(message) {
  var chatRoom = document.getElementById('chatRoom');
  var node = document.createElement('DIV');
  node.setAttribute('style', 'margin-bottom:10px;');
  node.appendChild(document.createTextNode(message));
  chatRoom.appendChild(node);
});

function sendMessage() {
  var textMessage = document.getElementById('message').value;
  socket.emit('sending', name + ": " + textMessage);
}

function validation() {
  var alert = document.getElementById('alert');
  var user = document.getElementById('username').value;
  var password = document.getElementById('pwd').value;
  socket.emit('userExist', user, password);
  socket.on('userExist', function(status) {
    if(status) {
      document.getElementById('alert').setAttribute('style', 'visibility: hidden;');
      name = user;
      location.href = "ChatRoom.html";
    }
    else {
      document.getElementById('alert').setAttribute('style', 'visibility: visible;');
    }
  });
}
