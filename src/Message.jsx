import React, { Component } from "react";

//main message component
export default class Messages extends Component {
  render() {
    console.log("Rendering <Messages/>");
    return (
      <div>
        <div className="message">
          <span
            className="message-username"
            style={{ color: this.props.msg.colour }}
          >
            <h3> {this.props.msg.username} </h3>
          </span>
          <span
            className="message-content"
            style={{ color: this.props.msg.colour }}
          >
            {" "}
            {this.props.msg.content}
          </span>
        </div>
      </div>
    );
  }
}
