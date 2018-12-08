import React, { Component } from 'react'
import { Table, Divider, Tag, Button, Popconfirm, message } from 'antd'
import RoleModal from './components/RoleModal'
import { inject, observer } from 'mobx-react';
import './Role.css'

@inject('store') @observer
class Role extends Component {
  constructor(props) {
    super(props)
    this.store = props.store.roleStore
    this.state = {
      value: {},
      visible: false,
      confirmLoading: false,
    }
  }

  componentDidMount() {
    this.store.getRole()
  }

  showModal = () => {
    this.setState({
      visible: true,
      title: '添加角色',
      value: {}
    })
  }

  handleOk = (value) => {
    this.setState({
      confirmLoading: true,
    })
    if (this.state.title === "添加角色") {
      this.store.addRole(value)
    } else {
      this.store.editRole(value)
    }
    
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      })
    }, 1000)
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }

  handleEdit = value => {
    this.setState({
      visible: true,
      title: '编辑角色',
      value,
    })
  }

  onDelete = value => {
    this.store.deleteRole(value)
    message.info('删除成功')
  }

  render() {
    const { visible, confirmLoading, value, title } = this.state
    const columns = [{
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
    }, {
      title: '权限',
      key: 'manager',
      dataIndex: 'manager',
      render: manager => (
        <span>
          {manager.map((tag,index) => {
            return <Tag color="blue" key={index}>{tag && tag.manager_name ? tag.manager_name : ''}</Tag>})}
        </span>
      ),
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:" onClick={() => this.handleEdit(record)}>编辑</a>
          <Divider type="vertical" />
          <Popconfirm placement="bottom" title="确认删除" onConfirm={() => this.onDelete(record)} okText="确定" cancelText="取消">
            <a href="javascript:">删除</a>
          </Popconfirm>
        </span>
      ),
    }]
    return (
      <div>
        <div className="roleTitleSection">
          <div className="roleTitle">角色管理</div>
          <Button type="primary" onClick={this.showModal}>
            添加角色
          </Button>
        </div>
        <Table columns={columns} dataSource={[...this.store.roleDate]} />
        <RoleModal 
          title={title}
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          value={value}
        />
      </div>
    )
  }
}

export default Role