import React, { Component } from 'react';
import { getMessages } from '../functions/functions';
import Message from './Message';

export default class MessageFeed extends Component {
  state = {
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
