import { observable, action } from 'mobx';
import { message } from 'antd'
import axios from '../lib/http'
import md5 from 'md5'

class MemberStore {
    @observable memberDate = []
    @observable roleData = []
    @observable loading = false

    @action getRole = () => {
        return axios('/smart_site/manager/get-manager-list').then(
            res => {
                if (!res.data || !res.data.data) return
                this.roleData = res.data.data
            },
            err => {
                return 
            }
        )
    }

    @action getMember = () => {
        axios('/smart_site/manager/get-user-list').then(res => {
            if (!res.data || !res.data.data.length) return
            this.memberDate = res.data.data
        })
    }

    @action editMember = user => {
        this.loading = true
        return axios('/smart_site/manager/reset-user', {
            method: 'post',
            data: {
                ...user,
                userId: user.userId,
                password: user.password ? md5(user.password) : null
            }
        }).then(
            res => {
                this.loading = false
                if (!res.data.data) {
                    message.error(`修改失败 ${res.data.data}`)
                    return
                }
                this.getMember()
                message.success('修改成功')
            }
        )
    }

    @action addmember = member => {
        this.loading = true
        return axios('/smart_site/manager/add-user', {
            method: 'post',
            data: {
                ...member,
                password: md5(member.password),
            }
        }).then(res => {
            if(!res.data.data) {
                this.loading = false
                message.error(`添加失败 ${res.data.data}`)
                return 
            }
            this.getMember()
            this.loading = false
            message.success('添加成功')
        })
    }

    @action deletemember = member => {
        axios('/smart_site/manager/delete-user', {
            method: 'post',
            data: {
                userId: member.id
            }
        }).then(
            res => {
                if (!res.data.data) {
                    message.info('删除失败')
                    return
                }
                message.success('删除成功')
                this.getMember()
            }
        )
    }
}
const memberStore = new MemberStore();

export { memberStore }