import React, { Component } from 'react'
import { Menu } from 'antd'
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import Member from '../Member/Member'
import StreetLight from '../StreetLight/StreetLight'
import './Home.css'

const SubMenu = Menu.SubMenu;

@inject('store') @observer
class Home extends Component {
    constructor(props) {
        super(props)
        this.store = props.store.navStore
    }

    componentDidMount() {
        this.store.getManagers()
    }

    titleCase = str => {
        return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
    }

    renderRouter(manager) {
        switch (manager) {
            case 'streetLight':
                return <Route exact key={manager} path={`/home/streetLight`} component={StreetLight} />
            default:
                return null
        }
    }

    getCurrentPath = () => {
        const { history: { location : { pathname } }} = this.props
        return pathname.split('/')[2] ? pathname.split('/')[2] : this.redirectTo()
    }

    redirectTo = () => {
        const { managers, isAdmin } = this.store
        return isAdmin !== 'first' && isAdmin ? 'member' : managers[0].comment
    }

    render() {
        const { managers, isAdmin} = this.store
        let currentRoute = this.getCurrentPath()

        return (
            <div className="homeRoot">
                <div className="navContent">
                    {isAdmin !== 'first' && <Menu
                        className="menu"
                        defaultOpenKeys={['0']}
                        onClick={this.handleClick}
                        style={{ width: 256 }}
                        mode="inline"
                        defaultSelectedKeys={[currentRoute]}
                    >   
                        {isAdmin && <Menu.Item key='member'><Link style={{ fontSize: '25px' }} to={`/home/member`}>用户管理</Link></Menu.Item>}
                        <SubMenu key={0} title={<div style={{ fontSize: '25px' }}>设备管理</div>}>
                        {
                            managers.map(item => {
                                return <Menu.Item style={{ fontSize: '25px' }} key={item.comment}><Link to={`/home/${item.comment}`}>{item.managerName}</Link></Menu.Item>
                            })
                        }
                        </SubMenu>
                    </Menu>}
                    <div className="homeBody">
                        <Switch>
                            {isAdmin !== 'first' && managers[0] && <Route exact path="/home/" component={() => <Redirect to={`/home/${this.redirectTo()}`} />} />}
                            {isAdmin && <Route exact path={`/home/member`} component={Member} />}
                            {
                                managers.map(item => this.renderRouter(item.comment))
                            }
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home
