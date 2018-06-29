import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MessageForm from './components/MessageForm';
import MessageFeed from './components/MessageFeed';
import Loading from './components/Loading';
import Footer from './components/Footer';
import Header from './components/Header';

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
      <Header />
      <div className="container align-items-center d-flex flex-column">
        <Loading state={this.state} />
        <div className="row">
          <img id="logo" src="/images/ghost_texts_blue.svg" alt="Ghost Texts Logo" />
        </div>
        <h1 className="text-center">Send an anonymous text message to anyone for $1</h1>
        <Router>
          <div className="col-container">
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
