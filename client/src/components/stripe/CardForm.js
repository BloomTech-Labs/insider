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

  handleSubmit = ev => {
    const { updateParentState } = this.props.state
    // this.props.update'loading'State(true)
    ev.preventDefault();
    // Creates Stripe token
    const { message, recipient } = this.props.state;
    // console.log(message, recipient)
    this.props.stripe.createToken().then(({ token }) => {
      
      updateParentState('loading', true);

      if (token === undefined) {

        updateParentState('loading', false);
        updateParentState('error', true);
        setTimeout(() => {
          updateParentState('error', false);
        }, 1500);

      } else {
        updateParentState('loading', true);
        updateParentState('error', false);

        axios
          .post(apiURI + send, {
            message,
            recipient,
            token: token.id,
          })
          .then(res => {
            // this.setState({ message: res.data.success });
            
            updateParentState('loading', false);
            updateParentState('confirmed', true);
            setTimeout(() => {
              updateParentState('confirmed', false);
            }, 1500);
          })
          .catch(error => {
            // this.setState({
            //   message: 'Please try again, your message did not go through.',
            // });
            console.error(error);

            updateParentState('loading', false);
            updateParentState('error', true);
            setTimeout(() => {
              updateParentState('error', false);
            }, 1500);
          });
      }
    });
    // Extracts out message from props
    // console.log(message, recipient, token)
    // Makes API call to /send that send token info to stripe and onsuccessful charge, sends a message on to Twilio
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Card details
          <CardElement />
        </label>
        <button>Pay</button>
      </form>
    );
  }
}
const CardForm = injectStripe(_CardForm);

export default CardForm;
