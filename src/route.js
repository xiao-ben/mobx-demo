import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import Cookies from 'js-cookie'
import './index.css'


// 如果没有 cookie 并且不在登陆页面 跳转到登陆页面
const RouterWrap = ({ component: Component, noTopNavBar, ...rest }) => {
  return (
    <Route {...rest} render={matchProps => {

      if (matchProps.match.path === "/login") {
        if (Cookies.get('L_USM')) {
          return <Redirect to="/home" />
        } else {
          return <div>
            {!noTopNavBar && <Nav />}
            <div className="content">
              <Component {...matchProps} />
            </div>
          </div>
        }
      } else {
        if (Cookies.get('L_USM')) {
          return <div>
            {!noTopNavBar && <Nav />}
            <div className="content">
              <Component {...matchProps} />
            </div>
          </div>
        } else {
          return <Redirect to="/login" />
        }
      }
    }} />
  )
}


export default RouterWrap