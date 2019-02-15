// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuidv4 = require('uuid/v4');
const userCount = {};

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({
  server
});


// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    console.log("client.readyState ", client.readyState);
    console.log("open: ", WebSocket.OPEN)
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
      //console.log(data)
    }
  });
};



// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.


wss.on('connection', (ws) => {
  console.log('Client connected');

  //user count Broadcast on connect
  usersConnected = {
    type: 'usrCount',
    usrCount: wss.clients.size
  }
  console.log(usersConnected)
  wss.broadcast(JSON.stringify(usersConnected));

  ws.on('message', function incoming(message) {
    var obj = JSON.parse(message)
    console.log(obj.username + '   said: ', obj.content);
    if (obj.type == "postMessage") {
      const id = uuidv4();
      obj.id = id;
      obj.type = "incomingMessage";
    } else {
      obj.type = "incomingNotification";
    }
    wss.broadcast(JSON.stringify(obj));
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')

    //user count Broadcast on disconnect
    usersConnected = {
      type: 'usrCount',
      usrCount: wss.clients.size
    }
    wss.broadcast(JSON.stringify(usersConnected));
  });
});