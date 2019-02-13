import React, { Component } from "react";

export default class ChatBar extends Component {
  render() {
    const onSubmit = event => {
      event.preventDefault();
      const msgInput = event.target.elements.chattyMsg;
      const inputUsr = event.target.elements.chattyUsr;
      if (inputUsr.value) {
        this.props.addNewMsg(msgInput.value, inputUsr.value);
      } else {
        this.props.addNewMsg(msgInput.value, "annomouse");
      }

      msgInput.value = "";
    };

    return (
      <form onSubmit={onSubmit}>
        <footer className="chatbar">
          <input
            className="chatbar-username"
            name="chattyUsr"
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
