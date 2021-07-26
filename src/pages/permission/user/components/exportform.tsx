import { Modal, Form, message,DatePicker,Button } from 'antd'
import {useEffect} from 'react'
import moment from 'moment'
import {submitFieldsAdaptor} from '../helper'
import { userExport } from '../services'



const ExportForm = ({
    exportVisible,
    exportHide
}:{
    exportVisible:boolean;
    exportHide:(record?:boolean)=>void;
}) => {
    const [form] = Form.useForm()

    const onFinish = async (values:any) => {
        const hide = message.loading('正在执行...')
        try {
            const {export_time}=submitFieldsAdaptor(values)
            await userExport({'create_time_start':export_time[0],'create_time_end':export_time[1]})
            message.loading('执行成功！')
            hide()
            exportHide(true)
            form.resetFields()
        } catch (error) {
            hide()
            message.loading('执行失败，请重试！')
            exportHide()
            form.resetFields()
        }
    }

    useEffect(() => {
        if(exportVisible) {
            form.resetFields()
        }
    },[exportVisible])

    return (
        <Modal
          width={530}
          title='导出excel'
          visible={exportVisible}
          getContainer={false}
          onCancel={()=>{
            exportHide()
            form.resetFields()
          }}
          maskClosable ={false}
          footer={null}
          forceRender
        >
            <Form layout='inline' form={form} onFinish={onFinish} >
                <Form.Item
                    name='export_time'
                    rules={[{ required: true, message: '请选择时间范围!' }]}
                >
                    <DatePicker.RangePicker
                    showTime
                    style={{width:'100%'}}
                    ranges={{
                        '今日':[moment().startOf('day'),moment().endOf('day')],
                        '上月':[
                            moment().subtract(1,'months').startOf('month'),
                            moment().subtract(1,'months').endOf('month'),
                            ]
                    }}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" >
                        导出
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}


export default ExportForm
