import { observable, action } from 'mobx';
import axios from '../lib/http'
import md5 from 'md5'

class LoginStore {

    @observable userName = ''
    @observable password = ''
    @observable key = 1

    @action handleTabChange = key => {
        this.key = key
    }

    @action handleLogin = values => {
        this.userName = values.userName
        this.password = values.password
        return axios('/smart_site/account/login', {
            method: 'post',
            data: {
                userName: values.userName,
                password: md5(values.password),
                manager: this.key
            }
        })
    }

    @action.bound fn = index => {this.todos[index].count = this.todos[index].count + 1} 
  }
const loginStore = new LoginStore();

export {loginStore}