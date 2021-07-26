import {useState, useEffect} from 'react'
import {useToggle} from 'ahooks'
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout'
import { Row, Col, Card, message, Modal, Form } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import SeacrhForm from '@/components/SearchForm'
import BeforeTableAction from '@/components/BeforeTableAction'
import LeftTree from '@/components/LeftTree'
import RightTable from '@/components/RightTable'
import AfterTablePagination from '@/components/AfterTablePagination'
import BatchToolBarAction from '@/components/BatchToolBarAction'
import EditForm from './components/editform'
import {submitFieldsAdaptor} from './helper'
import { getMenu,deleteMenu} from './services'
import {listlayout} from './layout'
import {
  ACTION_TYPE_DELETE,
  ACTION_TYPE_DELETE_PERMANENT,
  ACTION_TYPE_MODAL,
  ACTION_TYPE_RELOAD
} from '@/builder/helper'
import {FlatToNested} from '@/utils/parenttochildren'


const Menu = () => {
  // 左边树
  const [treeMenu,setTreeMenu]=useState([])
  const [parentid,setParentId]=useState<number | undefined>()
  // 分页
  const [pageNo,setPageNo] = useState<number>(1)
  const [pageSize,setPageSize] = useState<number | undefined>(15)
  // 编辑框
  const [modalVisible,setModalVisible] = useState(false)
  const [modalTitle,setmodalTitle] = useState('新建')
  const [modalData,setModalData] = useState<MenuTypeAPI.Menu>({})
  const [selectData,setSelectData] = useState<any[]>([])
  // 右边表格操作
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
  // 初始化左边树
  useEffect(()=>{
    getMenu({
      parent_id:parentid
    }).then(value=>{
      setTreeMenu(FlatToNested({},value.data,null)?.children[0]?.children)
    },error=>{
      console.log(error)
      setTreeMenu([])
    })
  },[dataRefresh])
  // 初始化右边表格
  useEffect(()=>{
    setTableLoding(true)
    getMenu({
      ispage:true,pageNo,pageSize, ...searchParams,parent_id:parentid
    }).then(value=>{
      setDataSource(value)
    },error=>{
      console.log(error)
      setDataSource({})
    })
    setTableLoding(false)
  },[pageNo,pageSize,searchParams,dataRefresh,parentid])
  // 分页组件
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
  // 初始化编辑parent_id
  useEffect(()=>{
    getMenu({}).then(value=>{
      const sData:any[] = []
      value?.data?.forEach((v:any)=>{
        sData.push({key:v.id,value:v.id,title:v.name})
      })
      setSelectData(sData)
    },error=>{
      console.log(error)
      setSelectData([])
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
  
  // 右边表格操作
  // checkbox勾选事件
  const rowSelection = {
    selectedRowKeys,
    onChange:(_selectedRowKeys:any,_selectedRows:any)=>{
      setSelectedRowKeys(_selectedRowKeys)
      //setSelectedRow(_selectedRows)
    }
  }

  //左边树操作
  const onSelect = (k:any,e:any) => {
    setParentId(parseInt(e.node.id))
  }

  // 页面按钮事件
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
                    await deleteMenu(id)
                  })
                  hide()
                  message.success('删除成功，即将刷新')
                  setSearchParams({})
                  setDataRefresh(!dataRefresh)
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
          title='菜单管理'
          setSearchVisible={setSearchVisible}
          searchVisible={searchVisible}
          tableToolBar={listlayout?.tableToolBar}
          actionHandler={actionHandler}
        />
        <Row gutter={24}>
          <Col xs={24} sm={24} md={10} lg={6} xl={6}>
            <LeftTree
              treeDatas={treeMenu}
              onSelect={onSelect}
            />
          </Col>
          <Col xs={24} sm={24} md={14} lg={18} xl={18}>
            <RightTable
              tableScrollWidth={1792}
              tableLoding={tableLoding}
              dataSource={dataSource}
              tableColumn = {listlayout?.tableColumn}
              rowSelection= {rowSelection}
              actionHandler={actionHandler}
            />
          </Col>
        </Row>
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
        data = {modalData}
        selectdata = {selectData}
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

export default Menu
