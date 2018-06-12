import React from 'react';

const Message = (props) => {
  return (
    <div className="message">
      <h4>{props.title}</h4>
      <p>{props.body}</p>
    </div>
  );
};

// Still need to add propTypes validation
export default Message;
