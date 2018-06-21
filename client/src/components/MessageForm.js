import React, { Component } from 'react';
import { StripeProvider } from 'react-stripe-elements';
import axios from 'axios';

import Checkout from './stripe/Elements';

const apiURI =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5050/api/'
    : 'https://limitless-refuge-43765.herokuapp.com/api/';
const send = 'send';

export default class MessageForm extends Component {
  state = {
    recipient: '',
    message: '',
    token: '',
    validPhone: false,
    clearFields: false
  };

  setStripeToken = token => {
    this.setState({ token });
  };

  loadingStatus = (status, message) => {
    const { updateParentState } = this.props;
    switch (status) {
      case 'loading':
        updateParentState('loadMessage', {
          message: [],
          loading: true,
          confirmed: false,
          error: false,
        });
        break;
      case 'error':
        updateParentState('loadMessage', {
          message,
          loading: false,
          confirmed: false,
          error: true,
        });
        setTimeout(() => {
          updateParentState('loadMessage', {
            message,
            loading: false,
            confirmed: false,
            error: false,
          });
        }, 2000);
        break;
      case 'confirmed':
        updateParentState('loadMessage', {
          message: [],
          loading: false,
          confirmed: true,
          error: false,
        });
        setTimeout(() => {
          updateParentState('loadMessage', {
            message: [],
            loading: false,
            confirmed: false,
            error: false,
          });
        }, 2000);
        break;
      case 'errorNoOverlay':
        updateParentState('loadMessage', {
          message,
          loading: false,
          confirmed: false,
          error: false,
        });
        break;
      default:
        updateParentState('loadMessage', {
          message: [],
          loading: false,
          confirmed: false,
          error: false,
        });
    }
  };

  validatePhone = recipient => {
    this.setState({ validPhone: true });
  };

  sendForm = () => {
    const { message, recipient, token, validPhone } = this.state;
    this.loadingStatus('loading');

    this.validatePhone(recipient);

    if (
      message !== '' &&
      recipient !== '' &&
      // validPhone &&
      token !== undefined
    ) {
      this.loadingStatus('loading');
      return axios
        .post(apiURI + send, {
          message,
          recipient,
          token: token.id,
        })
        .then(res => {
          this.loadingStatus('confirmed');
          this.setState({
            recipient: '',
            message: '',
            token: '',
            clearFields: true
          });

        })
        .catch(error => {
          if(error.message) {
            this.loadingStatus('error', [error.message]);
          } else {
            this.loadingStatus('error', ['An error occured. Please check your internet connection and try again.']);
          }
        });
    } else {
      if (message === '' && recipient === '') {
        this.loadingStatus('error', [
          'Please enter a valid phone number.',
          'Please enter a message.',
        ]);
      } else if (message === '') {
        this.loadingStatus('error', ['Please enter a message.']);
      } else if (recipient === '') {
        this.loadingStatus('error', ['Please enter a valid phone number.']);
      }
    }
  };

  // Handles changes for all inputs
  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <p>Enter phone number to send SMS to: </p>
        <form>
          <input
            name="recipient"
            onChange={this.handleInput}
            value={this.state.recipient}
            placeholder="number"
          />
          <input
            name="message"
            onChange={this.handleInput}
            value={this.state.message}
            placeholder="text"
          />
          <StripeProvider apiKey="pk_test_N3kloqdrQMet0yDqnXGzsxR0">
            <Checkout
              loadingStatus={this.loadingStatus}
              setToken={this.setStripeToken}
              loadingState={this.props.loadingState.loadingMessage}
              sendForm={this.sendForm}
              clearFields={this.state.clearFields}
            />
          </StripeProvider>
        </form>
        <p>Don't forget your country code, e.g., +1 in the US.</p>
      </div>
    );
  }
}
