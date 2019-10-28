import React, { Component } from 'react'
import { Menu } from 'antd'
import { Route, Switch, Link, withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import Member from '../Member/Member'
import StreetLight from '../StreetLight/StreetLight'
import './Home.css'

const SubMenu = Menu.SubMenu;

@inject('store') @withRouter @observer
class Home extends Component {
  constructor(props) {
    super(props)
    this.store = props.store.navStore
  }

  componentDidMount() {
    const { getName, getManagers } = this.store
    const { history } = this.props
    Promise.all([getName(), getManagers()]).then(
      ([isAdmin, managers]) => {
        if (history.location.path !== '/home') {
          // 是否是管理员进行路由跳转
          history.push(isAdmin ? '/home/member' : managers[0].comment)
        }
      }
    )
  }

  renderRouter(manager) {
    switch (manager) {
      case 'streetLight':
        return <Route exact key={manager} path={`/home/streetLight`} component={StreetLight} />
      default:
        return null
    }
  }

  render() {
    const { managers, isAdmin } = this.store
    const { history: { location: { pathname } } } = this.props
    let currentRoute = pathname.split('/')[2]
    return (
      <div className="homeRoot">
        <div className="navContent">
          <Menu
            className="menu"
            onClick={this.handleClick}
            mode="inline"
            key={currentRoute}
            defaultOpenKeys={['0']}
            defaultSelectedKeys={[currentRoute]}
          >
            {
              isAdmin &&
              <Menu.Item key='member'>
                <Link className='linkItem' to={`/home/member`}>用户管理</Link>
              </Menu.Item>
            }
            <SubMenu key={0} title={<div className='linkItem'>设备管理</div>}>
              {
                managers.map(item => (
                  <Menu.Item key={item.comment}>
                    <Link className='linkItem' to={`/home/${item.comment}`}>{item.managerName}</Link>
                  </Menu.Item>
                ))
              }
            </SubMenu>
          </Menu>
          <div className="homeBody">
            <Switch>
              {isAdmin && <Route exact path={`/home/member`} component={Member} />}
              {managers.map(item => this.renderRouter(item.comment))}
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
