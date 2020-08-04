import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Root from './containers/Root';
import * as serviceWorker from './serviceWorker';
import './index.css';


ReactDOM.render(
  <React.StrictMode>
    <Router>                                   {/* to access history obj in 'App' component */}
      <Root />   
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
