import React, { Component } from 'react'
import { Switch, Slider } from 'antd';
import axios from '../../lib/http'
import './StreetLight.css'

class StreetLight extends Component {
    state = {
        lights: []
    }

    componentDidMount() {
        this.getLightStatus()
    }

    getLightStatus = () => {
        axios('/smart_site/devices/get-device-status?typeId=1').then(
            res => {
                if (!res.data.data) return
                this.setState({
                    lights: res.data.data
                })
            }
        )
    }

    handleSwitchChange = (status, light) => {
        axios('/smart_site/devices/reset-device-status', {
            method: 'post',
            data: {
                deviceId: light.device_id,
                status: status ? '1' : '0',
                value: light.value
            }
        }).then(
            res => {
                if (!res.data.data) return
                this.getLightStatus()
            }
        )
    }


    handleSliderChange = (value, light) => {
        axios('/smart_site/devices/reset-device-status', {
            method: 'post',
            data: {
                deviceId: light.device_id,
                status: light.status,
                value: value
            }
        }).then(
            res => {
                if (!res.data.data) return
                this.getLightStatus()
            }
        )
    }

    render() {
        return <div>
            <div className="lightTitle">路灯管理</div>
            {
                this.state.lights.map(item => (
                    <div className="light" key={item.id}>
                        <div className="lightSection">
                            <h3>{item.device_id}</h3>
                            <div>开关<Switch className="lightSwitch" onChange={value => this.handleSwitchChange(value, item)} checkedChildren="开" unCheckedChildren="关" checked={item.status === '1'} /></div>
                            <div className="streetLightSlider">亮度<Slider className="lightSlider" onChange={value => this.handleSliderChange(value, item)} value={item.value} /></div>
                        </div>
                    </div>
                ))
            }
            
        </div>
    }
}

export default StreetLight