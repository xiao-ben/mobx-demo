import { observable, action } from 'mobx';
import axios from '../lib/http'

class RoleStore {

    @observable roleDate = [
        {
            key: '1',
            roleName: '路灯',
            rights: ['role', 'member'],
        }
    ]

    @action addRole = role => {
        axios('123', {
            method: 'post',
            data: role
        })
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