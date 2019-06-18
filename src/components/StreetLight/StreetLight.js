import React, { Component } from 'react'
import { Button, Popconfirm, Radio, message, Input, TimePicker, Checkbox, InputNumber, Select} from 'antd'
import moment from 'moment'
import lightOpen from '../../images/light_open.svg'
import open from '../../images/open.svg'
import close from '../../images/close.svg'
import map from '../../images/map.svg'
import wifi from '../../images/wifi.svg'
import wifiClose from '../../images/wifiClose.svg'
import attributeIcon from '../../images/attribute.svg'
import lightClose from '../../images/light_close.svg'
import { inject, observer } from 'mobx-react'
import DevicesModal from './components/DevicesModal'
import Chart from './components/Chart'
import Map from '../../Map'
import './StreetLight.css'

const realTimeDataMap = [
    { name: 'PM2.5', value: 'P25', unit: '' },
    { name: 'PM10', value: 'P10', unit: '' },
    { name: '噪音', value: 'ns', unit: 'dB' },
    { name: '温度', value: 'tep', unit: '℃' },
    { name: '湿度', value: 'hum', unit: '%' },
    { name: '光照', value: 'ill', unit: 'Lx' },
    { name: '气压', value: 'pre', unit: 'hpa' },
    // {name: '经度', value: 'Log'},
    // {name: '纬度', value: 'Lat'},
    // {name: '海拔', value: 'Alt'},
    // {name: '路灯状态', value: 'LP'},
    // {name: '喷雾机状态', value: 'SPY'},
]

const RadioGroup = Radio.Group
const { Option } = Select

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
            selectedIndex: 0,
            realDateType: 'P25',
            lightType: 0, 
            mapType: 'single'
        }
    }

    componentDidMount() {
        this.getLights()
        this.dataInterval = setInterval(() => {
            this.store.getRealTimeData(this.state.selectedIndex)
        }, 1000 * 10)
    }

    componentWillUnmount() {
        this.dataInterval && clearInterval(this.dataInterval)
    }

    getLights = () => {
        const { selectedIndex, unit } = this.state
        this.store.getLights().then(() => {
            this.store.getEnvironmentData(selectedIndex, unit)
            this.store.getRealTimeData(selectedIndex).then(
                res => {
                    this.setState({
                    lightType: res.MD
                })}
            )
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
            showType: type,
            mapType: index === 0 || index ? 'single' : 'all'
        })
        if(index === 0 || index) {
            this.onClickDevice(index)
        }
    }

    onSelectValueChange = value => {
        this.setState({
            realDateType: value
        })
    }

    onlightTypeChange = e => {
        this.setState({
            lightType: e.target.value
        })
    }

    onTimeChange = (value, type) => {
        this.setState({
            [type]: value.format('HH:mm:ss')
        })
    }

    onSameDayChange = e => {
        console.log(e.target.value, 'value')
        this.setState({
            sameDay: e.target.checked
        })
    }

    onAtTimeClick = light => {
        const {sameDay, closeTime, openTime} = this.state
        this.store.changeLightContarl({
            deviceId: light.deviceId,
            sameDay,
            closeTime,
            openTime
        }, 2).then(() => {
            message.success('设置成功')
        })
    }

    onIllClick = light => {
        const {ill} = this.state
        this.store.changeLightContarl({
            deviceId: light.deviceId,
            ill
        }, 3).then(() => {
            message.success('设置成功')
        })
    }

    render() {
        const { lights, environment, attribute, realTimeData, getEnvironmentData } = this.store
        const { isAdmin } = this.props.store.navStore
        const { visible, selectedIndex, realDateType, lightStatusLoading, unit, type, showType, lightType, mapType } = this.state

        const selectedDevice = lights[selectedIndex] || {}
        return <div className='lightRoot'>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="lightTitle">
                    智慧路灯
                    <img onClick={() => this.onClickShowType('map')} height={20} width={20} src={map} />
                </div>
                {isAdmin !== 'first' && isAdmin && <div>
                    <Popconfirm placement="bottom" title="确认删除" onConfirm={() => this.deleteDevice()} okText="确定" cancelText="取消">
                        <Button  type="primary">删除</Button>
                    </Popconfirm>
                    <Button onClick={this.editLight} className="addButton"  type="primary">编辑</Button>
                    <Button onClick={this.showModal} className="addButton"  type="primary">添加</Button>
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
                                <div className='section'>
                                    <h3 className="sectionTitle">实时环境监测</h3>
                                    <div className="realTimeData">
                                        {realTimeDataMap.map(item => <div className="realE" key={item.value}>
                                            <div>{item.name}</div> 
                                            {realTimeData[item.value] ? <div>{realTimeData[item.value]} {item.unit}</div> : <div>无数据</div>}
                                        </div>)
                                        }
                                    </div>
                                </div>
                                <div className='section'>
                                    <h3 className="sectionTitle">联网状态</h3>
                                    <img width='20' src={realTimeData.NET === '1' ? wifi : wifiClose} className="lightStatus" />
                                </div>
                                <div className='section'>
                                    <h3 className="sectionTitle">路灯控制 <img width='20' src={realTimeData.LP === 1 ? lightOpen : lightClose} className="lightStatus" /></h3>
                                    { realTimeData['MD'] !== undefined && <RadioGroup onChange={this.onlightTypeChange} defaultValue={realTimeData['MD']} key={realTimeData['MD']}>
                                        <div className='lightType'>
                                        <Radio value={0}>
                                            远程手动控制：
                                            <Button
                                                disabled={lightType !== 0 || realTimeData.LP === 1} type="primary" className="lightStatus" onClick={() => this.handleSwitchChange(attribute[1], 'light_id')}
                                            >
                                                开启
                                            </Button>
                                            <Button 
                                                disabled={lightType !== 0 || realTimeData.LP !== 1}
                                                type="primary"
                                                className="lightStatus"
                                                onClick={() => this.handleSwitchChange(attribute[1], 'light_id')}
                                            >
                                                关闭
                                            </Button>
                                        </Radio>
                                        </div>
                                        <div className='lightType'>
                                            <Radio value={1}>
                                               定时控制：
                                               开：<TimePicker onChange={value => this.onTimeChange(value, 'openTime')} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                                               关：<TimePicker onChange={value => this.onTimeChange(value, 'closeTime')} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                                               <Checkbox onChange={this.onSameDayChange} style={{marginLeft: 10}}>加一天</Checkbox>
                                               <Button type="primary" disabled={lightType !== 1} style={{marginLeft: 10}} onClick={() => this.onAtTimeClick(attribute[1])}>确定</Button>
                                            </Radio>
                                        </div>
                                        <div className='lightType'>
                                            <Radio value={3}>
                                               {'光照控制：光照 <='} <InputNumber style={{width: 100, marginRight: 10}} onChange={value => this.setState({ill: value})} />
                                               <Button type="primary" disabled={lightType !== 3} onClick={() => this.onIllClick(attribute[1])}>确定</Button>
                                            </Radio>
                                        </div>
                                    </RadioGroup>}
                                </div>
                                <div className='section'>
                                    <h3 className="sectionTitle">喷雾器控制<img width='20' style={{marginLeft: 10}} src={realTimeData.SPY === 1 ? open : close} className="lightStatus" /></h3>
                                    <Button
                                        disabled={realTimeData.SPY === 1} type="primary" className="lightStatus" onClick={() => this.handleSwitchChange(attribute[2], 'light_id')}
                                    >
                                        开启
                                    </Button>
                                    <Button 
                                        disabled={realTimeData.SPY !== 1}
                                        type="primary"
                                        className="lightStatus"
                                        onClick={() => this.handleSwitchChange(attribute[2], 'light_id')}
                                    >
                                        关闭
                                    </Button>
                                </div>
                                <div className="section">
                                    <h3 className="sectionTitle">环境监测历史曲线</h3>
                                    <div className="typeRadio">
                                        <Select value={realDateType} style={{ width: 150 }} onChange={this.onSelectValueChange}>
                                            {realTimeDataMap.map(item => <Option  key={item.value}  value={item.value}>{item.name}</Option>)}
                                        </Select>
                                        <div className='inputUnit'>
                                            <div>间隔： </div><Input type='number' style={{ width: 150 }} className='numberInput' onChange={this.onUnitValueChange} value={unit}/>
                                            <Button type="primary" onClick={() => getEnvironmentData(selectedIndex, unit)}>确定</Button>
                                        </div>
                                    </div>
                                    <Chart environment={environment} type={realDateType} />
                                </div>
                            </div>
                        </div> : (<div>
                            {attribute && attribute.map(item => <div className="deviceIds">
                                <div className="attributeIds">{item.attributeName} ID: {item.attributeNo}</div>
                            </div>)}
                        </div>) :
                        <div className="attribute">
                            <Map lng={realTimeData.Log} lat={realTimeData.Lat} lights={lights} mapType={mapType} name={lights[selectedIndex].deviceName} />
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