import React, { Component } from "react";
import "./App.css";
import Button from "./button";

class App extends Component {
  constructor() {
    super();
    const progressSet = new Set();
    this.state = {
      email: "",
      name: "",
      message: "",
      isSent: false,
      progress: progressSet
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const input = e.currentTarget.name;
    const value = e.currentTarget.value;
    const progress = this.state.progress;
    if (value === "") {
      progress.delete(input);
    } else {
      progress.add(input);
    }
    this.setState({
      [input]: value,
      progress
    });
  }

  validEmail(email) {
    const regex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i;
    return regex.test(email);
  }

  fieldsValid(){
    return this.state.progress.size === 3 && this.validEmail(this.state.email);
  }

  handleSubmit(e) {
    e.preventDefault();
    if ( this.state.isSent || !this.fieldsValid() ){
      return;
    }
    let { email, name, message } = this.state;
    const to = "jcompagni@gmail.com";
    const from = "admin@juliancompagniportis.com";
    const subject = "Message from " + name;
    message = email + ": " + message;
    const path = "https://juliancompagniportis.com/webmail/mailAPI.php";
    fetch(path, {
      method: "POST",
      data: { to, from, subject, message, mailCode: 10 }
    }).then(resp => {
      this.setState({ isSent: true });
    });
  }

  render() {
    return (
      <form className="mail-form" onSubmit={this.handleSubmit.bind(this)}>
        <h3>
          We Love Mail
          <span className="emoji">✨</span>
        </h3>
        <input
          type="text"
          name="name"
          disabled={this.state.isSent}
          autoComplete="off"
          value={this.state.name}
          className="form-input name"
          placeholder="name"
          onChange={this.handleChange}
        />
        <input
          type="email"
          name="email"
          disabled={this.state.isSent}
          autoComplete="off"
          value={this.state.email}
          className="form-input email"
          placeholder="mail"
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="message"
          disabled={this.state.isSent}
          value={this.state.message}
          className="form-input message"
          placeholder="message"
          onChange={this.handleChange}
        />
        <Button
          progress={this.state.progress.size}
          isSent={this.state.isSent}
        />
      </form>
    );
  }
}

export default App;
