import { Modal, Form, message,Input,Button } from 'antd'
import {useEffect} from 'react'
import { LockOutlined } from '@ant-design/icons'
import { resetPassword} from '../services'



const PasswordForm = ({
    passwordVisible,
    passwordHide,
    selectedUserdata,
}:{
    passwordVisible:boolean;
    passwordHide:(record?:boolean)=>void;
    selectedUserdata:UserTypeAPI.User
}) => {
    const [form] = Form.useForm()
    // 表单布局
    const layout = {
        labelCol:{span:4},
        wrapperCol:{span:18}
    }

    const onFinish = async (values:any) => {
        const hide = message.loading('正在执行...')
        try {
            const { password } =values
            const currentdata={
                'id':selectedUserdata.id,
                'password':password
            }
            console.log(currentdata)
            await resetPassword(currentdata)
            message.loading('执行成功！')
            hide()
            passwordHide(true)
            form.resetFields()
        } catch (error) {
            hide()
            message.loading('执行失败，请重试！')
            passwordHide()
            form.resetFields()
        }
    }

    useEffect(() => {
        if(selectedUserdata) {
            form.resetFields()
            form.setFieldsValue(selectedUserdata)
        }
    },[selectedUserdata])

    return (
        <Modal
          width={340}
          title='密码重置'
          visible={passwordVisible}
          getContainer={false}
          onCancel={()=>{
            passwordHide()
            form.resetFields()
          }}
          maskClosable ={false}
          footer={null}
          forceRender
        >
            <Form
              form={form}
              onFinish={onFinish}
              {...layout}
              initialValues={{'pno':selectedUserdata.id,'pname':selectedUserdata.nickname}}>
                <Form.Item name='pno' label='no'>
                    <Input disabled/>
                </Form.Item>
                <Form.Item name='pname' label='昵称'>
                    <Input disabled/>
                </Form.Item>
                <Form.Item
                    label='密码'
                    name='password'
                    rules={[{ required: true, message: '请输入新密码!' }]}
                >
                    <Input
                    prefix={<LockOutlined className='site-form-item-icon' />}
                    type='password'
                    placeholder='密码'
                    />
                </Form.Item>
                <Form.Item shouldUpdate>
                    {() => (
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        重置
                    </Button>
                    )}
                </Form.Item>
            </Form>
        </Modal>
    )
}


export default PasswordForm
