import React, { Component } from 'react'
import { Tabs, Form, Icon, Input, Button, Checkbox } from 'antd'
import { inject, observer } from 'mobx-react';

import './Login.css'
const TabPane = Tabs.TabPane
const FormItem = Form.Item;

@inject('store') @observer
class Login extends Component {
    constructor(props){
        super(props)
        console.log(props, 'props')
        this.store = props.store.loginStore
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.store.handleLogin(values).then(
                    res => {
                        if (res.data.code === 200) {
                            // window.location.href = '/home'
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
        console.log(this.store, 123)
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
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>记住密码</Checkbox>
                    )}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                                    </Button>
                </FormItem>
            </Form>
        )
    }
    render() {
        return (
            <div className="loginContent">
                <div className="loginModal">
                    <Tabs defaultActiveKey="1" onChange={this.handleTabChaneg}>
                        <TabPane tab="普通用户" key="1">
                            {this.renderLoginForm()}
                        </TabPane>
                        <TabPane tab="管理员" key="2">
                            {this.renderLoginForm()}
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}

const WrappedNormalLoginForm = Form.create()(Login);
export default WrappedNormalLoginForm
