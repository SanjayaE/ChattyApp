import React, { Component } from "react";

export default class Messages extends Component {
  render() {
    return (
      <div className="message">
        <h3> {this.props.msg.username} </h3>
        <p> {this.props.msg.text}</p>
      </div>
    );
  }
}
