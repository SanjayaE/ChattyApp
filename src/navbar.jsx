import React, { Component } from "react";

//Navigation bar component
export default class Navbar extends Component {
  render() {
    console.log("Rendering <Navbar/>");
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">
          CanTalk -Where Canadians Mingle!
        </a>
        <a className="navbarUserCounter">{this.props.userCount} users online</a>
      </nav>
    );
  }
}
