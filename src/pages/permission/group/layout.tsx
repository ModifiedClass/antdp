import {
    COLUMN_TEXT,
    COLUMN_DATETIME,
    COMPONENT_BUTTON,
    COMPONENT_ICON_BUTTON,
    FORM_FIELD_TEXT,
    BUTTON_TYPE_PRIMARY,
    BUTTON_TYPE_DANGER,
    BUTTON_TYPE_DASHED,
    BUTTON_TYPE_GHOST,
    BUTTON_TYPE_DEFAULT,
    ICON_TYPE_ADD,
    ICON_TYPE_CANCEL,
    ICON_TYPE_DELETE,
    ICON_TYPE_EDIT,
    ICON_TYPE_RELOAD,
    ICON_TYPE_SUBMIT,
    ACTION_TYPE_MODAL,
    ACTION_TYPE_DELETE,
    ACTION_TYPE_RELOAD,
    ACTION_TYPE_DELETE_PERMANENT,
    ACTION_TYPE_RESET,
    ACTION_TYPE_CANCEL,
    ACTION_TYPE_SUBMIT,
    ACTION_TYPE_AUTH,
    COLUMN_CONTENT,
    ICON_TYPE_AUTH,
} from '@/builder/helper'
// /api/v1/users?pageSize=10&current=1
// table
const tablecolumnfield=[
    {title:'NO',dataIndex:'id',key:'id',hideInColumn:false,hideInSearch:true,type:COLUMN_TEXT},
    {title:'名称',dataIndex:'name',key:'name',hideInColumn:false,hideInSearch:false,type:COLUMN_TEXT},
    {title:'创建时间',dataIndex:'create_time',key:'create_time',hideInColumn:false,hideInSearch:false,type:COLUMN_DATETIME},
    {title:'备注',dataIndex:'remark',key:'remark',hideInColumn:false,hideInSearch:true,type:COLUMN_CONTENT},
    {title:'操作',dataIndex:'action',key:'action',hideInColumn:false,hideInSearch:true,type:'action',actions:[
        {component:COMPONENT_ICON_BUTTON,text:'编辑',type:BUTTON_TYPE_GHOST,icon:ICON_TYPE_EDIT,action:ACTION_TYPE_MODAL,uri:'',mehtod:'put'},
        {component:COMPONENT_ICON_BUTTON,text:'授权',type:BUTTON_TYPE_GHOST,icon:ICON_TYPE_AUTH,action:ACTION_TYPE_AUTH,uri:'',mehtod:'put'},
        {component:COMPONENT_ICON_BUTTON,text:'删除',type:BUTTON_TYPE_DEFAULT,icon:ICON_TYPE_DELETE,action:ACTION_TYPE_DELETE,uri:'',mehtod:'delete'}
    ]}
]

const tabletoolbarfield=[
    {component:COMPONENT_BUTTON,text:'新建',type:BUTTON_TYPE_PRIMARY,action:ACTION_TYPE_MODAL,icon:ICON_TYPE_ADD,uri:'',mehtod:'post'},
    {component:COMPONENT_BUTTON,text:'刷新',type:BUTTON_TYPE_DEFAULT,action:ACTION_TYPE_RELOAD,icon:ICON_TYPE_RELOAD}
]
export const listlayout = {
            tableColumn:tablecolumnfield,
            tableToolBar:tabletoolbarfield,
            batchToolBar:[
                {component:COMPONENT_BUTTON,text:'删除',type:BUTTON_TYPE_DANGER,action:ACTION_TYPE_DELETE_PERMANENT,icon:'',uri:''}
            ]
        }

// form
const formfield=[
    {title:'NO',dataIndex:'id',key:'id',type:FORM_FIELD_TEXT,disabled:true,rules:[]},
    {title:'名称',dataIndex:'name',key:'name',disabled:false,type:FORM_FIELD_TEXT,rules:[
        {required: true,message: '必填项！'}
    ]},
    {title:'备注',dataIndex:'remark',key:'remark',disabled:false,type:FORM_FIELD_TEXT,rules:[]}
]

const formhanlder=[
    {
        component:COMPONENT_BUTTON,
        text:'重置',
        icon:ICON_TYPE_RELOAD,
        type:BUTTON_TYPE_DASHED,
        action:ACTION_TYPE_RESET
    },
    {
        component:COMPONENT_BUTTON,
        text:'取消',
        icon:ICON_TYPE_CANCEL,
        type:BUTTON_TYPE_DEFAULT,
        action:ACTION_TYPE_CANCEL
    },
    {
        component:COMPONENT_BUTTON,
        text:'提交',
        icon:ICON_TYPE_SUBMIT,
        type:BUTTON_TYPE_PRIMARY,
        action:ACTION_TYPE_SUBMIT
    }
]
export const pagelayout = {
    tabs:[
        {
            name:"group",
            title:"组",
            data:formfield
        }
    ],
    actions:[
        {
            name:'actions',
            title:'操作',
            data:formhanlder
        }
    ]
} 