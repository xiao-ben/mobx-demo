import { observable, action } from 'mobx'
import axios from '../lib/http'

class RoleStore {

    @observable roleDate = [
        {
            key: '1',
            roleName: '路灯',
            manager: ['role', 'member'],
        }
    ]

    @action addRole = role => {
        return axios('123', {
            method: 'post',
            data: role
        }).then(
            this.roleDate = this.roleDate.concat(role)
        )
        this.roleDate = this.roleDate.concat(role)
    }

    @action deleteRole = role => {
        // axios('', {
        //     method: 'delete',
        // })
        this.roleDate.remove(role)
    }
}
const roleStore = new RoleStore();

export { roleStore }