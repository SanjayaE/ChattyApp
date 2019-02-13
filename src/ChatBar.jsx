import React, { Component } from "react";

export default class ChatBar extends Component {
  render() {
    const onSubmit = event => {
      event.preventDefault();
      const msgInput = event.target.elements.chattyMsg;
      this.props.addNewMsg(msgInput.value);
      msgInput.value = "";
    };

    return (
      <form onSubmit={onSubmit}>
        <footer className="chatbar">
          <input
            className="chatbar-username"
            placeholder="Your Name (Optional)"
          />
          <input
            className="chatbar-message"
            type="text"
            name="chattyMsg"
            placeholder="Write your Message"
          />
          <button type="submit">Add</button>
        </footer>
      </form>
    );
  }
}
