import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import { generateRandomId } from "./rid.jsx";

export default class App extends Component {
  // Set initial state
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:
    this.state = {
      currentUser: { name: "Dushantha" },
      messages: []
    };
  }

  addNewMsg = (msg, usr) => {
    let newMsg = {
      type: "incomingMessage",
      content: msg,
      username: usr,
      id: generateRandomId()
    };

    this.webSocket.send(JSON.stringify(newMsg));
    // this.setState({ messages: [...this.state.messages, newMsg] });
  };

  componentDidMount() {
    //Connecting to the webSocket
    this.webSocket = new WebSocket("ws://localhost:3001");
    this.webSocket.onopen = event => {
      console.log("connected to the websocket server");
      // this.socket.send('newMessages');
    };

    //Display incoming message from server on the client
    this.webSocket.onmessage = e => {
      const newMsgFromWs = JSON.parse(e.data);
      //console.log(newMsgFromWs);
      this.setState({ messages: [...this.state.messages, newMsgFromWs] });
    };

    console.log("componentDidMount <App />");
    // this.setState({ webSocket: new WebSocket("ws://localhost:3001") });

    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {
        id: 33,
        username: "Michelle",
        content: "Hello there!"
      };
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages });
    }, 3000);
  }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <div className="chatbar">
          <span className="chatbar-message">
            {<ChatBar addNewMsg={this.addNewMsg} />}
          </span>
        </div>
      </div>
    );
  }
}
