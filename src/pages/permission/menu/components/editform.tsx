import { Modal, Form, message,Select } from 'antd'
import {useEffect} from 'react'
import moment from 'moment'
import { ACTION_TYPE_CANCEL, ACTION_TYPE_RESET, ACTION_TYPE_SUBMIT } from '@/builder/helper'
import FormBuilder from '@/builder/formBuilder'
import {ActionBuilder} from '@/builder/actionBuilder'
import {setFieldsAdaptor,submitFieldsAdaptor} from '../helper'
import {pagelayout} from '../layout'
import { couMenu} from '../services'

const { Option } = Select


const EditForm = ({
    modalVisible,
    modalTitle,
    hideModal,
    data,
    selectdata,
}:{
    modalVisible:boolean;
    modalTitle:string;
    hideModal:(record?:boolean)=>void;
    data:MenuTypeAPI.Menu;
    selectdata:any[]
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
            console.log({ ...data})
            await couMenu({ ...data})
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

    useEffect(() => {
        if(data) {
            form.resetFields()
            form.setFieldsValue(setFieldsAdaptor(pagelayout,data))
        }
    },[data])

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
                status:data.status,
                parent_id:data.parent_id
            }}
            onFinish={onFinish}
        >
            <Form.Item label='上级' name='parent_id' key='parent_id' >
                <Select>
                    {selectdata.map((d:any)=>{
                        return(<Option key={d.value} value={d.value}>{d.title}</Option>)
                    })}
                </Select>
            </Form.Item>
            {FormBuilder(pagelayout?.tabs[0]?.data)}
        </Form>
    </Modal>
  );
};

export default EditForm;
