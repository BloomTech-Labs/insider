import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MessageForm from './components/MessageForm';
import MessageFeed from './components/MessageFeed';
import Loading from './components/Loading';

class App extends Component {
  // eslint-disable-line arrow-body-style
  state = {
    loading: false,
    error: false,
    confirmed: false
  };

  updateParentState = ( attribute, inputState) => {
    this.setState({
      [ attribute ]: inputState,
    });
  };

  render() {
    return (
      <div className="container align-items-center d-flex flex-column"> 
        <div className="header">
          <img id="logo" src="/images/ghost_texts.svg" alt="Ghost Texts Logo" />
        </div>
        <Loading state={this.state}/>
        <Router>
          <div className ="row">
            <Route
              path="/"
              exact
              render={(props) => <MessageForm {...props} updateParentState={this.updateParentState} loadingState={this.state}/>}
            />
            <Route path="/" exact component={MessageFeed} />
          </div>
        </Router>
      </div>
    );
  } 
}

export default App;
