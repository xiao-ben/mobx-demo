import React from 'react'
import { Switch, Redirect } from 'react-router-dom'
import Route from './route'
import Home from './components/Home/Home'
import Login from './components/Login/Login.js'

const Routers = () => {
    return (
        <Switch>
            <Route exact path="/" component={() => <Redirect to="/login" />} />
            <Route exact path="/login" noTopNavBar={true} component={Login} />
            <Route path="/home" component={Home} />
            <Route component={NotFound} />
        </Switch>
    )
}


const NotFound = () => {
    return <div><h1>not found</h1></div>
}


export default Routers