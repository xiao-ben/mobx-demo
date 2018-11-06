import React from 'react'
import { Route } from 'react-router'
import Nav from './components/Nav/Nav'

const RouterWrap = ({ component: Component, noTopNavBar, ...rest }) =>  {
    return (
        <Route {...rest} render={matchProps => (
            <div>
                {!noTopNavBar && <Nav />}
                <Component {...matchProps}/>
            </div>
        )} />
    )
}
    

export default RouterWrap