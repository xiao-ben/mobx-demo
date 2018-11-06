import axios from 'axios'
import Cookies from 'js-cookie'

export const defaults = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    baseUrl: '',
    headers: null,
}

export default (url, options = {}) => {
    console.log(Cookies.get('login'), 'login')
    options = Object.assign({}, defaults, options, {
        headers: {
            accept: 'application/json, text/plain, */*',
            Cookies: JSON.stringify(Cookies.get()) || '',
            ...options.header,
        }
    })
    return axios(url, options)
}