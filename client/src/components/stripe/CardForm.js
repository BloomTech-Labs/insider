import React from 'react';
import { injectStripe } from 'react-stripe-elements';
import { CardElement } from 'react-stripe-elements';
import axios from 'axios';

const apiURI = process.env.NODE_ENV === 'development' ? 'http://localhost:5050/api/' : 'https://limitless-refuge-43765.herokuapp.com/api/';
const send = 'send';

class _CardForm extends React.Component {

  handleSubmit = (ev) => {
    ev.preventDefault();
    // Creates Stripe token
    const { message, recipient } = this.props
    // console.log(message)
    this.props.stripe.createToken().then(({ token }) => {
      axios
        .post(apiURI + send,
          {
          message,
          recipient,
          token: token.id
         })
        .then((res) => {
          console.log(res)
          this.setState({ sent: res.data.success });
        })
        .catch((error) => {
          this.setState({
            sent: 'Please try Again, your message did not go through.',
          });
          console.error(error);
        });
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
