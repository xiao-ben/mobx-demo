import React, { Component } from 'react'
import { Table, Tag, Button, Popconfirm } from 'antd'
import DevicesModal from './components/DevicesModal'
import { inject, observer } from 'mobx-react';
import './Devices.css'

@inject('store') @observer
class Devices extends Component {
  constructor(props) {
    super(props)
    this.store = props.store.devicesStore
    this.state = {
      value: {},
      visible: false,
      confirmLoading: false,
    }
  }

  componentDidMount() {
    this.store.getDeviceTypes()
    this.store.getDevices()
  }

  showModal = () => {
    this.setState({
      visible: true,
      title: '添加设备',
      value: {}
    })
  }

  handleOk = (value) => {
    this.setState({
      confirmLoading: true,
    })
    if (this.state.title === "编辑设备") {
        this.store.editDevices(value)
    } else {
        this.store.addDevices(value)
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
      title: '编辑设备',
      value,
    })
  }

  onDelete = value => {
    this.store.deleteDevices(value)
  }

  render() {
    const { visible, confirmLoading, value, title } = this.state
    const { deviceTypes } = this.store
    const columns = [{
      title: '设备 ID',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '名称',
      key: 'deviceName',
      dataIndex: 'deviceName',
      render: text => (
           <Tag color="blue">{text}</Tag>
      ),
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          {/* <a href="javascript:" onClick={() => this.handleEdit(record)}>编辑</a>
          <Divider type="vertical" /> */}
          <Popconfirm placement="bottom" title="确认删除" onConfirm={() => this.onDelete(record)} okText="确定" cancelText="取消">
            <a href="javascript:">删除</a>
          </Popconfirm>
        </span>
      ),
    }]
    return (
      <div>
        <div className="devicesTitleSection">
          <div className="devicesTitle">设备管理</div>
          <Button type="primary" onClick={this.showModal}>
            添加设备
          </Button>
        </div>
        <Table columns={columns} dataSource={[...this.store.devicesDate]} />
        <DevicesModal 
          title={title}
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          value={value}
          types={deviceTypes}
        />
      </div>
    )
  }
}

export default Devices