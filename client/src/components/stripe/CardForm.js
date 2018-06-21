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
    } else if (element.error !== undefined) {
      this.setState({
        complete: false,
      });
      loadingStatus('error', ['Please fill out all CC fields.']);
    } 
  };

  createToken = e => {
    e.preventDefault();

    const {
      loadingStatus,
      setToken,
      sendForm,
      clearFields
    } = this.props.state;

    loadingStatus('loading', '');

    // Creates Stripe token
    if (this.state.complete) {
      this.props.stripe
        .createToken()
        .then(({ token }) => {
          if (token === undefined) {
            loadingStatus('error', ['Stripe was not able to create a token.']);
          } else {
            loadingStatus('confirmed');
            setToken(token);
            sendForm().then(() => this._element.clear());
          }
        })
        .catch(error => {
          if(error.message) {
            loadingStatus('error', [error.message]);
          } else {
            loadingStatus('error', ['An error occured. Please check your internet connection and try again.']);
          }
        });
    } else {
      loadingStatus('error', ['Please fill out all CC fields.']);
    }
  };

  render() {
    return (
      <div>
        <CardElement style={{base: {fontSize: '18px'}}} onChange={element => this.isComplete(element)} onReady={(element) => this._element = element}/>
        <button type='button' className = "button-control btn btn-sm btn-primary" onClick={this.createToken}>Send Text</button>
      </div>
    );
  }
}
const CardForm = injectStripe(_CardForm);

export default CardForm;
