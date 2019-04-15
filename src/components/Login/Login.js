import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd'
import { inject, observer } from 'mobx-react'
import { init, currentCircle } from '../../lib/canvas'
import Cookies from 'js-cookie'
import './Login.css'
const FormItem = Form.Item;

@inject('store') @observer
class Login extends Component {
    constructor(props) {
        super(props)
        this.store = props.store.loginStore
    }

    componentDidMount() {
        const canvas = document.querySelector("#canvas");
        const ctx = canvas.getContext("2d");
        const w = canvas.width = canvas.offsetWidth;
        const h = canvas.height = canvas.offsetHeight;
        const circles = [];
        const current_circle = new currentCircle(0, 0);
        init(100, w, h, circles, current_circle, ctx)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.store.handleLogin(values).then(
                    res => {
                        // Cookies.set('L_USM', 'cS1Sa0I4RDBWNVdFPVVEMUJ2MXNCbU9wQzdaM1MyUkZCbzEzRXVCa0I4RDBWNVdrPW4yeU5ySlZTMmlsPThvZlQ1eWRG')
                        if (res.data.data.success) {
                            window.location.href = '/home'
                        } else {
                            message.error(res.data.data.message || '用户或密码错误')
                        }
                    }
                )
            }
        });
    }

    handleTabChaneg = key => {
        this.props.form.resetFields()
        this.store.handleTabChange(key)
    }

    renderLoginForm = () => {
        const { getFieldDecorator } = this.props.form
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '请输入用户名' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                    )}
                </FormItem>
                <FormItem className="password">
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                </FormItem>
            </Form>
        )
    }
    render() {
        return (
            <div>
                <canvas id="canvas"></canvas>
                <div className="loginContent">
                    <div className="loginModal">
                        {this.renderLoginForm()}
                    </div>
                </div>
            </div>
        )
    }
}

const WrappedNormalLoginForm = Form.create()(Login);
export default WrappedNormalLoginForm
