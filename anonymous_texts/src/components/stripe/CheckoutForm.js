// import React from 'react';
// import { injectStripe } from 'react-stripe-elements';


// class _CardForm extends React.Component {
//   handleSubmit = (ev) => {
//     // We don't want to let default form submission happen here, which would refresh the page.
//     ev.preventDefault();
//     this.props.stripe.createToken({ name: 'Jenny Rosen' }).then(({ token }) => {
//       console.log('Received Stripe token:', token);
//     });
//   };
//   render() {
//     return (
//       <form
//         onSubmit={this.handleSubmit}
//       >
//         <label>
//           Card details
//           <CardElement />
//         </label>
//         <button>Pay</button>
//       </form>
//     );
//   }
// }
// const CardForm = injectStripe(_CardForm);
