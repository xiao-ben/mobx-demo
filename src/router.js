import React from 'react'
import { Route, Switch } from 'react-router'
import Home from './components/Home/Home'
import Login from './components/Login/Login.js'

const Routers = () => {
    return (
        <Switch>
            <Route exact path="/login" noTopNavBar={true} component={Login} />
            <Route exact path="/home" component={Home} />
            <Route render={() => <h1>123</h1>} />
        </Switch>
    )
}


export default Routers