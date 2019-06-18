import { observable, action } from 'mobx';
import axios from '../lib/http';

class NavStore {
    @observable name = ''
    @observable isAdmin = true
    @observable managers = [{
      managerName: '智慧路灯',
      comment: 'streetLight'
    }]

    @action getName = () => {
      axios('/smart_site/account/get-login-name').then(
        res => {
          if(!res.data.data) return
          this.name = res.data.data.userName
          this.isAdmin = res.data.data.manager === '1'
        }
      )
    }

    @action getManagers = () => {
      axios('/smart_site/manager/get-user-managers').then(res => {
        if (!res.data.data) return
        this.managers = res.data.data
      })
    }
}
const navStore = new NavStore();

export {navStore}