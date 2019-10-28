// 包装 http 请求
import axios from 'axios'
import camelize from 'camelize'

export const defaults = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    baseUrl: '',
    headers: null,
}

// 本地开发时用 http://localhost:5001 的代理请求
const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5001' : 'http://39.106.114.35'
export default (url, options = {}) => {
    options = Object.assign({}, defaults, options, {
        headers: {
            accept: 'application/json, text/plain, */*',
            ...options.header,
        }
    })
    return axios(baseUrl + url, options).then(
        res => ({data: camelize(res.data)}),
        err => err
    )
}