import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Switch,Route } from 'react-router-dom'

import Devs2 from './components/Devs2';
import './css/bootstrap-reboot.min.css';
import './css/bootstrap-grid.min.css';
import './css/bootstrap.min.css';
import './css/style.css';
import WebFont from 'webfontloader';
import App from './App';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
<BrowserRouter>
       <Switch>
          <Route exact path="/"   component={App} />
          <Route exact path="/devs2"   component={Devs2} /> 
        </Switch>
</BrowserRouter>, document.getElementById('root'));

registerServiceWorker();

WebFont.load({
  google: {
    families: ['PT Sans:400', 'Roboto:700', 'sans-serif'],
  },
});
