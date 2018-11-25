import React, { Component } from 'react'
import { Switch, Slider } from 'antd';
import './StreetLight.css'

class StreetLight extends Component {

    handleSwitchChange = e => {
        console.log(e, 'lightState')
    }

    render() {
        return <div>
            <div className="lightTitle">路灯管理</div>
            <div className="light">
                <div className="lightSection">
                    <h3>路灯1</h3>
                    <div>开关<Switch className="lightSwitch" onChange={this.handleSwitchChange} checkedChildren="开" unCheckedChildren="关" defaultChecked /></div>
                    <div className="streetLightSlider">亮度<Slider className="lightSlider" defaultValue={30} /></div>
                </div>
            </div>
        </div>
    }
}

export default StreetLight