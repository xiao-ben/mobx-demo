import React, { Component } from 'react'
import { Menu } from 'antd'
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import Role from '../Role/Role'
import Environment from '../Environment/Environment'
import Member from '../Member/Member'
import Devices from '../Devices/Devices'
import { path } from '../../config'
import './Home.css'

class Home extends Component {
    
    componentDidMount() {
        console.log(this.props.history.location.pathname.split('/')[2], 'props')
    }


    render() {
        const {history: {location}} = this.props
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
                            path.map(item => <Menu.Item key={item.value}><Link to={`/home/${item.value}`}>{item.name}</Link></Menu.Item>)
                        }
                    </Menu>
                    <div className="homeBody">
                        <Switch>
                            <Route exact path="/home/" component={() => <Redirect to="/home/role" />} />
                            {/* {
                                path.map(item => {
                                    if (item.value === "role" || item.value === "environment") {
                                        return <Route exact path={`/home/${item.value}`} component={require(`../${item.component}/${item.component}`)} />
                                    } else {
                                        return <Route exact path={`/home/${item.value}`} component={Role} />
                                    }
                                })
                                        
                            } */}
                            <Route exact path={`/home/role`} component={Role} />
                            <Route exact path={`/home/member`} component={Member} />
                            <Route exact path={`/home/environment`} component={Environment} />
                            <Route exact path={`/home/devices`} component={Devices} />
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home