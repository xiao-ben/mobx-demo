import React from 'react'
import { Switch, Redirect, BrowserRouter as Router } from 'react-router-dom'
import Route from './route'
import Home from './components/Home/Home'
import Login from './components/Login/Login.js'
import Cookies from 'js-cookie'
import { observer } from 'mobx-react';

@observer
class Routers extends React.Component {
    render () {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={() => {
                        if (Cookies.get('L_USM')) {
                                return <Redirect to="/home" />
                            }
                        } 
                    } />
                    <Route exact path="/login" noTopNavBar={true} component={Login} />
                    <Route path="/home" component={Home} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
        )
    }
}


const NotFound = () => {
    return <div><h1>not found</h1></div>
}


export default Routers