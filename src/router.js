import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Counter from './App'

const Routers = () => {
    console.log(this, 'porps')
    return (
        <Switch>
            <Route exact path="/123" component={Counter} />
            <Route render={() => <h1>找不到此页面</h1>} />
        </Switch>
    )
}


export default Routers