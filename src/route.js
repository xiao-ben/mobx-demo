import React from 'react'
import { Route } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import './layout.css'

const RouterWrap = ({ component: Component, noTopNavBar, ...rest }) =>  {
    return (
        <Route {...rest} render={matchProps => (
            <div>
                {!noTopNavBar && <Nav />}
                <div className="content">
                    <Component {...matchProps}/>
                </div>
            </div>
        )} />
    )
}
    

export default RouterWrap