import React, { Component } from "react";

export default class Messages extends Component {
  render() {
    return (
      <div>
        <div className="message">
          <h3> {this.props.msg.username} </h3>
          <p> {this.props.msg.content}</p>
        </div>
      </div>
    );
  }
}
