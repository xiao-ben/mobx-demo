
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
                    <FormItem {...formItemLayout} label="设备 ID" >
                        {getFieldDecorator('id', {
                            rules: [{ required: true, message: '输入不能为空' }],
                            initialValue: initialValue ? initialValue.id || '' : ''
                        })(
                            <Input placeholder="请输入" />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="设备名称">
                        {getFieldDecorator('typeName', {
                            rules: [{ required: true, message: '输入不能为空' }],
                            initialValue: initialValue ? initialValue.typeName : ''
                        })(
                            <Select
                                placeholder="请选择"                                
                            >
                                { 
                                    types.map(item => <Option key={item.id}>{item.deviceName}</Option>)
                                }   
                            </Select>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

const WrapdevicesModal = Form.create()(DevicesModal);

export default WrapdevicesModal