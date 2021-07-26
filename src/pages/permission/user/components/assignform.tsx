import { Modal, Form, message,Button,Input,TreeSelect } from 'antd'
import {useEffect} from 'react'
import { userDepartment } from '../../../permission/user/services'
import { ArrayToCommaStr } from '@/utils/strhelper'
import '../index.less'

const { SHOW_PARENT } = TreeSelect


const AssignForm = ({
    assignVisible,
    assignHide,
    depData,
    selectedUserdata,
}:{
    assignVisible:boolean;
    assignHide:(record?:boolean)=>void;
    depData:any[];
    selectedUserdata:UserTypeAPI.User
}) => {
    const [form] = Form.useForm()
    // 后端请求
    useEffect(() => {
        if(selectedUserdata) {
            form.resetFields()
            form.setFieldsValue(selectedUserdata)
        }
    },[selectedUserdata])

    // 表单布局
    const layout = {
        labelCol:{span:4},
        wrapperCol:{span:18}
    }
    const onFinish = async (values:any) => {
        const hide = message.loading('正在执行...')
        try {
            const { department } =values
            const currentdata={
                'id':selectedUserdata.id,
                'ids':ArrayToCommaStr(department)
            }
            await userDepartment(currentdata)
            message.loading('执行成功！')
            hide()
            assignHide(true)
            form.resetFields()
        } catch (error) {
            hide()
            message.loading('执行失败，请重试！')
            form.resetFields()
            assignHide()
        }
    }

    const tProps = {
        treeData:depData,
        treeCheckable: true,
        showCheckedStrategy: SHOW_PARENT,
        placeholder: '选择部门',
        style: {
          width: '100%',
        },
    }

    return (
        
        <Modal
          title='用户部门派遣'
          visible={assignVisible}
          getContainer={false}
          onCancel={()=>{
            assignHide()
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
              initialValues={{'dno':selectedUserdata.id,'department':selectedUserdata.departmentids,'dname':selectedUserdata.nickname}}
            >
                <Form.Item name='dno' label='no'>
                    <Input disabled/>
                </Form.Item>
                <Form.Item name='dname' label='昵称'>
                    <Input disabled/>
                </Form.Item>
                <Form.Item name='department' label='部门'>
                    <TreeSelect {...tProps} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        确定
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}


export default AssignForm
