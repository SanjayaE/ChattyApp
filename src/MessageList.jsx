import React, { Component } from "react";
import Message from "./Message.jsx";

export default class MessageList extends Component {
  render() {
    return (
      <ul className="message.system">
        {[this.props.messages.map(msg => <Message msg={msg} />)]}
      </ul>
    );
  }
}
