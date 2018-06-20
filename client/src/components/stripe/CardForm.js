import React from 'react';
import { injectStripe } from 'react-stripe-elements';
import { CardElement } from 'react-stripe-elements';

import axios from 'axios';

const apiURI =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5050/api/'
    : 'https://limitless-refuge-43765.herokuapp.com/api/';
const send = 'send';

class _CardForm extends React.Component {
  loadingStatus = status => {
    const { updateParentState } = this.props.state;
    switch (status) {
      case 'loading':
        updateParentState('loading', true);
        updateParentState('error', false);
        updateParentState('confirmed', false);
        break;
      case 'error':
        updateParentState('loading', false);
        updateParentState('confirmed', false);
        updateParentState('error', true);
        setTimeout(() => {
          updateParentState('error', false);
        }, 1500);
        break;
      case 'confirmed':
        updateParentState('confirmed', true);
        updateParentState('loading', false);
        updateParentState('error', false);
        setTimeout(() => {
          updateParentState('confirmed', false);
        }, 1500);
        break;
      default:
        updateParentState('confirmed', false);
        updateParentState('loading', false);
        updateParentState('error', false);
    }
  };

  handleSubmit = ev => {
    ev.preventDefault();
    
    const { message, recipient } = this.props.state;
    this.loadingStatus('loading');

    // Creates Stripe token
    this.props.stripe.createToken().then(({ token }) => {
      if (token === undefined) {
        this.loadingStatus('error');
      } else {
        this.loadingStatus('loading');
        axios
          .post(apiURI + send, {
            message,
            recipient,
            token: token.id,
          })
          .then(res => {
            console.log(res);
            this.loadingStatus('confirmed');
          })
          .catch(error => {
            console.error(error);
            this.loadingStatus('error');
          });
      }
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardElement />
        <button>Pay</button>
      </form>
    );
  }
}
const CardForm = injectStripe(_CardForm);

export default CardForm;
