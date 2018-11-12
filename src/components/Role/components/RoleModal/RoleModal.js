
import React, { Component } from 'react'
import { Modal, Form, Input, Select } from 'antd'
import { path } from '../../../../config'

const FormItem = Form.Item;
const Option = Select.Option;

class RoleModal extends Component {
    onSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onOk(values)
            }
        });
    }

    componentWillUnmount() {
        this.props.form.resetFields()
    }

    render() {
        const { title, visible, confirmLoading, onCancel, value: initialValue } = this.props
        console.log('porpsvalue')
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
            visible && <Modal
                title={title}
                visible={visible}
                onOk={this.onSubmit}
                confirmLoading={confirmLoading}
                onCancel={onCancel}
                okText="确定"
                cancelText="取消"
            >
                <Form onSubmit={this.onSubmit} className="login-form">
                    <FormItem {...formItemLayout} label="角色名称" >
                        {getFieldDecorator('roleName', {
                            rules: [{ required: true, message: '输入不能为空' }],
                            initialValue: initialValue ? initialValue.roleName || '' : ''
                        })(
                            <Input placeholder="请输入" />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="权限">
                        {getFieldDecorator('manager', {
                            rules: [{ required: true, message: '输入不能为空' }],
                            initialValue: initialValue ? [...initialValue.manager || []] : []
                        })(
                            <Select
                                mode="multiple"
                                placeholder="请选择"                                
                            >
                                {
                                    path.map(item => <Option key={item.value}>{item.name}</Option>)
                                }
                            </Select>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

const WrapRoleModal = Form.create()(RoleModal);

export default WrapRoleModal