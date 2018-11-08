
import React from 'react'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'mobx-react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import * as stores from './stores/index'
import Routers from './router'
import 'antd/dist/antd.css';

render(
  <Provider store={stores} >
    <Router>
      <Routers />
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();