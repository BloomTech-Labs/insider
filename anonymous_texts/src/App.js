import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipient: '',
      message: ''
    };
  }

  changeInput = (event) => {
    this.setState({recipient: event.target.value});
  }

  changeMessage = (event) => {
    this.setState({message: event.target.value});
  }

  sendSms = () => {
    fetch('http://localhost:5050/api/send', {
      method: 'POST',
      headers: {
        Accept: 'application/JSON',
        'Content-Type': 'application/JSON'
      },
      body: JSON.stringify({recipient: this.state.recipient, message: this.state.message})
    })
  }

  render() {
    return (
      <div>
        <p>Enter phone number to send SMS to: </p>
        <input
          onChange={this.changeInput}
          value={this.state.recipient}
          placeholder="number"
        />
        <br />
        <input
          onChange={this.changeMessage}
          value={this.state.message}
          placeholder="text" 
        />
        <br />
        <button onClick={this.sendSms}>Send text!</button>
        <p>Don\'t forget your country code, e.g., +1 in the US.</p>
      </div>
    );
  }
}

export default App;
