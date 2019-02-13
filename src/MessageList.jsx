import React, { Component } from "react";
import Message from "./Message.jsx";

export default class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Bob" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          text: "Has anyone seen my marbles?"
        },
        {
          username: "Anonymous",
          text:
            "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
  }

  render() {
    return (
      <ul className="message.system">
        {[this.state.messages.map(msg => <Message msg={msg} />)]}
      </ul>
    );
  }
}
