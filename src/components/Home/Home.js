import React, { Component } from 'react'
import { Menu } from 'antd'
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import Role from '../Role/Role'
import Environment from '../Environment/Environment'
import Member from '../Member/Member'
import StreetLight from '../StreetLight/StreetLight'
import Sprayer from '../Sprayer/Sprayer'
import Devices from '../Devices/Devices'
import { path } from '../../config'
import axios from '../../lib/http'
import './Home.css'

class Home extends Component {
    state = {
        managers: []
    }
    
    componentDidMount() {
        axios('/smart_site/manager/get-user-managers').then(res => {
            if (!res.data.data) return 
            this.setState({
                managers: res.data.data.map(item => ({
                    name: item.manager_name,
                    id: item.id,
                    value: item.comment,
                    component: this.titleCase(item.comment)
                }))
            })
        })
    }

    titleCase = str =>{  
        return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());  
    }  

    renderRouter(manager) {
        switch(manager) {
            case 'Role' :
                return <Route exact key={manager} path={`/home/role`} component={Role} />
            case 'Member' :
                return <Route exact key={manager} path={`/home/member`} component={Member} />
            case 'Environment' :
                return <Route exact key={manager} path={`/home/environment`} component={Environment} />
            case 'Devices' :
                return <Route exact key={manager} path={`/home/devices`} component={Devices} />
            case 'Streetlight' :
                return <Route exact key={manager} path={`/home/streetLight`} component={StreetLight} />
            case 'Sprayer' :
                return <Route exact key={manager} path={`/home/sprayer`} component={Sprayer} />
        }
    }

    render() {
        const {history: {location}} = this.props
        const {managers} = this.state
        return (
            <div className="homeRoot">
                <div className="navContent">
                    <Menu
                        className="menu"
                        onClick={this.handleClick}
                        style={{ width: 256 }}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        defaultSelectedKeys={[location.pathname.split('/')[2] || path[0].value]}
                    >
                        {
                            managers.map(item => <Menu.Item key={item.value}><Link to={`/home/${item.value}`}>{item.name}</Link></Menu.Item>)
                        }
                    </Menu>
                    <div className="homeBody">
                        <Switch>
                            <Route exact path="/home/" component={() => <Redirect to="/home/role" />} />
                            {
                                managers.map(item => {
                                    return this.renderRouter(item.component)
                                })
                            }
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home
