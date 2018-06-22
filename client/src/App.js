import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MessageForm from './components/MessageForm';
import MessageFeed from './components/MessageFeed';
import Loading from './components/Loading';
import Icons from './components/Icons';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';

library.add(faStroopwafel)

class App extends Component {
  state = {
    loadMessage: {
      message: [],
      loading: false,
      error: false,
      confirmed: false,
    }
  };

  updateParentState = (attribute, inputState) => {
    this.setState({ [attribute]: inputState });
  };

  render() {
    return (
      <div className="container align-items-center d-flex flex-column">
        <Loading state={this.state} />
        <div className="header row">
          <img id="logo" src="/images/ghost_texts.svg" alt="Ghost Texts Logo" />
        </div>
        <Router>
          <div>
            <div className="icons">
              <Route path="/" exact component={Icons} />
            </div>
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
              /></div>

            <div>
              <h2> Recent Activity </h2>
              <Route path="/" exact component={MessageFeed} />


              {/* <Route path="/about" exact component={AboutUs} />
            <Route path="/contact" exact component={Contact} /> */}
            </div>
          </div>
        </Router>
      </div >
    );
  }
}

export default App;
