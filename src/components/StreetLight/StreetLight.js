import React, { Component } from 'react'
import { Button, Popconfirm, Radio, message, Input} from 'antd'
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

const realTimeDataMap = [
    { name: 'PM2.5', value: 'PM25' },
    { name: 'PM10', value: 'PM10' },
    { name: '噪音', value: 'ns' },
    { name: '温度', value: 'tep' },
    { name: '湿度', value: 'hum' },
    { name: '光照', value: 'ill' },
    { name: '气压', value: 'pre' },
    // {name: '经度', value: 'Log'},
    // {name: '纬度', value: 'Lat'},
    // {name: '海拔', value: 'Alt'},
    // {name: '路灯状态', value: 'LIT'},
    // {name: '喷雾机状态', value: 'SPY'},
]

@inject('store') @observer
class StreetLight extends Component {
    constructor(props) {
        super(props)
        this.store = props.store.devicesStore
        this.state = {
            lights: [],
            lightStatusLoading: false,
            unit: '1',
            showType: 'attribute',
            visible: false,
            type: '',
            isAdmin: props.store.navStore.isAdmin,
            selectedIndex: 0,
            realDateType: 'PM25' 
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
            this.store.getRealTimeData(selectedIndex)
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

    handleSwitchChange = (light, attribute) => {
        this.store.handleSwitchChange(light, attribute).then(
            this.getLights()
        )
    }

    onClickDevice = index => {
        this.setState({
            selectedIndex: index
        })
        this.store.getEnvironmentData(index, this.state.unit)
        this.store.getRealTimeData(index)
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
        })
    }

    onClickShowType = (type, index) => {
        this.setState({
            showType: type
        })
        this.onClickDevice(index)
    }

    onClickRadio = e => {
        this.setState({
            realDateType: e.target.value
        })
    }

    render() {
        const { lights, environment, attribute, realTimeData, getEnvironmentData } = this.store
        const { visible, selectedIndex, realDateType, lightStatusLoading, isAdmin, unit, type, showType } = this.state
        const selectedDevice = lights[selectedIndex] || {}
        return <div className='lightRoot'>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="lightTitle">智慧路灯</div>
                {isAdmin !== 'first' && isAdmin && <div>
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
                    showType === 'attribute' ? attribute.length && selectedDevice && isAdmin === false || isAdmin === 'first' ?
                        <div className="lightSection">
                            <div>
                                <div className="realTimeData">
                                    {realTimeDataMap.map(item => <div className="realE" key={item.value}>{item.name}: {realTimeData[item.value]}</div>)}
                                </div>
                                <div>
                                    <h3>路灯</h3>
                                    <img width='20' src={realTimeData.LIT === '1' ? lightOpen : lightClose} className="lightStatus" />
                                    <Button
                                        size="small"
                                        disabled={realTimeData.LIT === '1'} type="primary" className="lightStatus" onClick={() => this.handleSwitchChange(attribute[1], 'light_id')}
                                    >
                                        开启
                                    </Button>
                                    <Button size="small"
                                        disabled={realTimeData.LIT !== '1'}
                                        type="primary"
                                        className="lightStatus"
                                        onClick={() => this.handleSwitchChange(attribute[1], 'light_id')}
                                    >
                                        关闭
                                    </Button>
                                </div>
                                <div>
                                    <h3>喷雾机</h3>
                                    <img width='20' src={realTimeData.SPY === '1' ? open : close} className="lightStatus" />
                                    <Button
                                        size="small"
                                        disabled={realTimeData.SPY === '1'} type="primary" className="lightStatus" onClick={() => this.handleSwitchChange(attribute[2], 'light_id')}
                                    >
                                        开启
                                    </Button>
                                    <Button size="small"
                                        disabled={realTimeData.SPY !== '1'}
                                        type="primary"
                                        className="lightStatus"
                                        onClick={() => this.handleSwitchChange(attribute[2], 'light_id')}
                                    >
                                        关闭
                                    </Button>
                                </div>
                                <div className="typeRadio">
                                    <Radio.Group value={realDateType} buttonStyle="solid" onChange={this.onClickRadio}>
                                        {realTimeDataMap.map(item => <Radio.Button key={item.value}  value={item.value}>{item.name}</Radio.Button>)}
                                    </Radio.Group>
                                    <div className='inputUnit'>
                                        <div>间隔： </div><Input type='number'className='numberInput' onChange={this.onUnitValueChange} value={unit}/>
                                        <Button type="primary" onClick={() => getEnvironmentData(selectedIndex, unit)}>确定</Button>
                                    </div>
                                </div>
                                <Chart environment={environment} type={realDateType} />
                            </div>
                        </div> : (<div>
                            {attribute && attribute.map(item => <div className="deviceIds">
                                <div className="attributeIds">{item.attributeName} ID: {item.attributeNo}</div>
                            </div>)}
                        </div>) :
                        <div className="attribute">
                            <Map lng={realTimeData.Log} lat={realTimeData.Lat}/>
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