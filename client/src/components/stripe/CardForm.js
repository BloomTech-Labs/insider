import React from 'react';
import { injectStripe } from 'react-stripe-elements';
import { CardElement } from 'react-stripe-elements';
import axios from 'axios';

const apiURI = process.env.NODE_ENV === 'development' ? 'http://localhost:5050/api/' : 'https://anonymous-texts.herokuapp.com/api/';
const send = 'send';

class _CardForm extends React.Component {
  state = {
    message: ''
  }
  handleSubmit = (ev) => {
    this.props.state.updateLoadingState(true)
    // this.props.updateLoadingState(true)
    ev.preventDefault();
    // Creates Stripe token
    const { message, recipient } = this.props.state
    console.log(message, recipient)
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
          this.setState({ message: res.data.success });
          this.props.state.updateLoadingState(false)
        })
        .catch((error) => {
          this.setState({
            message: 'Please try again, your message did not go through.',
          });
          console.error(error);
          this.props.state.updateLoadingState(false)
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
