# Chatty App

A real-time chat app that allow you to connect with multiple users. Single page web app built with ReactJS that will allow users to communicate with each other without having to register accounts.

The client-side app communicates with a server via WebSockets for multi-user real-time updates (No persistent database is involved; the focus is on the client-side experience).

## Screenshots

## How to run Chatty

- Install dependencies with : `npm i`

- Start the server in chatty_server directory with : `npm start`

- Start the chatty app in the main directory with : `npm start`

- Find the chatty at http://localhost:3000 in your browser
- Enjoy!

## Behaviour

- When any connected user sends a chat message, all connected users receive and display the message.

- When any connected user changes their name, all connected users are notified of the name change.

- Notifications are styled differently from chat messages.

- Header will display the count of connected users
  When the number of connected users changes, this count will be updated for all connected users.

- Different users' names will each be coloured differently, the colouring is consistent between connected user instances.

### Dependencies

- react
- react-dom
- babel-core
- babel-loader
- css-loader
- node-sass
- sass-loader
- sockjs-client
- style-loader
- webpack
- webpack-dev-server
