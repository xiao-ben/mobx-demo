import React, { Component } from 'react'
import { Table, Divider, Tag, Button, Popconfirm, message} from 'antd'
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
      visible: false,
      confirmLoading: false,
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

  handleOk = (value) => {
    this.setState({
      confirmLoading: true,
    })
    if(this.state.title === "添加用户") {
      this.store.addmember(value)
    } else {
      this.store.editMember(value)
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
      title: '编辑用户',
      value,
    })
  }

  onDelete = value => {
    this.store.deletemember(value)
    message.info('删除成功')
  }

  render() {
    const { visible, confirmLoading, value, title } = this.state
    const { roleDate } = this.store 
    const columns = roleDate ? [{
      title: '用户名称',
      dataIndex: 'memberName',
      key: 'memberName',
    }, {
      title: '角色',
      key: 'manager',
      dataIndex: 'manager',
      render: manager => (
        <span>
          {manager.map((tag, index) => {
            const role = roleDate.find(item => item.key === tag.id.toString())
            return <Tag color="blue" key={tag.index}>{role ? role.roleName : ''}</Tag>}
            )}
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
    }] : []
    return (
      roleDate && <div>
        <div className="memberTitleSection">
          <div className="memberTitle">用户管理</div>
          <Button type="primary" onClick={this.showModal}>
            添加用户
          </Button>
        </div>
        <Table columns={columns} dataSource={[...this.store.memberDate]} />
        <MemberModal 
          title={title}
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          value={value}
          roles={roleDate}
        />
      </div>
    )
  }
}

export default Member