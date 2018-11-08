import React, { Component } from 'react'
import { Menu } from 'antd'
import { Route, Switch, Link } from 'react-router-dom'
import Role from '../Role/Role'
import './Home.css'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Home extends Component {
    render() {
        return (
            <div className="homeRoot">
                <div className="navContent">
                    <Menu
                        className="menu"
                        onClick={this.handleClick}
                        style={{ width: 256 }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                    >
                        <SubMenu key="sub1" title="用户管理">
                            <Menu.Item key="1"><Link to="/home/role">角色管理</Link></Menu.Item>
                            <Menu.Item key="2">人员管理</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="3">环境监测</Menu.Item>
                        <Menu.Item key="4">路灯管理</Menu.Item>
                        <Menu.Item key="5">喷雾机管理</Menu.Item>
                    </Menu>
                    <div className="homeBody">
                        <Switch>
                            <Route exact path="/home/role" component={Role} />
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home