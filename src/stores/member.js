import { observable, action } from 'mobx';
import axios from '../lib/http'

class MemberStore {
    @observable memberDate = [
        // {
        //     key: '1',
        //     memberName: 'xiaoben',
        //     manager: ['member'],
        // }
    ]
    
    @observable roleDate = null

    @action getRole = () => {
        return axios('/smart_site/manager/get-role-list').then(
            res => {
                const data = res.data.data
                if (!data || !data.length) return
                this.roleDate = data.map(item =>  ({
                    key: item.id,
                    roleName: item.role_name
                }))
            }
        )
    }

    @action getMember = () => {
        axios('/smart_site/manager/get-user-list').then(res => {
            if (!res.data.data.length) return
            this.memberDate = res.data.data.map(item => ({
                memberName: item.user_name,
                key: item.id,
                manager: item.roles.map(role => ({
                    id: role.role_id
                }))
            }))
        })
    }

    @action editMember = user => {
        return axios('/smart_site/manager/reset-user', {
            method: 'post',
            data: {
                roleIds: user.manager,
                userId: user.userId
            }
        }).then(
            (res) => {
                if (!res.data.data) return
                this.getMember()
            }
        )
    }

    @action addmember = member => {
        axios('/smart_site/manager/add-user', {
            method: 'post',
            data: {
                userName: member.memberName,
                password: member.password,
                roleIds: member.manager
            }
        }).then(res => {
            if(!res.data.data) return
            this.getMember()
        })
    }

    @action deletemember = member => {
        axios('/smart_site/manager/delete-user', {
            method: 'post',
            data: {
                userId: member.key
            }
        }).then(
            res => {
                if (!res.data.data) return
                this.getMember()
            }
        )
    }
}
const memberStore = new MemberStore();

export { memberStore }