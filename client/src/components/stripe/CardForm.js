import React from 'react';
import { injectStripe } from 'react-stripe-elements';
import { CardElement } from 'react-stripe-elements';

class _CardForm extends React.Component {
  state = {
    complete: false,
  };

  // Checks whether the Stripe form has been completed and gives error feedback
  isComplete = element => {
    const { loadingStatus } = this.props.state;
    if (element.complete && !element.empty && element.error === undefined) {
      this.setState({
        complete: true,
      });
      loadingStatus();
    } else if (element.error !== undefined) {
      loadingStatus('errorNoOverlay', [element.error.message])
    } else {
      this.setState({
        complete: false,
      });
      loadingStatus('errorNoOverlay', ['Please fill out all CC fields.'])
    }
  };

  createToken = e => {
    e.preventDefault();

    const {
      loadingStatus,
      setToken,
      sendForm,
    } = this.props.state;

    loadingStatus('loading', '');

    // Creates Stripe token
    if (this.state.complete) {
      console.log(this.props)
      this.props.stripe
        .createToken()
        .then(({ token }) => {
          if (token === undefined) {
            loadingStatus('error', ['Stripe was not able to create a token.']);
          } else {
            loadingStatus('confirmed');
            setToken(token);
            sendForm();
          }
        })
        .catch(error => {
          console.log(error)
          loadingStatus('error', ['An error occured, please try again.']);
        });
    } else {
      loadingStatus('error', ['Please fill out all CC fields.']);
    }
  };

  render() {
    return (
      <div>
        <CardElement onChange={element => this.isComplete(element)} />
        <button onClick={this.createToken}>Send Text</button>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    );
  }
}
const CardForm = injectStripe(_CardForm);

export default CardForm;
