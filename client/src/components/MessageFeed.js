import React, { Component } from 'react';
import Message from './Message';
import axios from 'axios';

const apiURI = process.env.NODE_ENV === 'development' ? 'http://localhost:5050/api/' : 'https://limitless-refuge-43765.herokuapp.com/api/';
const messages = 'recent-messages';
type State = {
  messages: Array<mixed>
}
export default class MessageFeed extends Component<State> {
  state = { // eslint-disable-line no-named-as-default
    messages: []
  };
  getMessages = () => {
    axios.get(apiURI + messages)
    .then(({ data }) => {
      this.setState({ messages: data })
    }).catch(err => console.log(err))
  }

  componentDidMount() {
   this.getMessages();
  }

  render() {
    return (
      <div>
        {this.state.messages.map((message) => {
          return (
            <Message
              time={message.dateCreated}
              body={message.body}
              key={message.sid}
            />
          );
        })}
      </div>
    );
  }
}
