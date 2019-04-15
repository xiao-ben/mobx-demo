import { observable, action } from 'mobx';
import axios from '../lib/http'

class DevicesStore {
    @observable lights = []
    @observable environment = {}
    @observable attribute = []
    @observable devicesDate = []
    @observable realTimeData = {}

    @observable deviceTypes = null

    @action getDeviceTypes = () => {
        axios('/smart_site/devices/get-type-list').then(
            res => {
                if (!res.data.data) return
                this.deviceTypes = res.data.data.map(
                    item => ({
                        id: item.id,
                        deviceName: item.type_name
                    })
                )
            }
        )
    }

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

    @action getEnvironmentData = (selectedIndex, unit) => {
        if (!this.lights[selectedIndex]) return
        axios('/smart_site/devices/get-monitor-data', {
            method: 'post',
            data: {
                device_name: this.lights[selectedIndex].deviceName,
                unit: unit
            }
        }).then(res => {
            if (!res || !res.data || !res.data.data) return
            const data = res.data.data
            this.environment = data
        })
    }

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

    @action getRealTimeData = selectedIndex => {
        if (!this.lights[selectedIndex]) return
        axios('/smart_site/devices/get-real-time-data', {
            method: 'post',
            data: {
                device_name: this.lights[selectedIndex].deviceName
            }
        }).then(
            res => {
                if (!res.data.data) return
                this.realTimeData = res.data.data
            }
        )
    }

    @action deleteDevice = selectedIndex => {
        if (!this.lights[selectedIndex]) return
        return axios('/smart_site/devices/delete-device', {
            method: 'post',
            data: {
                device_id: this.lights[selectedIndex].id
            }
        })
    }

    @action addLight = (value, path) => {
        return axios('/smart_site/devices/add-device', {
            method: 'post',
            data: {
                ...value,
                manager_comment: path
            }
        })
    }

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

    @action handleSwitchChange = (light, attribute) => {
        return axios('/smart_site/devices/reset-device-attribute', {
            method: 'post',
            data: {
                attribute,
                device_id: light.deviceId,
            }
        })
    }
}
const devicesStore = new DevicesStore();

export { devicesStore }