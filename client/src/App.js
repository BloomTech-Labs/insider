import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MessageForm from './components/MessageForm';
import MessageFeed from './components/MessageFeed';
import Loading from './components/Loading';
import Footer from './components/Footer';

class App extends Component {
  state = {
    loadMessage: {
      message: [],
      loading: false,
      error: false,
      confirmed: false,
    },
  };

  updateParentState = (attribute, inputState) => {
    this.setState({ [attribute]: inputState });
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm">
          <a className="navbar-brand" href="#">
            <img
              id="white-logo"
              src="/images/ghost-texts-heavy.svg"
              alt="White Logo"
            />
          </a>
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
      <li className="nav-item">
        <a className="nav-link" href="#">Contact</a>
      </li>
      </ul>
        </nav>
      <div className="container align-items-center d-flex flex-column">
        <Loading state={this.state} />
        <div className="row">
          <img id="logo" src="/images/ghost_texts_blue.svg" alt="Ghost Texts Logo" />
        </div>
        <h1 className="text-center">Send an anonymous text message to anyone for $1</h1>
        <Router>
          <div>
            <div>
              <Route
                path="/"
                exact
                render={() => (
                  <MessageForm
                    updateParentState={this.updateParentState}
                    loadingState={this.state}
                  />
                )}
              />
            </div>

            <h2 className="text-center">Recent Activity</h2>
            <Route path="/" exact component={MessageFeed} />
            {/* <Route path="/about" exact component={AboutUs} />
            <Route path="/contact" exact component={Contact} /> */}
          </div>
        </Router>
      </div>
      <Footer />
      </div>
    );
  }
}

export default App;
