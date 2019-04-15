import { observable, action } from 'mobx';
import axios from '../lib/http'
import md5 from 'md5'

class LoginStore {

    @observable userName = ''
    @observable password = ''

    @action handleLogin = values => {
        this.userName = values.userName
        this.password = values.password
        return axios('/smart_site/account/login', {
            method: 'post',
            data: {
                userName: values.userName,
                password: md5(values.password),
            }
        })
    }

}
const loginStore = new LoginStore();

export {loginStore}