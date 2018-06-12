import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MessageForm from './components/MessageForm';
import MessageFeed from './components/MessageFeed';
import './App.css';

const App = () => {
  return (
    <div className="container">
      <div className="header">
        <h1>Anonymous Texts</h1>
      </div>
      <Router>
        <div className="">
          <Route path="/" exact component={MessageForm} />
          <Route path="/" exact component={MessageFeed} />
          {/* <Route path="/account" exact component={Acount} />
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignUpForm} />
        <Route path="/change-password" component={ChangePassword} /> */}
        </div>
      </Router>
    </div>
  );
};

export default App;
