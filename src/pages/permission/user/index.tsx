import {useState, useEffect} from 'react'
import { history } from 'umi'
import {useToggle} from 'ahooks'
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout'
import { Card, message,Modal,Form } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import SeacrhForm from '@/components/SearchForm'
import BeforeTableAction from '@/components/BeforeTableAction'
import RightTable from '@/components/RightTable'
import AfterTablePagination from '@/components/AfterTablePagination'
import BatchToolBarAction from '@/components/BatchToolBarAction'
import EditForm from './components/editform'
import GroupForm from './components/groupform'
import PasswordForm from './components/passwordform'
import ExportForm from './components/exportform'
import AssignForm from './components/assignform'
import {submitFieldsAdaptor} from './helper'
import { getUser,deleteUser} from './services'
import { getDepartment } from '../../hrm/department/services'
import { getGroup } from '../group/services'
import {listlayout} from './layout'
import {FlatToNested} from '@/utils/parenttochildren'
import { treeDataHelper } from '@/utils/parenttochildren'
import {
  ACTION_TYPE_DELETE,
  ACTION_TYPE_DELETE_PERMANENT,
  ACTION_TYPE_MODAL,
  ACTION_TYPE_PASSWORDRESET,
  ACTION_TYPE_GROUPING,
  ACTION_TYPE_PAGE,
  ACTION_TYPE_RELOAD,
  ACTION_TYPE_EXPORT,
  ACTION_TYPE_ASSIGN
} from '@/builder/helper'


const User = () => {

  // 分页
  const [pageNo,setPageNo] = useState<number>(1)
  const [pageSize,setPageSize] = useState<number | undefined>(10)
  // 编辑框
  const [modalVisible,setModalVisible] = useState(false)
  const [modalTitle,setmodalTitle] = useState('新建')
  const [modalData,setModalData] = useState<UserTypeAPI.User>({})
  // 表格操作
  const [tableLoding,setTableLoding] = useState(true)
  const [dataRefresh,setDataRefresh] = useState(true)
  const [selectedRowKeys,setSelectedRowKeys] = useState([])
  const [dataSource,setDataSource] = useState<AntDesingBuilderTypeAPI.DataSource>({})
  // 搜索框
  const [searchVisible,setSearchVisible] = useToggle(false)
  const [searchParams,setSearchParams] = useState({})
  const [searchForm] = Form.useForm()
  const { confirm } =  Modal
  // 重置密码
  const [passwordVisible,setPasswordVisible] = useState(false)
  const [passwordData,setPasswordData] = useState<UserTypeAPI.User>({})
  // 用户分组
  const [groupVisible,setGroupVisible] = useState(false)
  const [groupData,setGroupData] = useState<UserTypeAPI.User>({})
  const [allGroupData,setAllGroupData] = useState([])
  // 导出excel
  const [exportVisible,setExportVisible] = useState(false)
  // 用户部门派遣
  const [assignVisible,setAssignVisible] = useState(false)
  const [assignData,setAssignData] = useState<UserTypeAPI.User>({})
  const [assignDepData,setAssignDepData] = useState([])

  // 后端请求& 分页
  useEffect(()=>{
    setTableLoding(true)
    getUser({
      ispage:true,pageNo,pageSize, ...searchParams
    }).then(value=>{
      setDataSource(value)
    },error=>{
      console.log(error)
      setDataSource({})
    })
    setTableLoding(false)
  },[pageNo,pageSize,searchParams,dataRefresh])
 
  const paginationChagenHandler = (_pageNo:number,_pageSize:number | undefined) =>{
      setPageNo(_pageNo)
      setPageSize(_pageSize)
  }

  // 编辑框
  const hideModal = (record=false) => {
    setModalVisible(false)
    if(record){
      setDataRefresh(!dataRefresh)
    }
  }
  // 搜索框
  const onFinish = (values:any) =>{
    const search_values =submitFieldsAdaptor(values)
    if(search_values.create_time !== undefined){
      const create_time_start = search_values.create_time[0]
      const create_time_end = search_values.create_time[1]
      setSearchParams({create_time_start,create_time_end, ...search_values})
    }else{
      setSearchParams(search_values)
    }
  }
  // 重置密码
  const passwordHide = (record=false) => {
    setPasswordVisible(false)
    if(record){
      setDataRefresh(!dataRefresh)
    }
  }
  // 用户分组
  const groupHide = (record=false) => {
    setGroupVisible(false)
    if(record){
      setDataRefresh(!dataRefresh)
    }
  }
  // 导出excel
  const exportHide = (record=false) => {
    setExportVisible(false)
    if(record){
      setDataRefresh(!dataRefresh)
    }
  }
  // 初始化子组件数据
  useEffect(()=>{
    // 初始化所有部门
    getDepartment({
        parent_id:undefined
      }).then(value=>{
        const temp = FlatToNested({},value?.data,null)?.children[0]?.children
        setAssignDepData(treeDataHelper(temp))
      },error=>{
        console.log(error)
        setAssignDepData([])
      })
      // 初始化所有组
      getGroup({
        ispage:false
      }).then(value=>{
        setAllGroupData(value?.data)
      },error=>{
        console.log(error)
        setAllGroupData([])
      })
  },[])
  // 用户部门派遣
  const assignHide = (record=false) => {
    setAssignVisible(false)
    if(record){
      setDataRefresh(!dataRefresh)
    }
  }
  // 表格
  const rowSelection = {
    selectedRowKeys,
    onChange:(_selectedRowKeys:any,_selectedRows:any)=>{
      setSelectedRowKeys(_selectedRowKeys)
      //setSelectedRow(_selectedRows)
    }
  }
  
  function actionHandler(
    action:AntDesingBuilderTypeAPI.Action,
    record:AntDesingBuilderTypeAPI.Field
  ){
    switch(action.action) {
        case ACTION_TYPE_MODAL:
          setModalVisible(true)
          setModalData(record)
          setmodalTitle(action.text)
          break
        case ACTION_TYPE_PASSWORDRESET:
          setPasswordVisible(true)
          setPasswordData(record)
          break
        case ACTION_TYPE_GROUPING:
          setGroupVisible(true)
          setGroupData(record)
          break
        case ACTION_TYPE_EXPORT:
          setExportVisible(true)
          break
        case ACTION_TYPE_ASSIGN:
          setAssignVisible(true)
          setAssignData(record)
          break
        case ACTION_TYPE_PAGE:
          console.log(action.uri?action.uri.replace('/','/permission/user/'):'')
          history.push(action.uri?action.uri.replace('/','/permission/user/'):'',record)
          break
        case ACTION_TYPE_RELOAD:
          setDataRefresh(!dataRefresh)
          break
        case ACTION_TYPE_DELETE:
        case ACTION_TYPE_DELETE_PERMANENT:
          confirm({
            title:'确认删除？',
            icon:<ExclamationCircleOutlined />,
            okText:'删除',
            okType:'danger',
            cancelText:'取消',
            onOk(){
                const ids=Object.keys(record).length? [record.id]:selectedRowKeys
                const hide = message.loading('正在删除')
                try {
                  ids.forEach(async(id) => {
                    await deleteUser(id)
                  })
                  hide()
                  message.success('删除成功，即将刷新')
                  setSearchParams({})
                } catch (error) {
                  hide()
                  message.error('删除失败，请重试')
                }
            },
            onCancel(){}
          })
          break
        case ACTION_TYPE_RELOAD:
            break
        default:
            break
    }
  }

  // 渲染
  return (
    <PageContainer header={{title:'用户'}}>
      <SeacrhForm
        searchVisible={searchVisible}
        onFinish={onFinish}
        searchForm={searchForm}
        tableColumn={listlayout?.tableColumn}
        setSelectedRowKeys={setSelectedRowKeys}
      />
      <Card>
      <BeforeTableAction
          title='用户管理'
          setSearchVisible={setSearchVisible}
          searchVisible={searchVisible}
          tableToolBar={listlayout?.tableToolBar}
          actionHandler={actionHandler}
        />
      <RightTable
        tableScrollWidth={1792}
        tableLoding={tableLoding}
        dataSource={dataSource}
        tableColumn = {listlayout?.tableColumn}
        rowSelection= {rowSelection}
        actionHandler={actionHandler}
      />
      <AfterTablePagination
          dataSource={dataSource}
          pageNo={pageNo}
          pageSize={pageSize}
          paginationChagenHandler={paginationChagenHandler}
        />
      </Card>
      <EditForm
        modalVisible={modalVisible}
        modalTitle={modalTitle}
        hideModal={hideModal}
        selectedUserdata = {modalData}
      />
      <GroupForm
        groupVisible={groupVisible}
        groupHide={groupHide}
        allGroups={allGroupData}
        selectedUserdata = {groupData}
      />
      <PasswordForm
        passwordVisible={passwordVisible}
        passwordHide={passwordHide}
        selectedUserdata = {passwordData}
      />
      <ExportForm
        exportVisible={exportVisible}
        exportHide={exportHide}
      />
      <AssignForm
        assignVisible={assignVisible}
        assignHide={assignHide}
        depData = {assignDepData}
        selectedUserdata = {assignData}
      />
      <FooterToolbar
        extra={
          <BatchToolBarAction
          selectedRowKeys={selectedRowKeys}
          batchToolBar={listlayout?.batchToolBar}
          actionHandler={actionHandler}
        />
        }
      />
    </PageContainer>
  )
}

export default User
