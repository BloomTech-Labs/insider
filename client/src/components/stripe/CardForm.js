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
  state = {
    incomplete: false,
  };
  handleSubmit = ev => {
    // this.props.update'loading'State(true)
    ev.preventDefault();
    // Creates Stripe token
    const { message, recipient } = this.props.state;
    // console.log(message, recipient)
    this.props.stripe.createToken().then(({ token }) => {
      
      this.props.state.updateParentState('loading', true);

      if (token === undefined) {
        this.setState({ incomplete: true });

        this.props.state.updateParentState('loading', false);
        this.props.state.updateParentState('error', true);
        setTimeout(() => {
          this.props.state.updateParentState('error', false);
        }, 1500);

      } else {
        this.setState({ incomplete: false });

        this.props.state.updateParentState('loading', true);
        this.props.state.updateParentState('error', false);

        axios
          .post(apiURI + send, {
            message,
            recipient,
            token: token.id,
          })
          .then(res => {
            this.setState({ message: res.data.success });

            this.props.state.updateParentState('loading', false);
            this.props.state.updateParentState('confirmed', true);
            setTimeout(() => {
              this.props.state.updateParentState('confirmed', false);
            }, 1000);
          })
          .catch(error => {
            this.setState({
              message: 'Please try again, your message did not go through.',
            });
            console.error(error);

            this.props.state.updateParentState('loading', false);
            this.props.state.updateParentState('error', true);
            setTimeout(() => {
              console.log('props', this.props);
              this.props.state.updateParentState('error', false);
            }, 3000);
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
