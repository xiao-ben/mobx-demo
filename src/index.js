
import React from 'react'
import { Provider } from 'mobx-react'
import { render } from 'react-dom'
import * as stores from './stores/index'
import App from './App'
import 'antd/dist/antd.css';

render(
  <Provider store={stores} >
    <App />
  </Provider>,
  document.getElementById('root')
)

// 启用热替换 hmr
if (module.hot) {
  module.hot.accept(() => {
    render(
      <Provider store = {stores}>
        <App />
      </Provider>, document.getElementById('root'));
  })
}
