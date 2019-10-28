import React from 'react'
import { Switch, Redirect, BrowserRouter as Router } from 'react-router-dom'
import Route from './route'
import Home from './components/Home/Home'
import Login from './components/Login/Login.js'
import { observer } from 'mobx-react';

// app 内路由配置
@observer
class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" noTopNavBar={true} component={Login} />
          <Route path="/home" component={Home} />
          <Redirect from='/' to='/home' />
          <Route component={NotFound} />
        </Switch>
      </Router>
    )
  }
}


const NotFound = () => {
  return <div><h1>not found</h1></div>
}


export default App