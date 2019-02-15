import React, { Component } from "react";
import Message from "./Message.jsx";
import Notification from "./Notification.jsx";

export default class MessageList extends Component {
  render() {
    return (
      <ul className="message.system">
        {this.props.messages.map(msg => {
          console.log(msg.type);
          if (msg.type === "incomingMessage") {
            return <Message key={msg.id} msg={msg} />;
          } else if (msg.type === "incomingNotification") {
            return <Notification key={msg.id} msg={msg} />;
          }
        })}
      </ul>
    );
  }
}
