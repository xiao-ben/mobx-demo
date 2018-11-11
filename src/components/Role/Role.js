import React, { Component } from 'react'
import { Table, Divider, Tag, Button  } from 'antd'
import RoleModal from './components/RoleModal'
import './Role.css'

const data = [{
  key: '1',
  roleName: '路灯',
  rights: ['role', 'member'],
}]

class Role extends Component {
  state = {
    value: {},
    visible: false,
    confirmLoading: false,
  }

  showModal = () => {
    this.setState({
      visible: true,
      title: '添加角色',
      value: {}
    })
  }

  handleOk = (value) => {
    console.log(value, 'value')
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    })
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      })
    }, 2000)
  }

  handleCancel = () => {
    console.log('Clicked cancel button')
    this.setState({
      visible: false,
    })
  }

  handleEdit = value => {
    console.log(value, 'edit')
    this.setState({
      visible: true,
      title: '编辑角色',
      value,
    })
  }

  render() {
    const { visible, confirmLoading, value, title } = this.state
    const columns = [{
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
    }, {
      title: '权限',
      key: 'rights',
      dataIndex: 'rights',
      render: rights => (
        <span>
          {rights.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
        </span>
      ),
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:" onClick={() => this.handleEdit(record)}>编辑</a>
          <Divider type="vertical" />
          <a href="javascript:">删除</a>
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
        <Table columns={columns} dataSource={data} />
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