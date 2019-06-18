
import React from 'react'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'mobx-react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import * as stores from './stores/index'
import App from './router'
import 'antd/dist/antd.css';

render(
  <Provider store={stores} >
    <App />
  </Provider>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept(() => {
    render(
      <Provider store = {stores}>
        <App />
      </Provider>, document.getElementById('root'));
  })
}

registerServiceWorker();