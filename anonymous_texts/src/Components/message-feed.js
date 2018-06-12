import React, { Component } from 'react';

class MessageFeed extends Component {
  state = {
    messages: []
  }
  render() {
    return (
      <div className="message-feed">
        { this.props.children }
      </div>
    );
  };
};

export default MessageFeed;
