import {useState, useEffect} from 'react'
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
import {submitFieldsAdaptor} from './helper'
import { getRule,deleteRule} from './services'
import { getMenu } from '../menu/services'
import {listlayout} from './layout'
import {
  ACTION_TYPE_DELETE,
  ACTION_TYPE_DELETE_PERMANENT,
  ACTION_TYPE_MODAL,
  ACTION_TYPE_RELOAD
} from '@/builder/helper'


const Rule = () => {

  // 分页
  const [pageNo,setPageNo] = useState<number>(1)
  const [pageSize,setPageSize] = useState<number | undefined>(10)
  // 编辑框
  const [modalVisible,setModalVisible] = useState(false)
  const [modalTitle,setmodalTitle] = useState('新建')
  const [modalData,setModalData] = useState<RuleTypeAPI.Rule>({})
  const [menuData,setMenuData] = useState<any[]>([])
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

  // 后端请求& 分页
  useEffect(()=>{
    setTableLoding(true)
    getRule({
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
  // 初始化菜单
  useEffect(()=>{
    getMenu({}).then(value=>{
      const sData:any[] = []
      value?.data?.forEach((v:any)=>{
        sData.push({key:v.id,value:v.id,title:v.name})
      })
      setMenuData(sData)
    },error=>{
      console.log(error)
      setMenuData([])
    })
  },[modalVisible])
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
                    await deleteRule(id)
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
    <PageContainer>
      <SeacrhForm
        searchVisible={searchVisible}
        onFinish={onFinish}
        searchForm={searchForm}
        tableColumn={listlayout?.tableColumn}
        setSelectedRowKeys={setSelectedRowKeys}
      />
      <Card>
      <BeforeTableAction
          title='规则管理'
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
        selectedRuledata = {modalData}
        selectMenuData= {menuData}
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

export default Rule
