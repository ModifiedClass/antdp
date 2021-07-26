import {Input, Form, DatePicker, TreeSelect, Switch,Select} from 'antd'
import {
    FORM_FIELD_TEXT,
    FORM_FIELD_SELECT,
    FORM_FIELD_DATETIME,
    FORM_FIELD_SWITCH,
    FORM_FIELD_TREE,
    FORM_FIELD_CONTENT,
    FORM_FIELD_PASSWORD
} from '@/builder/helper'

const { Option } = Select
const {TextArea} = Input


const FormBuilder = (data: AntDesingBuilderTypeAPI.Field[] | undefined) => {
    return (data || []).map((field:any)=>{
        const basicAttr = {
            label:field.title,
            name:field.key,
            key:field.key
        }
        switch (field.type){
            case FORM_FIELD_TEXT:
                return (
                    <Form.Item {...basicAttr} rules={field.rules}>
                        <Input disabled={field.disabled}/>
                    </Form.Item>
                )
            case FORM_FIELD_PASSWORD:
                return (
                    <Form.Item {...basicAttr} rules={field.rules}>
                        <Input disabled={field.disabled} type='password'/>
                    </Form.Item>
                )
            case FORM_FIELD_DATETIME:
                return (
                    <Form.Item {...basicAttr} rules={field.rules}>
                        <DatePicker showTime disabled={field.disabled} />
                    </Form.Item>
                )
            case FORM_FIELD_TREE:
                return (
                    <Form.Item {...basicAttr} rules={field.rules}>
                        <TreeSelect treeData={field.data} disabled={field.disabled} treeCheckable/>
                    </Form.Item>
                )
            case FORM_FIELD_SELECT:
                return (
                    <Form.Item {...basicAttr} rules={field.rules}>
                        <Select>
                            {field.data.map((d:any)=>{
                                return(<Option key={d.value} value={d.value}>{d.title}</Option>)
                            })}
                        </Select>
                    </Form.Item>
                )
            case FORM_FIELD_SWITCH:
                return (
                    <Form.Item {...basicAttr} valuePropName='checked'>
                        <Switch disabled={field.disabled} />
                    </Form.Item>
                )
            case FORM_FIELD_CONTENT:
                return (
                    <Form.Item {...basicAttr} rules={field.rules}>
                        <TextArea disabled={field.disabled} />
                    </Form.Item>
                )
            default:
                return null
        }
    })
}

export default FormBuilder
