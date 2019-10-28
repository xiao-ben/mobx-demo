import { observable, action } from 'mobx';
import axios from '../lib/http'

class DevicesStore {
    // 定义初始变量
    @observable lights = []
    @observable environment = {}
    @observable attribute = []
    @observable devicesDate = []
    @observable realTimeData = {}
    @observable deviceTypes = null

    // 获取所有路灯
    @action getLights = () => {
        return axios(`/smart_site/devices/get-device-list`, {
            method: 'post',
            data: {
                manager_comment: 'streetLight',
            }
        }).then(
            res => {
                if (!res.data.data) return
                this.lights = res.data.data
                return res.data.data
            }
        )
    }

    // 获取环境相关信息
    @action getEnvironmentData = (selectedIndex, unit) => {
        if (!this.lights[selectedIndex]) return
        axios('/smart_site/devices/get-monitor-data', {
            method: 'post',
            data: {
                device_id: this.lights[selectedIndex].id,
                unit: unit
            }
        }).then(res => {
            if (!res || !res.data || !res.data.data) return
            const data = res.data.data
            this.environment = data
        })
    }

    // 获得路灯的属性
    @action getAttribute = selectedIndex => {
        if (!this.lights[selectedIndex]) return
        axios('/smart_site/devices/get-attribute-list', {
            method: 'post',
            data: {
                device_id: this.lights[selectedIndex].id
            }
        }).then(
            res => {
                if (!res.data.data) return
                this.attribute = res.data.data
            }
        )
    }

    // 获取实时数据
    @action getRealTimeData = selectedIndex => {
        if (!this.lights[selectedIndex]) return
        return axios('/smart_site/devices/get-real-time-data', {
            method: 'post',
            data: {
                device_id: this.lights[selectedIndex].id
            }
        }).then(
            res => {
                if (!res || !res.data || !res.data.data) return
                this.realTimeData = res.data.data
                return res.data.data
            }
        )
    }

    // 删除路灯
    @action deleteLight = selectedIndex => {
        if (!this.lights[selectedIndex]) return
        return axios('/smart_site/devices/delete-device', {
            method: 'post',
            data: {
                device_id: this.lights[selectedIndex].id
            }
        })
    }

    // 添加路灯
    @action addLight = (value, path) => {
        return axios('/smart_site/devices/add-device', {
            method: 'post',
            data: {
                ...value,
                manager_comment: path
            }
        })
    }

    // 编辑路灯
    @action editLight = (value, path, selectedIndex) => {
        if (!this.lights[selectedIndex]) return
        return axios('/smart_site/devices/reset-device', {
            method: 'post',
            data: {
                ...value,                    
                device_id: this.lights[selectedIndex].id,
                manager_comment: path
            }
        })
    }

    // 调整亮度
    @action handleSliderChange = (value, light, attribute) => {
        return axios('/smart_site/devices/reset-device-attribute', {
            method: 'post',
            data: {
                attribute,
                device_id: light.deviceId,
                value: value
            }
        })
    }

    // 切换开关
    @action handleSwitchChange = (light, attribute) => {
        return axios('/smart_site/devices/reset-device-attribute', {
            method: 'post',
            data: {
                attribute,
                device_id: light.deviceId,
            }
        })
    }

    // 切换开关模式
    @action changeLightContarl = (light, type) => {
        return axios('/smart_site/devices/reset-device-control', {
            method: 'post',
            data: {
                ...light,
                type
            }
        })
    }


}
const devicesStore = new DevicesStore();

export { devicesStore }