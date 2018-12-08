import axios from 'axios'
import Cookies from 'js-cookie'

export const defaults = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    baseUrl: '',
    headers: null,
}

const baseUrl = 'http://39.106.114.35'
export default (url, options = {}) => {
    options = Object.assign({}, defaults, options, {
        headers: {
            accept: 'application/json, text/plain, */*',
            ...options.header,
        }
    })
    return axios(baseUrl + url, options)
}