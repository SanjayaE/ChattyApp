import React, { Component } from "react";
import Message from "./Message.jsx";
import Notification from "./Notification.jsx";

//component that list both messages and notifications

export default class MessageList extends Component {
  render() {
    return (
      <ul>
        {this.props.messages.map(msg => {
          if (msg.type === "incomingNotification") {
            return <Notification key={msg.id} msg={msg} />;
          } else if (msg.type === "incomingMessage") {
            return <Message key={msg.id} msg={msg} />;
          }
        })}
      </ul>
    );
  }
}
