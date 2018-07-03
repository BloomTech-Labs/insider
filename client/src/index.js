import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Switch,Route } from 'react-router-dom'
import Devs from './components/Devs';
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
          <Route path="/devs"   component={Devs} /> 
        </Switch>
</BrowserRouter>, document.getElementById('root'));

registerServiceWorker();

WebFont.load({
  google: {
    families: ['PT Sans:400', 'Roboto:700', 'sans-serif'],
  },
});
