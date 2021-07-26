import { Modal, Form, message } from 'antd'
import {useEffect} from 'react'
import moment from 'moment'
import FormBuilder from '@/builder/formBuilder'
import {ActionBuilder} from '@/builder/actionBuilder'
import {setFieldsAdaptor,submitFieldsAdaptor} from '../helper'
import {pagelayout} from '../layout'
import { couGroup} from '../services'
import { ACTION_TYPE_CANCEL, ACTION_TYPE_RESET, ACTION_TYPE_SUBMIT } from '@/builder/helper'



const EditForm = ({
    modalVisible,
    modalTitle,
    hideModal,
    selectedGroupdata,
}:{
    modalVisible:boolean;
    modalTitle:string;
    hideModal:(record?:boolean)=>void;
    selectedGroupdata:GroupTypeAPI.Group
}) => {
    const [form] = Form.useForm()

    const layout = {
        labelCol:{span:6},
        wrapperCol:{span:16}
    }

    const onFinish = async (values:any) => {
        const hide = message.loading('正在执行...')
        try {
            const { ...formValues } =values
            const data={
                ...submitFieldsAdaptor(formValues)
            }
            await couGroup({ ...data,id:data.id })
            message.loading('执行成功！')
            hide()
            hideModal(true)
            form.resetFields()
        } catch (error) {
            hide()
            message.loading('执行失败，请重试！')
            hideModal()
        }
    }

    const actionHandler = (action:AntDesingBuilderTypeAPI.Action,record:any) => {
        switch(action.action) {
            case ACTION_TYPE_SUBMIT:
                form.submit()
                break
            case ACTION_TYPE_CANCEL:
                hideModal()
                break
            case ACTION_TYPE_RESET:
                form.resetFields()
                break
            default:
                break
        }
    }
    
    /* useEffect(() => {
        if(modalVisible) {
            form.resetFields()
        }
    },[modalVisible]) */

    useEffect(() => {
        if(selectedGroupdata) {
            form.resetFields()
            form.setFieldsValue(setFieldsAdaptor(pagelayout,selectedGroupdata))
        }
    },[selectedGroupdata])
    return (
        <Modal
          title={modalTitle}
          visible={modalVisible}
          getContainer={false}
          onCancel={()=>{
              hideModal()
          }}
          maskClosable ={false}
          footer={ActionBuilder(pagelayout?.actions[0]?.data, actionHandler)}
          forceRender
        >
            <Form
              {...layout}
              form={form}
              initialValues={{
                  create_time:moment(),
                  status:true
              }}
              onFinish={onFinish}
            >
                {FormBuilder(pagelayout?.tabs[0]?.data)}
            </Form>
        </Modal>
    )
}


export default EditForm
