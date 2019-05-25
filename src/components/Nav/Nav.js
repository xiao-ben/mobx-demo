import React, { Component } from 'react'
import { withRouter } from "react-router"
import { inject, observer } from 'mobx-react'
import { Icon, Popconfirm, message } from 'antd'
import Cookies from 'js-cookie'
import './TopNavBar.css'

@inject('store') @withRouter @observer 
class Nav extends Component {
    constructor(props) {
        super(props)
        this.store = props.store.navStore
    }

    componentWillMount() {
        this.store.getName()
    }

    confirm = () => {
        Cookies.remove('L_USM')
        message.info('退出成功')
        this.props.history.push('/')
    }


    render() {
        return (
            <div className="navWrap">
                <div className="topNavBar">
                    <div><img src={require("../../images/logo.jpg")} className="logo" />智慧路灯</div>
                    <Popconfirm placement="bottom" title="退出登录" onConfirm={this.confirm} okText="是" cancelText="否">
                        <div><Icon type="user" style={{ color: '#fff', fontSize: '30', marginRight: '10px' }} />{this.store.name || ''}</div>
                    </Popconfirm>
                </div>
            </div>
        )
    }
}

export default Nav;
