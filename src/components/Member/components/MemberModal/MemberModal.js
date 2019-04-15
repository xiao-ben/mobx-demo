
import React, { Component } from 'react'
import { Modal, Form, Input, Select } from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;

class MemberModal extends Component {
    onSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onOk({
                    ...values,
                    userId: this.props.value.id
                }, this.props.form.resetFields)
            }
        });
    }

    componentWillUnmount() {
        this.props.form.resetFields()
    }

    render() {
        const { title, visible, confirmLoading, onCancel, value: initialValue, roles } = this.props
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: { span: 4 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 20 },
                sm: { span: 20 },
            },
        }

        return (
            <Modal
                title={title}
                visible={visible}
                onOk={this.onSubmit}
                confirmLoading={confirmLoading}
                onCancel={onCancel}
                okText="确定"
                cancelText="取消"
            >
                <Form onSubmit={this.onSubmit} className="login-form">
                    <FormItem {...formItemLayout} label="用户名称" >
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '输入不能为空' }],
                            initialValue: initialValue ? initialValue.userName : ''
                        })(
                            <Input placeholder="请输入" />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="权限">
                        {getFieldDecorator('managers', {
                            rules: [{ required: true, message: '输入不能为空' }],
                            initialValue: initialValue.managers ? initialValue.managers.map(item => item.managerId) : []
                        })(
                            <Select
                                mode="multiple"
                                placeholder="请选择"                                
                            >
                                {
                                    roles.map(item => <Option key={item.id}>{item.managerName}</Option>)
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="密码">
                        {getFieldDecorator('password', {
                            rules: [{ required: title === "添加用户", message: '请输入密码' }],
                        })(
                            <Input type="password" placeholder="密码" />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

const WrapmemberModal = Form.create()(MemberModal);

export default WrapmemberModal