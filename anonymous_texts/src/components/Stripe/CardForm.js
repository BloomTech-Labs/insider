import React from 'react';
import {CardElement} from 'react-stripe-elements';

class CardForm extends React.Component {
  render() {
    return (
      <label>
        Card details
        <CardElement style={{base: {fontSize: '18px'}}} />
      </label>
    );
  }
}

export default CardForm;