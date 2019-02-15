import React, { Component } from "react";

export default class Notification extends Component {
  render() {
    return (
      <div className="notification">
        <span className="notification-content">
          {" "}
          {this.props.msg.previousUser} changed their name to -
          {this.props.msg.username}.
        </span>
      </div>
    );
  }
}
