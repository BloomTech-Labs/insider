import React from 'react';
import {Elements} from 'react-stripe-elements';

import CardForm from './CardForm';

class Checkout extends React.Component {
  render() {
    return (
      <Elements>
        <CardForm />
      </Elements>
    );
  }
}

export default Checkout;