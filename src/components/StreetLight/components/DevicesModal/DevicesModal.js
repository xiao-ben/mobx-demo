
import React, { Component } from 'react'
import { Modal, Form, Input, Select } from 'antd'
const FormItem = Form.Item;
const Option = Select.Option;

class DevicesModal extends Component {
    onSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onOk({...this.props.value, ...values})
            }
        });
    }

    componentWillUnmount() {
        this.props.form.resetFields()
    }

    render() {
        const { title, visible, confirmLoading, onCancel, value: initialValue, types } = this.props
        console.log(this.props.value, 'iniddd')
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: { span: 5 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 19 },
                sm: { span: 19 },
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
                    {title === "添加设备" && <FormItem {...formItemLayout} label="路灯 ID" >
                        {getFieldDecorator('device_name', {
                            rules: [{ required: true, message: '输入不能为空' }],
                            initialValue: initialValue ? initialValue.device_name || '' : ''
                        })(
                            <Input placeholder="请输入" />
                        )}
                    </FormItem>}
                    <FormItem {...formItemLayout} label="环境监测 ID" >
                        {getFieldDecorator('environment_id', {
                            initialValue: initialValue ? initialValue.environment_id || '' : ''
                        })(
                            <Input placeholder="请输入" />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="路灯 ID" >
                        {getFieldDecorator('light_id', {
                            initialValue: initialValue ? initialValue.light_id || '' : ''
                        })(
                            <Input placeholder="请输入" />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="喷雾机 ID" >
                        {getFieldDecorator('sprayer_id', {
                            initialValue: initialValue ? initialValue.sprayer_id || '' : ''
                        })(
                            <Input placeholder="请输入" />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

const WrapdevicesModal = Form.create()(DevicesModal);

export default WrapdevicesModal