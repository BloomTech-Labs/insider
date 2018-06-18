import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MessageForm from './components/MessageForm';
import MessageFeed from './components/MessageFeed';
import Loading from './components/Loading';
import './App.css';

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
      <div className="container">
        <div className="header">
          <h1>Anonymous Texts</h1>
        </div>
        <Loading state={this.state}/>
        {/* React Router routes based on current path, some
      components may need to be repeated because of this. */}
        <Router>
          <div className="">
            <Route
              path="/"
              exact
              render={(props) => <MessageForm {...props} updateParentState={this.updateParentState} loadingState={this.state}/>}
            />
            <Route path="/" exact component={MessageFeed} />
            {/* <Route path="/account" exact component={Acount} />
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignUpForm} />
        <Route path="/change-password" component={ChangePassword} /> */}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
