import { observable, action } from 'mobx';
import axios from 'axios'

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
        return axios.get('http://api.apiopen.top/singlePoetry')
    }

    @action.bound fn = index => {this.todos[index].count = this.todos[index].count + 1} 
  }
const loginStore = new LoginStore();

export {loginStore}