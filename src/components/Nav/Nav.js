import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Icon, Popconfirm, message } from 'antd'
import './TopNavBar.css'

@inject('store') @observer
class Nav extends Component {
    constructor(props) {
        super(props)
        this.store = props.store.navStore
    }

    confirm = () => {
        message.info('退出成功')
    }


    render() {
        return (
            <div className="navWrap">
                <div className="topNavBar">
                    <div>智慧路灯</div>
                    <Popconfirm placement="bottom" title="退出登录" onConfirm={this.confirm} okText="是" cancelText="否">
                        <div><Icon type="user" style={{ color: '#fff', fontSize: '30', marginRight: '10px' }} />xiaoben</div>    
                    </Popconfirm>
                </div>
            </div>
        )
    }
}

export default Nav;
