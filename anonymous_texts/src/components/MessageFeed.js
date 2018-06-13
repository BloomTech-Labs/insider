import React, { Component } from 'react';
import Message from './Message';

export default class MessageFeed extends Component {
  state = { // eslint-disable-line no-named-as-default
    messages: [
      {
        timestamp: '01100',
        body: 'This is a recent message.',
        id: 'uuid',
      },
    ],
  };

  componentDidMount() {
    // this.setState({ messages: getMessages() });
  }

  render() {
    return (
      <div>
        {this.state.messages.map((message) => {
          return (
            <Message
              title={message.timestamp}
              body={message.body}
              key={message.id}
            />
          );
        })}
      </div>
    );
  }
}
