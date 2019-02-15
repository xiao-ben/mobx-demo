import React, { Component } from 'react'
import { Switch } from 'antd';
import axios from '../../lib/http'
import './Sprayer.css'

class Sprayer extends Component {
    state = {
        sprayers: []
    }

    handleSwitchChange = (status, sprayer) => {
        axios('/smart_site/devices/reset-device-status', {
            method: 'post',
            data: {
                deviceId: sprayer.device_id,
                status: status ? '1' : '0',
            }
        }).then(
            res => {
                if (!res.data.data) return
                this.getSprayerStatus()
            }
        )
    }

    componentDidMount() {
        this.getSprayerStatus()
    }

    getSprayerStatus = () => {
        axios('/smart_site/devices/get-device-status?typeId=2').then(
            res => {
                if (!res.data.data) return
                this.setState({
                    sprayers: res.data.data
                })
            }
        )
    }

    render() {
        return <div>
            <div className="sprayerTitle">喷雾机管理</div>
            {
                this.state.sprayers.map(item => (
                    <div className="sprayer" key={item.id}>
                        <div className="sprayerSection">
                            <h3>{item.device_id}</h3>
                            <div>开关<Switch className="sprayerSwitch" onChange={status => this.handleSwitchChange(status, item)} checkedChildren="开" unCheckedChildren="关" value={item.value === '1'} /></div>
                        </div>
                    </div>
                ))
            }
        </div>
    }
}

export default Sprayer