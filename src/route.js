import React from 'react'
import { Route } from 'react-router'
import Nav from './components/Nav/Nav'
import './layout.css'

const RouterWrap = ({ component: Component, noTopNavBar, ...rest }) =>  {
    return (
        <Route {...rest} render={matchProps => (
            <div>
                {!noTopNavBar && <Nav />}
                <div class="content">
                    <Component {...matchProps}/>
                </div>
            </div>
        )} />
    )
}
    

export default RouterWrap