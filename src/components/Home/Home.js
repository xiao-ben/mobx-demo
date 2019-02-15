import React, { Component } from 'react'
import { Menu } from 'antd'
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import Role from '../Role/Role'
import Environment from '../Environment/Environment'
import Member from '../Member/Member'
import StreetLight from '../StreetLight/StreetLight'
import Sprayer from '../Sprayer/Sprayer'
import Devices from '../Devices/Devices'
import axios from '../../lib/http'
import './Home.css'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Home extends Component {
    state = {
        managers: [{
            name: '角色管理',
            value: 'member',
            component: 'member'
        }, {
            name: '设备管理',
            value: [{
                manager_name: '智慧路灯',
                name: '智慧路灯',
                value: 'streetLight',
                comment: 'streetLight',
                component: 'Streetlight'
            }],
            component: 'device'
        }].filter(item => item.name !== '角色管理')
    }

    componentDidMount() {
        axios('/smart_site/manager/get-user-managers').then(res => {
            if (!res.data.data) return
            this.setState({
                managers: res.data.data.map(item => ({
                    name: item.manager_name,
                    id: item.id,
                    value: item.value,
                    component: this.titleCase(item.comment)
                })).filter(item => item.name !== '角色管理')
            })
        })
    }

    titleCase = str => {
        return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
    }

    renderRouter(manager) {
        switch (manager) {
            case 'Role':
                return <Route exact key={manager} path={`/home/role`} component={Role} />
            case 'Member':
                return <Route exact key={manager} path={`/home/member`} component={Member} />
            case 'Environment':
                return <Route exact key={manager} path={`/home/environment`} component={Environment} />
            case 'Devices':
                return <Route exact key={manager} path={`/home/devices`} component={Devices} />
            case 'streetLight':
                return <Route exact key={manager} path={`/home/streetLight`} component={StreetLight} />
            case 'Sprayer':
                return <Route exact key={manager} path={`/home/sprayer`} component={Sprayer} />
        }
    }

    redirectTo = () => {
        const {managers} = this.state
        if (managers[0].value.constructor == Array) {
            return  '/home/' + managers[0].value[0].value
        } else {
            return '/home/' + managers[0].value
        }
    }

    render() {
        const { history: { location } } = this.props
        const { managers } = this.state
        let currentRoute
        if (managers.length) {
            if (managers.includes(location.pathname.split('/')[2])) {
                currentRoute = location.pathname.split('/')[2]
            } else {
                currentRoute = managers[0].value
            }
        } else {
            currentRoute = location.pathname.split('/')[2]
        }
        return (
            <div className="homeRoot">
                <div className="navContent">
                    <Menu
                        className="menu"
                        onClick={this.handleClick}
                        style={{ width: 256 }}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        defaultSelectedKeys={[currentRoute]}
                    >
                        {
                            managers.map(item => {
                                if (item.value.constructor === Array) {
                                    return <MenuItemGroup key={item.value} title={item.name}>
                                    {
                                        item.value.map(right => <Menu.Item key={right.value}><Link to={`/home/${right.comment}`}>{right.manager_name}</Link></Menu.Item>)
                                    }
                                </MenuItemGroup>
                                } else {
                                    return <Menu.Item key={item.value}><Link to={`/home/${item.value}`}>{item.name}</Link></Menu.Item>
                                }
                            })
                        }
                        
                    </Menu>
                    <div className="homeBody">
                        <Switch>
                            {managers[0] && <Route exact path="/home/" component={() => <Redirect to={this.redirectTo()} />} />}
                            {
                                managers.map(item => {
                                    if (item.value.constructor === Array) {
                                        return item.value.map(right => this.renderRouter(right.comment))
                                    } else {
                                        return this.renderRouter(item.component)
                                    }
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
