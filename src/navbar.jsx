import React, { Component } from "react";
export default class Navbar extends Component {
  render() {
    console.log("Rendering <Navbar/>");
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">
          CanTalk -Where Canadians Mingle!
        </a>
        <a className="navbar-counter">{this.props.userCount} users online</a>
      </nav>
    );
  }
}
