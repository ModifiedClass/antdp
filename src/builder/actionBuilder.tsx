import {Button,Popover} from 'antd'
import {ButtonType} from 'antd/lib/button'
import { 
    PlusOutlined,
    EditOutlined,
    UsergroupAddOutlined,
    KeyOutlined,
    DeleteOutlined,
    ReloadOutlined,
    ProfileOutlined,
    UndoOutlined,
    CloseCircleOutlined,
    CloseOutlined,
    CheckOutlined,
    ExportOutlined,
    ApartmentOutlined
} from '@ant-design/icons'
import {
    COMPONENT_BUTTON,
    COMPONENT_ICON_BUTTON,
    ICON_TYPE_ADD,
    ICON_TYPE_CANCEL,
    ICON_TYPE_DELETE,
    ICON_TYPE_DISABLE,
    ICON_TYPE_EDIT,
    ICON_TYPE_EXPORT,
    ICON_TYPE_GET,
    ICON_TYPE_GROUP,
    ICON_TYPE_RELOAD,
    ICON_TYPE_RESET_KEY,
    ICON_TYPE_RESTORE,
    ICON_TYPE_SUBMIT,
    ICON_TYPE_ASSIGN,
    ICON_TYPE_AUTH
} from '@/builder/helper'


const iconBuilder = (text:string) => {
    switch(text){
        case ICON_TYPE_EDIT:
            return <EditOutlined style={{color:"#52c41a"}}/>
        case ICON_TYPE_ADD:
            return <PlusOutlined />
        case ICON_TYPE_GROUP:
            return <UsergroupAddOutlined style={{color:"#1890FF"}}/>
        case ICON_TYPE_RESET_KEY:
        case ICON_TYPE_AUTH:
            return <KeyOutlined style={{color:"#FFAD14"}}/>
        case ICON_TYPE_DELETE:
            return <DeleteOutlined style={{color:"#ff0000"}}/>
        case ICON_TYPE_RELOAD:
            return <ReloadOutlined />
        case ICON_TYPE_GET:
            return <ProfileOutlined />
        case ICON_TYPE_EXPORT:
            return <ExportOutlined />
        case ICON_TYPE_DISABLE:
            return <CloseCircleOutlined />
        case ICON_TYPE_RESTORE:
            return <UndoOutlined />
        case ICON_TYPE_CANCEL:
            return <CloseOutlined />
        case ICON_TYPE_SUBMIT:
            return <CheckOutlined />
        case ICON_TYPE_ASSIGN:
            return <ApartmentOutlined />
        default:
            return null
    }
}

export const ActionBuilder = (
    actions: AntDesingBuilderTypeAPI.Action[] | undefined,
    actionHandler:AntDesingBuilderTypeAPI.ActionHandler,
    record = {},
    loading=false
)=>{
    return (actions || []).map((action)=>{
        if(action.component === COMPONENT_BUTTON){
            return (
                <Button
                    key={action.action}
                    type={action.type as ButtonType}
                    onClick={
                        ()=>actionHandler(action,record)
                    }
                    loading={loading}
                >
                    {iconBuilder(action.icon)}
                    {action.text}
                </Button>
            )
        }
        if(action.component === COMPONENT_ICON_BUTTON){
            return (
                <Popover key={action.action} content={action.text} trigger='hover'>
                    <Button
                        type={action.type as ButtonType}
                        onClick={
                            ()=>actionHandler(action,record)
                        }
                        loading={loading}
                    >
                        {iconBuilder(action.icon)}
                    </Button>
                </Popover>
            )
        }
        return null
    })
}
