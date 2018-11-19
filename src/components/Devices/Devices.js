import React, { Component } from 'react'
import { Table, Divider, Tag, Button  } from 'antd'
import DevicesModal from './components/DevicesModal'
import { inject, observer } from 'mobx-react';
import './Devices.css'

const DevicesMapToName = {
    streetLight: '路灯'
}

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

  showModal = () => {
    this.setState({
      visible: true,
      title: '添加设备',
      value: {}
    })
  }

  handleOk = (value) => {
    console.log(value, 'value')
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
      title: '编辑设备',
      value,
    })
  }

  onDelete = value => {
    this.store.deleteDevices(value)
  }

  render() {
    const { visible, confirmLoading, value, title } = this.state
    console.log(this.store.devicesDate, 'store')
    const columns = [{
      title: '设备 ID',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '权限',
      key: 'devicesName',
      dataIndex: 'devicesName',
      render: text => (
           <Tag color="blue">{DevicesMapToName[text]}</Tag>
      ),
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:" onClick={() => this.handleEdit(record)}>编辑</a>
          <Divider type="vertical" />
          <a href="javascript:" onClick={() => this.onDelete(record)}>删除</a>
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
        />
      </div>
    )
  }
}

export default Devices