import React, { Component } from 'react';
import { StripeProvider } from 'react-stripe-elements';
import axios from 'axios';
import Checkout from './stripe/Elements';

const apiURI = 'http://localhost:5050/api/';

export default class MessageFeed extends Component {
  // Constructor not needed in React 16
  state = { // eslint-disable-line no-named-as-default
    recipient: '',
    message: '',
    sent: '',
  };

  sendSMS = (formData) => {
    const send = 'send';
    const { message, recipient } = this.state;
    axios
      .post(apiURI + send, { message, recipient })
      .then((res) => {
        this.setState({ sent: 'Thanks for using Anonymous Messages' });
      })
      .catch((error) => {
        this.setState({
          sent: 'Please try Again, your message did not go through.',
        });
        console.error(error);
      });
  };
  // Handles changes for all inputs
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
        <input name="message" onChange={this.handleInput} placeholder="text" />
        <StripeProvider apiKey="pk_test_N3kloqdrQMet0yDqnXGzsxR0">
          <Checkout />
        </StripeProvider>
        <button onClick={this.sendSMS}>Send text!</button>
        <p>Don't forget your country code, e.g., +1 in the US.</p>
        {/* Updates based on Twilio API success */}
        <p>{this.state.sent}</p>
      </div>
    );
  }
}
