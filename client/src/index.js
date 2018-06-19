/*eslint-disable */
import './css/bootstrap-reboot.min.css';
import './css/bootstrap-grid.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
