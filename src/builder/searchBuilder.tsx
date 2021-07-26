import {Input, Form, DatePicker, TreeSelect, Select, Col} from 'antd'
import moment from 'moment'
import { COLUMN_DATETIME, COLUMN_SELECT, COLUMN_SWITCH, COLUMN_TEXT, COLUMN_TREE,COLUMN_GENDER,COLUMN_CONTENT } from '@/builder/helper'

const {Option} = Select


const SearchBuilder = (data: AntDesingBuilderTypeAPI.Field[] | undefined) => {
    return (data || []).map((field)=>{
        const basicAttr = {
            label:field.title,
            name:field.key,
            key:field.key
        }
        if(!field.hideInSearch){
            switch (field.type){
                case COLUMN_CONTENT:
                case COLUMN_TEXT:
                    return (
                        <Col sm={6} key={field.key}>
                        <Form.Item {...basicAttr}>
                            <Input disabled={field.disabled}/>
                        </Form.Item>
                        </Col>
                    )
                case COLUMN_DATETIME:
                    return (
                        <Col sm={12} key={field.key}>
                        <Form.Item {...basicAttr}>
                            <DatePicker.RangePicker
                            showTime
                            disabled={field.disabled}
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
                        </Col>
                    )
                case COLUMN_TREE:
                    return (
                        <Col sm={12} key={field.key}>
                        <Form.Item {...basicAttr}>
                            <TreeSelect treeData={field.data} disabled={field.disabled} treeCheckable/>
                        </Form.Item>
                        </Col>
                    )
                case COLUMN_SELECT:
                case COLUMN_SWITCH:
                    return (
                        <Col sm={6} key={field.key}>
                        <Form.Item {...basicAttr} valuePropName='checked'>
                            <Select>
                                {(field.data || []).map((option:any)=>{
                                    return(<Option key={option.value} value={option.value}>{option.title}</Option>)
                                })}
                            </Select>
                        </Form.Item>
                        </Col>
                    )
                case COLUMN_GENDER:
                    return (
                        <Col sm={6} key={field.key}>
                        <Form.Item {...basicAttr} rules={field.rules}>
                            <Select>
                                {field.data.map((d:any)=>{
                                    return(<Option key={d.value} value={d.value}>{d.title}</Option>)
                                })}
                            </Select>
                        </Form.Item>
                        </Col>
                    )
                default:
                    return null
            }
        }else{
            return null
        }
    })
}

export default SearchBuilder
