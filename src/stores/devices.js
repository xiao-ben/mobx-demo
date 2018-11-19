import { observable, action } from 'mobx';
import axios from '../lib/http'

class DevicesStore {
    @observable devicesDate = [
        {
            key: '1',
            id: '123',
            devicesName: 'streetLight',
        }
    ]

    @action addDevices = devices => {
        axios('123', {
            method: 'post',
            data: devices
        })
        this.devicesDate = this.devicesDate.concat(devices)
    }

    @action editDevices = device => {
        const index = this.devicesDate.findIndex(item => item.key === device.key)
        this.devicesDate[index] = device
    }

    @action deleteDevices = devices => {
        // axios('', {
        //     method: 'delete',
        // })
        this.devicesDate.remove(devices)
    }
}
const devicesStore = new DevicesStore();

export { devicesStore }