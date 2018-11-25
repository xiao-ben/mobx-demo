import React, { Component } from 'react'
import { Switch, Slider } from 'antd';
import './Sprayer.css'

class Sprayer extends Component {

    handleSwitchChange = e => {
        console.log(e, 'sprayerState')
    }

    render() {
        return <div>
            <div className="sprayerTitle">喷雾机管理</div>
            <div className="sprayer">
                <div className="sprayerSection">
                    <h3>喷雾机1</h3>
                    <div>开关<Switch className="sprayerSwitch" onChange={this.handleSwitchChange} checkedChildren="开" unCheckedChildren="关" defaultChecked /></div>
                </div>
            </div>
        </div>
    }
}

export default Sprayer