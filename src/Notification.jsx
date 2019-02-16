import React, { Component } from "react";

//Notification component
export default class Notification extends Component {
  render() {
    console.log("Rendering <Notification/>");
    return (
      <div className="message">
        <span className="message.notification">
          {" "}
          {this.props.msg.previousUser} changed their name to{" "}
          {this.props.msg.username}.
        </span>
      </div>
    );
  }
}
