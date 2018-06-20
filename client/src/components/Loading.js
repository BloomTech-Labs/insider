import React from 'react';
import Loader from './Loader';
import Confirmed from './Confirmed';
import Error from './Error';
import './loading.css';

// Flow type checking
const Loading = (props) => {
  return (
    <div>
      <Loader loading={props.state.loading} />
      <Confirmed confirmed={props.state.confirmed} />
      <Error error={props.state.error} />
    </div>
  );
};

export default Loading;
