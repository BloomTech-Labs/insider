import React, { Component } from 'react';
import { StripeProvider } from 'react-stripe-elements';
import axios from 'axios';

import Checkout from './stripe/Elements';
import { isValidNumber } from 'libphonenumber-js';

const apiURI =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5050/api/'
    : 'https://limitless-refuge-43765.herokuapp.com/api/';
const send = 'send';

export default class MessageFeed extends Component {
  // Constructor not needed in React 16
  state = {
    // eslint-disable-line
    recipient: '',
    message: '',
    token: '',
    validPhone: false,
    clearFields: false,
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
    const countryCode = recipient.startsWith('+1');
    const isValid = countryCode
      ? isValidNumber(recipient)
      : isValidNumber({ phone: recipient, country: 'US' });
    if (!countryCode) this.setState({ recipient: `+1${recipient}` });
    if (isValid) {
      this.setState({ validPhone: true });
    } else {
      this.setState({ validPhone: false });
    }
  };

  sendForm = () => {
    const { message, recipient, token, validPhone } = this.state;
    this.loadingStatus('loading');

    this.validatePhone(recipient);

    if (
      message !== '' &&
      recipient !== '' &&
      token !== undefined &&
      validPhone
    ) {
      this.loadingStatus('loading');
      return axios
        .post(apiURI + send, {
          message,
          recipient,
          token: token.id,
        })
        .then(res => {
          console.log(res);
          this.loadingStatus('confirmed');
          this.setState({
            recipient: '',
            message: '',
            token: '',
          });
        })
        .catch(error => {
          console.error(error);
          if (error.message) {
            this.loadingStatus('error', [error.message]);
          } else {
            this.loadingStatus('error', [
              'An error occured. Please check your internet connection and try again.',
            ]);
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
      } else if (recipient === '' || !validPhone) {
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
      <div className="send-message">
        <form>
          <label htmlFor="recipient">To</label>
          <input
            type="tel"
            className="number-form form-control"
            name="recipient"
            onChange={this.handleInput}
            value={this.state.recipient}
            placeholder="number"
          />
          <label htmlFor="message">Message</label>
          <input
            name="message"
            className="message-form form-control"
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
      </div>
    );
  }
}
