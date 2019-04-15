import React, { Component } from 'react'
import { Slider, Button, Popconfirm, Radio, message } from 'antd'
import lightOpen from '../../images/light_open.svg'
import open from '../../images/open.svg'
import close from '../../images/close.svg'
import map from '../../images/map.svg'
import attributeIcon from '../../images/attribute.svg'
import lightClose from '../../images/light_close.svg'
import { inject, observer } from 'mobx-react'
import DevicesModal from './components/DevicesModal'
import Chart from './components/Chart'
import Map from '../../Map'
import './StreetLight.css'

@inject('store') @observer
class StreetLight extends Component {
    constructor(props) {
        super(props)
        this.store = props.store.devicesStore
        this.state = {
            lights: [],
            lightStatusLoading: false,
            unit: '5',
            showType: 'attribute',
            visible: false,
            type: '',
            isAdmin: props.store.navStore.isAdmin === true,
            selectedIndex: 0,
        }
    }

    componentDidMount() {
        this.getLights()
        this.dataInterval = setInterval(this.store.getEnvironmentData, 1000 * 60 * 10)
    }

    componentWillUnmount() {
        clearInterval(this.dataInterval)
    }

    getLights = () => {
        const { selectedIndex, unit } = this.state
        this.store.getLights().then(() => {
            this.store.getEnvironmentData(selectedIndex, unit)
            this.store.getAttribute(selectedIndex)
        })
    }

    deleteDevice = () => {
        this.store.deleteDevice(this.state.selectedIndex).then(() => {
            this.setState({
                selectedIndex: 0
            }, this.getLights)
            message.success('删除成功')
        })
    }

    handleSliderChange = (value, light, attribute) => {
        this.store.handleSliderChange(value, light, attribute).then(
            this.getLights()
        )
    }

    handleSwitchChange = (status, light, attribute) => {
        this.store.handleSwitchChange(status, light, attribute).then(
            this.getLights()
        )
    }

    onClickDevice = index => {
        this.setState({
            selectedIndex: index
        })
        this.store.getEnvironmentData(index, this.state.unit)
        this.store.getAttribute(index)
    }

    handleOk = (value) => {
        this.setState({
            confirmLoading: this
        })
        const path = this.props.location.pathname.split('/')[2]
        if (this.state.type === 'add') {
            this.store.addLight(value, path).then(
                () => {
                    this.setState({
                        visible: false,
                        confirmLoading: false,
                    })
                    message.success('添加成功')
                    this.getLights()
                }
            )
        } else {
            this.store.editLight(value, path, this.state.selectedIndex).then(
                () => {
                    this.setState({
                        visible: false,
                        confirmLoading: false,
                    })
                    message.success('修改成功')
                    this.getLights()
                }
            )
        }
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        })
    }

    showModal = () => {
        this.setState({
            visible: true,
            type: 'add'
        })
    }

    editLight = () => {
        this.setState({
            visible: true,
            type: 'edit'
        })
    }

    onUnitValueChange = e => {
        this.setState({
            unit: e.target.value
        }, this.store.getEnvironmentData)
    }

    onClickShowType = (type, index) => {
        this.setState({
            showType: type
        })
        this.onClickDevice(index)
    }

    render() {
        const { lights, environment, attribute } = this.store
        const { visible, selectedIndex, lightStatusLoading, isAdmin, unit, type, showType } = this.state
        const selectedDevice = lights[selectedIndex] || {}
        return <div className='lightRoot'>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="lightTitle">智慧路灯</div>
                {isAdmin && <div>
                    <Popconfirm placement="bottom" title="确认删除" onConfirm={() => this.deleteDevice()} okText="确定" cancelText="取消">
                        <Button size="small" type="primary">删除</Button>
                    </Popconfirm>
                    <Button onClick={this.editLight} className="addButton" size="small" type="primary">编辑</Button>
                    <Button onClick={this.showModal} className="addButton" size="small" type="primary">添加</Button>
                </div>}
            </div>
            <div className="lightContent">
                <div>
                    {
                        lights.map((item, index) => (
                            <div className={`device ${selectedIndex === index ? 'light selectedDevice ' : 'light'}`} key={item.id}>
                                <div onClick={() => this.onClickDevice(index)}>
                                    {item.deviceName}
                                </div>
                                <img onClick={() => this.onClickShowType('attribute', index)} height={30} width={30} src={attributeIcon} />
                                <img onClick={() => this.onClickShowType('map', index)} height={20} width={20} src={map} />
                            </div>
                        ))
                    }
                </div>
                {
                    showType === 'attribute' ? attribute.length && selectedDevice && !isAdmin ?
                        <div className="lightSection">
                            <h4>{selectedDevice.device_name}</h4>
                            <div>
                                <Radio.Group onChange={this.onUnitValueChange} value={unit} buttonStyle="solid">
                                    <Radio.Button value="5">5 分钟</Radio.Button>
                                    <Radio.Button value="60">1 小时</Radio.Button>
                                </Radio.Group>
                            </div>
                            <div className="environment">
                                <Chart environment={environment} />
                            </div>
                            <div className="statusSection">
                                <h3>路灯</h3>
                                <div>
                                    <img width='20' src={attribute[1].status === '1' ? lightOpen : lightClose} className="lightStatus" />
                                    <Button loading={lightStatusLoading} size="small" disabled={attribute[1].status === '1'} type="primary" className="lightStatus" onClick={() => this.handleSwitchChange(true, attribute[1], 'light_id')}>开启</Button>
                                    <Button loading={lightStatusLoading} size="small" disabled={attribute[1].status === '0'} type="primary" className="lightStatus" onClick={() => this.handleSwitchChange(false, attribute[1], 'light_id')}>关闭</Button>
                                </div>
                                <div className="streetLightSlider">亮度<Slider className="lightSlider" onChange={value => this.handleSliderChange(value, attribute[1], 'light_id')} value={attribute[1].value} /></div>
                            </div>
                            <div>
                                <h4>喷雾机</h4>
                                <div>
                                    <img width='20' src={attribute[2].status === '1' ? open : close} className="lightStatus" />
                                    <Button size="small" disabled={attribute[2].status === '1'} type="primary" className="lightStatus" onClick={() => this.handleSwitchChange(true, attribute[2], 'sprayer_id')}>开启</Button>
                                    <Button size="small" disabled={attribute[2].status === '0'} type="primary" className="lightStatus" onClick={() => this.handleSwitchChange(false, attribute[2], 'sprayer_id')}>关闭</Button>
                                </div>
                            </div>
                        </div> : (<div>
                            {attribute && attribute.map(item => <div className="deviceIds">
                                <div className="attributeIds">{item.attributeName} ID: {item.attributeNo}</div>
                            </div>)}
                        </div>) :
                        <div className="attribute">
                            <Map />
                        </div>
                }
            </div>
            <DevicesModal
                title={type === 'add' ? "添加设备" : '编辑设备'}
                value={type === 'edit' ? {
                    deviceName: selectedDevice.deviceName,
                    environmentId: attribute[0].attributeNo,
                    lightId: attribute[1].attributeNo,
                    sprayerId: attribute[2].attributeNo,
                } : {}}
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            />
        </div>
    }
}

export default StreetLight