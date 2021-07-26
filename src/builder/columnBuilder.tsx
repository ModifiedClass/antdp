import {Tag,Space,Tooltip,Menu,Dropdown,Button} from 'antd'
import moment from 'moment'
import {DownOutlined} from '@ant-design/icons'
import {ActionBuilder} from './actionBuilder'
import {
    COLUMN_DATETIME,
    COLUMN_GENDER,
    COLUMN_CONTENT,
    COLUMN_ACTION,
    COLUMN_SWITCH
} from '@/builder/helper'


export const ColumnBuilder = (
    tableColumn:AntDesingBuilderTypeAPI.Field[] | undefined,
    actionHandler:AntDesingBuilderTypeAPI.ActionHandler
    ) => {
    const newColumns:AntDesingBuilderTypeAPI.Field[] = [];
    (tableColumn || []).forEach((column) => {
        if(column.hideInColumn !== true) {
            switch(column.type){
                case COLUMN_CONTENT:
                    column.render=(value:any)=><Tooltip placement="topLeft" title={value}>{value}</Tooltip>
                    column.width=250
                    column.onCell = () => {
                        return {
                            style: {
                                maxWidth: 250,
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow:'ellipsis',
                                cursor:'pointer'
                            }
                        }
                    }
                    break
                case COLUMN_DATETIME:
                    column.render=(value:any)=>{
                        return moment(value).format('YYYY-MM-DD HH:mm:ss')
                    }
                    column.width=155
                    break
                case COLUMN_SWITCH:
                    column.render=(value:any)=>{
                        const option=column.data.find((item:any) => Boolean(item.value) ===value)
                        return <Tag color={value?'blue':'red'}>{option?.title}</Tag>
                    }
                    column.width=90
                    break
                case COLUMN_GENDER:
                    column.render=(value:any)=>{
                        if(value === 1){
                            return '男'
                        } else if (value === 2){
                            return '女'
                        } else {
                            return '其他'
                        }
                    }
                    column.width=45
                    break
                case COLUMN_ACTION:
                    const btns=column.actions
                    const lthree:any[]=[],mthree:any[]=[];
                    btns.forEach((v:{},i:number)=>{
                        if(i<2){
                            lthree.push(v)
                            column.width=117
                        }else{
                            mthree.push(v)
                            column.width=205
                        }
                    })
                    btns.length < 3 ? column.render=(_:any,record:any)=>{
                        return <Space>{ActionBuilder(btns,actionHandler,record)}</Space>
                    } : column.render=(_:any,record:any)=>{
                        return <Space>
                        {ActionBuilder(lthree,actionHandler,record)}
                        {
                            <Dropdown
                              overlay={
                                <Menu>
                                    <Menu.Item key={1}><Space>{ActionBuilder(mthree,actionHandler,record)}</Space></Menu.Item>
                                </Menu>
                              }
                            >
                            <Button>
                                更多 <DownOutlined />
                            </Button>
                            </Dropdown>
                        }
                        </Space>
                    }
                    column.fixed='right'
                default:
                    column.ellipsis=true
                    break
            }
            newColumns.push(column)
        }
        
    })
    return newColumns
}