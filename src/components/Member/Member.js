import React, { Component } from 'react'
import { Table, Divider, Tag, Button, Popconfirm } from 'antd'
import MemberModal from './components/MemberModal'
import { inject, observer } from 'mobx-react';
import './Member.css'

@inject('store') @observer
class Member extends Component {
  constructor(props) {
    super(props)
    this.store = props.store.memberStore
    this.state = {
      value: {},
      visible: false
    }
  }

  componentDidMount() {
    this.store.getRole()
    this.store.getMember()
  }

  showModal = () => {
    this.setState({
      visible: true,
      title: '添加用户',
      value: {}
    })
  }

  handleOk = (value, callback) => {
    if(this.state.title === "添加用户") {
      this.store.addmember(value).then(() => {
        this.closeModal()
        callback()
      })
    } else {
      this.store.editMember(value).then(() => {
        this.closeModal()
        callback()
      })
    }
  }

  closeModal = () => {
    this.setState({
      visible: false,
      value: {}
    })
  }

  handleEdit = value => {
    this.setState({
      visible: true,
      title: '编辑用户',
      value,
    })
  }

  onDelete = value => {
    this.store.deletemember(value)
  }

  render() {
    const { visible, value, title } = this.state
    const { memberDate, loading, roleData } = this.store 

    const columns = roleData ? [{
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName',
    }, {
      title: '权限',
      key: 'managers',
      dataIndex: 'managers',
      render: manager => (
        <span>
          {manager.map(tag => {
            const role = roleData.find(item => item.id === tag.managerId.toString())
            return <Tag color="blue" key={tag.id}>{role ? role.managerName : tag.id}</Tag>}
            )}
        </span>
      ),
    }, {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <span>
          <a href="javascript:" onClick={() => this.handleEdit(record)}>编辑</a>
          <Divider type="vertical" />
          <Popconfirm placement="bottom" title="确认删除" onConfirm={() => this.onDelete(record)} okText="确定" cancelText="取消">
            <a href="javascript:">删除</a>
          </Popconfirm>
        </span>
      ),
    }] : []
    return (
      roleData && <div className='memberTable'>
        <div className="memberTitleSection">
          <div className="memberTitle">用户管理</div>
          <Button type="primary" onClick={this.showModal}>
            添加用户
          </Button>
        </div>
        <Table columns={columns} dataSource={memberDate} />
        <MemberModal 
          title={title}
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={loading}
          onCancel={this.closeModal}
          value={value}
          roles={roleData}
        />
      </div>
    )
  }
}

export default Member