import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import Navbar from "./navbar.jsx";
import { generateRandomId } from "./rid.jsx";

export default class App extends Component {
  // Set initial state
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:
    this.state = {
      currentUser: "defaultCurrent",
      previousUser: "defaultPrevious",
      userCount: 0,
      messages: []
    };
  }

  addNewMsg = (msg, usr) => {
    let newState = this.state;

    let newMsg = {
      type: "postMessage",
      content: msg,
      username: usr,
      id: generateRandomId()
    };

    //sending new msg to the server
    this.webSocket.send(JSON.stringify(newMsg));

    //user name change
    if (newState.currentUser !== usr) {
      console.log("31: ", newState);

      newState.previousUser = newState.currentUser;
      newState.currentUser = usr;

      this.setState(newState);

      let newUserNotification = {
        type: "postNotification",
        username: usr,
        previousUser: newState.previousUser
      };
      console.log("44: ", newState);
      console.log("45:", newUserNotification);
      //sending new notification to the server
      this.webSocket.send(JSON.stringify(newUserNotification));
    }
  };

  componentDidMount() {
    console.log("componentDidMount <App />");

    //Connecting to the webSocket
    this.webSocket = new WebSocket("ws://localhost:3001");
    this.webSocket.onopen = event => {
      console.log("connected to the websocket server");
    };

    this.webSocket.onopen = event => {
      console.log("Connected to server");
    };

    //Display incoming message from server on the client
    this.webSocket.onmessage = e => {
      // The socket event data is encoded as a JSON string.
      // This line turns it into an object
      const newMsgFromWs = JSON.parse(e.data);

      switch (newMsgFromWs.type) {
        case "incomingMessage":
          // handle incoming message
          this.setState({ messages: [...this.state.messages, newMsgFromWs] });
          break;
        case "incomingNotification":
          // handle incoming notification
          this.setState({ messages: [...this.state.messages, newMsgFromWs] });
          break;

        case "usrCount":
          // handle incoming notification
          this.setState({ userCount: newMsgFromWs.usrCount });
          break;

        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + newMsgFromWs.type);
      }
    };

    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {
    //     id: 33,
    //     username: "Michelle",
    //     content: "Hello there!"
    //   };

    //   const messages = this.state.messages.concat(newMessage);
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({ messages: messages });
    // }, 3000);
  }

  render() {
    return (
      <div>
        <Navbar userCount={this.state.userCount} />
        <MessageList
          messages={this.state.messages}
          pu={this.state.previousUser}
        />
        <div className="chatbar">
          <span className="chatbar-message">
            {<ChatBar addNewMsg={this.addNewMsg} />}
          </span>
        </div>
      </div>
    );
  }
}
