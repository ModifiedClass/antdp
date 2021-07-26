import { Space, Row, Col, Tooltip, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import styles from './index.less'
import {ActionBuilder} from '@/builder/actionBuilder'

const BeforeTableAction = ({
    title,
    setSearchVisible,
    searchVisible,
    tableToolBar,
    actionHandler
}:{
    title:string;
    setSearchVisible:any;
    searchVisible:boolean;
    tableToolBar:AntDesingBuilderTypeAPI.tableToolBar;
    actionHandler:(action:AntDesingBuilderTypeAPI.Action,record:AntDesingBuilderTypeAPI.Field)=>void;
}) =>{
    return (
    <Row>
      <Col xs={24} sm={12}>{title}</Col>
      <Col xs={24} sm={12} className={styles.tabletoolbar}>
        <Space>
          {<Tooltip title='搜索'>
            <Button
              shape='circle'
              icon={<SearchOutlined />}
              onClick={()=>{
                setSearchVisible.toggle()
              }}
              type={searchVisible?'primary':'default'}
            />
          </Tooltip>
          }
          {ActionBuilder(tableToolBar,actionHandler)}
        </Space>
      </Col>
    </Row>
    )
}

export default BeforeTableAction