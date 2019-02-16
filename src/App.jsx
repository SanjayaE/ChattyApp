import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import Navbar from "./navbar.jsx";
import { generateRandomId } from "./rid.jsx";
const colors = [
  "#cdcad4",
  "#0451ce",
  "#03ce79",
  "#db6b02",
  "#7902db",
  "#6f5d12",
  "#4c4217",
  "#bc61ed",
  "#e050ca",
  "#DC143C",
  "#856514"
];
//Assign random color for each connected user
const colour = colors[Math.floor(Math.random() * colors.length)];

export default class App extends Component {
  // Set initial state for the APP
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "Anonymous",
      previousUser: "Dushantha",
      userCount: 0,
      userColor: colour,
      messages: []
    };
  }

  //main function to add new message
  addNewMsg = (msg, usr) => {
    let newState = this.state;

    let newMsg = {
      type: "postMessage",
      content: msg,
      username: usr,
      id: generateRandomId(),
      colour: this.state.userColor
    };

    //sending new msg to the server
    this.webSocket.send(JSON.stringify(newMsg));

    //user name change
    if (newState.currentUser !== usr) {
      newState.previousUser = newState.currentUser;
      newState.currentUser = usr;

      this.setState(newState);

      let newUserNotification = {
        type: "postNotification",
        username: usr,
        previousUser: newState.previousUser
      };

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
  }

  //rendering all the components and attach to the root
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
