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
      user: "Dushantha",
      messages: [
        {
          type: "incomingMessage",
          content:
            "I won't be impressed with technology until I can download food.",
          username: "Anonymous1",
          id: 1
        },
        {
          type: "incomingNotification",
          content: "Anonymous1 changed their name to nomnom",
          id: 2
        },
        {
          type: "incomingMessage",
          content:
            "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
          username: "Anonymous2",
          id: 3
        },
        {
          type: "incomingMessage",
          content: "...",
          username: "nomnom",
          id: 4
        }
      ]
    };
  }

  addNewMsg = (msg, usr) => {
    let newMsg = {
      type: "incomingMessage",
      content: msg,
      username: usr,
      id: generateRandomId()
    };
    this.setState({ messages: [...this.state.messages, newMsg] });
  };

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
