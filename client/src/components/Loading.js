import React from 'react';
import Loader from './Loader';
import Confirmed from './Confirmed';
import Error from './Error';
import './loading.css';

// Flow type checking
const Loading = (props) => {
  const { loadMessage } = props.state
  return (
    <div>
      <Loader loading={props.state.loadMessage.loading} />
      <Confirmed confirmed={props.state.loadMessage.confirmed} />
      <Error error={props.state.loadMessage.error} message={props.state.loadMessage.message} />
    </div>
  );
};

export default Loading;
