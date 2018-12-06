import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import Cookies from 'js-cookie'
import './layout.css'

const RouterWrap = ({ component: Component, noTopNavBar, ...rest }) =>  {
    return (
        <Route {...rest} render={matchProps => {
            return Cookies.get('L_USM') || matchProps.match.path === "/login" ? <div>
                {!noTopNavBar && <Nav />}
                <div className="content">
                    <Component {...matchProps}/>
                </div>
            </div> : <Redirect to="/login" />
        }} />
    )
}
    

export default RouterWrap