import { observable, action } from 'mobx';
import axios from '../lib/http'

class MemberStore {
    @observable memberDate = [
        {
            key: '1',
            memberName: 'xiaoben',
            manager: ['member', 'member'],
        }
    ]

    @action addmember = member => {
        axios('123', {
            method: 'post',
            data: member
        })
        this.memberDate = this.memberDate.concat(member)
    }

    @action deletemember = member => {
        // axios('', {
        //     method: 'delete',
        // })
        this.memberDate.remove(member)
    }
}
const memberStore = new MemberStore();

export { memberStore }