import React, { Component } from 'react';
import axios from 'axios';

const apiURI = 'http://localhost:5050/api/';

export default class MessageFeed extends Component {
  state = {
    recipient: '',
    message: '',
    sent: '',
  };

  sendSMS = (formData) => {
    const send = 'send';
    const { message, recipient } = this.state;
    axios
      .post(apiURI + send, { message, recipient } )
      .then((res) => {
        this.setState({ sent: "Thanks for using Anonymous Messages" });
      })
      .catch(error => {
        this.setState({ sent: "Please try Again, your message did not go through." })
        console.error(error);
      });
  };

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <p>Enter phone number to send SMS to: </p>
        <input
          name="recipient"
          onChange={this.handleInput}
          placeholder="number"
        />
        <br />
        <input
          name="message"
          onChange={this.handleInput}
          placeholder="text"
        />
        <br />
        <button onClick={this.sendSMS}>Send text!</button>
        <p>Don't forget your country code, e.g., +1 in the US.</p>
        <p>{this.state.sent}</p>
      </div>
    );
  }
}
