import { observable, action } from 'mobx';
import axios from '../lib/http'
import Cookies from 'js-cookie'

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
        console.log(this.key, 'key')
        Cookies.set('login', '1231313')
        return axios('http://api.apiopen.top/singlePoetry')
    }

    @action.bound fn = index => {this.todos[index].count = this.todos[index].count + 1} 
  }
const loginStore = new LoginStore();

export {loginStore}