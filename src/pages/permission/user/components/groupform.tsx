import { Modal, Form, message,Button,Select,Input } from 'antd'
import {useEffect} from 'react'
import { userGrouping } from '../services'
import { ArrayToCommaStr } from '@/utils/strhelper'
import '../index.less'

const { Option } = Select

const GroupForm = ({
    groupVisible,
    groupHide,
    allGroups,
    selectedUserdata,
}:{
    groupVisible:boolean;
    groupHide:(record?:boolean)=>void;
    allGroups:any[];
    selectedUserdata:UserTypeAPI.User;
}) => {
    const [form] = Form.useForm()

    // 后端请求
    useEffect(()=>{
        if(selectedUserdata) {
            // 表单赋值
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
            const { group } =values
            const currentdata={
                'id':selectedUserdata.id,
                'ids':ArrayToCommaStr(group)
            }
            await userGrouping(currentdata)
            message.loading('执行成功！')
            hide()
            groupHide(true)
            form.resetFields()
        } catch (error) {
            hide()
            message.loading('执行失败，请重试！')
            form.resetFields()
            groupHide()
        }
    }

    return (
        
        <Modal
          title='用户分组'
          visible={groupVisible}
          getContainer={false}
          onCancel={()=>{
            groupHide()
          }}
          maskClosable ={false}
          footer={null}
          forceRender
        >
            <Form
              form={form}
              onFinish={onFinish}
              {...layout}
              initialValues={{'gno':selectedUserdata.id,'group':selectedUserdata.groupids,'gname':selectedUserdata.nickname}}>
                <Form.Item name='gno' label='no'>
                    <Input disabled/>
                </Form.Item>
                <Form.Item name='gname' label='昵称'>
                    <Input disabled/>
                </Form.Item>
                <Form.Item name='group' label='组'>
                    <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="请选择分组"
                    >
                        {allGroups?.map((group:GroupTypeAPI.Group)=>{
                            return(<Option key={group.id} value={group.id}>{group.name}</Option>)
                        })}
                    </Select>
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


export default GroupForm
