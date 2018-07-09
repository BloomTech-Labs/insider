import React, { Component } from 'react';
import Message from './Message';
import axios from 'axios';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3030');

const apiURI = 'http://localhost:3030/api/';
const messages = 'recent-messages';

type State = {
  messages: Array<mixed>,
};
export default class MessageFeed extends Component<State> {
  state = {
    // eslint-disable-line no-named-as-default
    messages: [],
    loaded: 'hide',
  };
  getMessages = () => {
    axios
      .get(apiURI + messages)
      .then(({ data }) => {
        this.setState({ messages: data, loaded: 'show' });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    socket.on('message-feed', (data) => {
      if (data != undefined && data != null) {
      const json = JSON.parse(data);
        const { messages } = json;
        console.log(messages);
        this.setState({ messages, loaded: 'show' });
      }
    });
    // this.getMessages();
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Recent Activity</h2>
        <div className={`message-feed ${this.state.loaded}`}>
          {this.state.messages.map(message => {
            const { body, sid } = message;
            return (
              <Message
                loaded={this.state.loaded}
                body={body}
                key={sid}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
