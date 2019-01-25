import React, { Component } from 'react'
import { Slider, Button, Popconfirm, Radio } from 'antd'
import lightOpen from '../../images/light_open.svg'
import open from '../../images/open.svg'
import close from '../../images/close.svg'
import lightClose from '../../images/light_close.svg'
import axios from '../../lib/http'
import DevicesModal from './components/DevicesModal'
import ReactEcharts from 'echarts-for-react';
import moment from 'moment'
import './StreetLight.css'

class StreetLight extends Component {
    state = {
        lights: [],
        sprayers: [],
        selectedDevice: null,
        selectedSprayers: {},
        lightStatusLoading: false,
        unit: '5',
        visible: false,
        attribute: [],
        type: '',
        user: {
            manager: '1'
        },
        environment: []
    }

    componentDidMount() {
        this.getLights()
        axios('/smart_site/account/get-login-name').then(
            res => {
                if (!res.data.data) return
                this.setState({
                    user: res.data.data
                })
            }
        )
        this.dataInterval = setInterval(this.getEnvironmentDate, 1000 * 60 * 10)
    }

    componentWillUnmount() {
        clearInterval(this.dataInterval)
    }

    getEnvironmentDate = () => {
        axios('/smart_site/devices/get-monitor-data', {
            method: 'post',
            data: {
                device_name: this.state.selectedDevice.device_name,
                unit: this.state.unit
            }
        }).then(res => {
            if (!res || !res.data || !res.data.data) return
            const data = res.data.data
            this.setState({
                environment: {
                    ...res.data.data,
                    legend: res.data.data.legend,
                    time: res.data.data.time.map(time => moment(time * 1000).format('HH:mm')),
                    data: res.data.data.data
                } 
            })
        })
    }

    getLights = () => {
        axios(`/smart_site/devices/get-device-list`, {
            method: 'post',
            data: {
                manager_comment: 'streetLight',
            }
        }).then(
            res => {
                if (!res.data.data) return
                this.setState({
                    lights: res.data.data,
                    selectedDevice: this.state.selectedDevice ? this.state.selectedDevice : res.data.data[0] || {}
                }, this.getEnvironmentDate)
                this.getAttribute(this.state.selectedDevice.id ? this.state.selectedDevice.id : res.data.data[0] ? res.data.data[0].id : '')
            }
        )
    }

    handleSwitchChange = (status, light, attribute) => {
        axios('/smart_site/devices/reset-device-attribute', {
            method: 'post',
            data: {
                attribute,
                device_id: light.device_id,
                status: status ? '1' : '0',
                value: light.value
            }
        }).then(
            res => {
                if (!res.data.data) return
                this.getLights()
            }
        )
    }

    deleteDevice = () => {
        axios('/smart_site/devices/delete-device', {
            method: 'post',
            data: {
                device_id: this.state.selectedDevice.id
            }
        }).then(
            () => {
                this.getLights()
            }
        )
    }

    handleSliderChange = (value, light, attribute) => {
        axios('/smart_site/devices/reset-device-attribute', {
            method: 'post',
            data: {
                attribute,
                device_id: light.device_id,
                value: value
            }
        }).then(
            res => {
                if (!res.data.data) return
                this.getLights()
            }
        )
    }

    onClickDevice = item => {
        this.setState({
            selectedDevice: item
        }, this.getEnvironmentDate)
        this.getAttribute(item.id)
    }

    getAttribute = (id) => {
        axios('/smart_site/devices/get-attribute-list', {
            method: 'post',
            data: {
                device_id: id
            }
        }).then(
            res => {
                this.setState({
                    attribute: res.data.data
                })
            }
        )
    }

    handleOk = (value) => {
        if (this.state.type === 'add') {
            axios('/smart_site/devices/add-device', {
                method: 'post',
                data: {
                    ...value,
                    manager_comment: this.props.location.pathname.split('/')[2]
                }
            }).then(
                () => {
                    this.setState({
                        visible: false,
                        confirmLoading: false,
                    })
                    this.getLights()
                }
            )
        } else {
            axios('/smart_site/devices/reset-device', {
                method: 'post',
                data: {
                    ...value,                    
                    device_id: this.state.selectedDevice.id,
                    manager_comment: this.props.location.pathname.split('/')[2]
                }
            }).then(
                () => {
                    this.setState({
                        visible: false,
                        confirmLoading: false,
                    })
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
        }, this.getEnvironmentDate)
    }

    render() {
        const { visible, selectedDevice, attribute, lightStatusLoading, environment, user, unit, type} = this.state
        return <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="lightTitle">智慧路灯</div>
                {user.manager === '1' && <div>
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
                        this.state.lights.map(item => (
                            <div className="light" key={item.id}>
                                <div className={`device ${selectedDevice.id === item.id ? 'selectedDevice' : ''}`} onClick={() => this.onClickDevice(item)}>{item.device_name}</div>
                            </div>
                        ))
                    }
                </div>
                {attribute.length && selectedDevice && user.manager === '0' ? <div className="lightSection">
                    <h4>{selectedDevice.device_name}</h4>
                    <div>
                        <Radio.Group onChange={this.onUnitValueChange} value={unit} buttonStyle="solid">
                            <Radio.Button value="5">5 分钟</Radio.Button>
                            <Radio.Button value="60">1 小时</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div className="environment">
                    
                            <ReactEcharts
                                option={{
                                    title: {
                                        text: environment.device_id
                                    },
                                    tooltip: {
                                        trigger: 'axis',
                                        formatter: function (params) {
                                            let result = ''
                                            params.map((item, index) => ({
                                                ...item,
                                                index: index
                                            })).sort((a, b) => b.value - a.value).forEach(function (col) {
                                                result += col.marker + " " + col.seriesName + " : " + col.value + environment.unit[col.index] + "</br>";
                                            });
                                            return result;
                                        }
                                        // formatter: `{b} <br/>` + item.unit.map((unit, index) => `{a${index}} : {c${index}} ${unit}<br/>`).join('')
                                    },
                                    legend: {
                                        data: environment.legend
                                    },
                                    grid: {
                                        left: '3%',
                                        right: '4%',
                                        bottom: '3%',
                                        containLabel: true
                                    },
                                    xAxis: {
                                        type: 'category',
                                        boundaryGap: false,
                                        data: environment.time
                                    },
                                    yAxis: {
                                        type: 'value'
                                    },
                                    series: (environment.data || []).map((data, index) => ({
                                        name: environment.legend[index],
                                        type: 'line',
                                        stack: '总量',
                                        data: data
                                    }))
                                }}
                                notMerge={true}
                                lazyUpdate={true}
                                theme={"theme_name"}
                                onChartReady={this.onChartReadyCallback}
                                // onEvents={EventsDict}
                                opts={{}} />
                        
                        {/* <div>温度：</div>
                        <div>湿度：</div>
                        <div>PM 2.5：</div>
                        <div>PM 10：</div>
                        <div>光照：</div>
                        <div>噪音：</div>
                        <div>大气压强：</div> */}
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
                </div> : <div>
                        {attribute && attribute.map(item => <div className="deviceIds">
                            <div className="attributeIds">{item.attribute_name} ID: {item.attribute_no}</div>
                        </div>)}
                    </div>}
            </div>
            <DevicesModal
                title={type === 'add' ? "添加设备" : '编辑设备'}
                value={type === 'edit' ? selectedDevice && attribute.length ? {
                    device_name: selectedDevice.device_name,
                    environment_id: attribute[0].attribute_no,
                    light_id: attribute[1].attribute_no,
                    sprayer_id: attribute[2].attribute_no,
                } : {} : {}}
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            />
        </div>
    }
}

export default StreetLight