import { observable, action } from 'mobx'
import axios from '../lib/http'

class RoleStore {

    @observable roleDate = [
        {
            key: '1',
            roleName: '路灯',
            manager: [1, 2],
        }
    ]

    @action getRole = () => {
        return axios('/smart_site/manager/get-role-list').then(
            res => {
                const data = res.data.data
                if (!data || !data.length) return
                this.roleDate = data.map(item =>  ({
                    key: item.id,
                    roleName: item.role_name,
                    manager: item.managers ? item.managers.map(item => ({
                        ...item,
                        id: Number(item.manager_id),
                    })) : [],
                    ...data
                }))
            }
        )
    }

    @action editRole = role => {
        return axios('/smart_site/manager/reset-role', {
            method: 'post',
            data: {
                managerIds: role.manager,
                roleId: role.roleId
            }
        }).then(
            (res) => {
                if (!res.data.data) return
                this.getRole()
            }
        )
    }

    @action addRole = role => {
        return axios('/smart_site/manager/add-role', {
            method: 'post',
            data: {
                managerIds: role.manager,
                roleName: role.roleName
            }
        }).then(
            (res) => {
                if (!res.data) return
                this.getRole()
            }
        )
    }

    @action deleteRole = role => {
        axios('/smart_site/manager/delete-role', {
            method: 'post',
            data: {
                roleId: role.key
            }
        }).then(
            res => {
                if (!res.data.data) return
                this.roleDate.remove(role)
            }
        )
    }
}
const roleStore = new RoleStore();

export { roleStore }