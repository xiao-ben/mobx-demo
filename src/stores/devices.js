import { observable, action } from 'mobx';
import axios from '../lib/http'

class DevicesStore {
    @observable devicesDate = [
        {
            key: '1',
            id: '123',
            deviceName: 'streetLight',
        }
    ]

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

    @action getDevices = () => {
        axios('/smart_site/devices/get-device-list').then(
            res => {
                if (!res.data.data) return
                this.devicesDate = res.data.data.map(
                    item => ({
                        key: item.id,
                        id: item.device_id,
                        typeId: item.type_id,
                        deviceName: item.type_name 
                    })
                )
            }
        )
    }

    @action addDevices = devices => {
        axios('/smart_site/devices/add-device', {
            method: 'post',
            data: {
                typeId: devices.typeName,
                deviceId: devices.id,
            }
        }).then(
            this.getDevices
        )
    }

    @action editDevices = device => {
        const index = this.devicesDate.findIndex(item => item.key === device.key)
        this.devicesDate[index] = device
    }

    @action deleteDevices = device => {
        axios('/smart_site/devices/delete-device', {
            method: 'post',
            data: {
                id: device.key
            }
        }).then(
            this.getDevices
        )
    }
}
const devicesStore = new DevicesStore();

export { devicesStore }