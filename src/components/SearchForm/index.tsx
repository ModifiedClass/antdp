import { Space, Row, Col, Card, Button, Form } from 'antd'
import SearchBuilder from '@/builder/searchBuilder'
import styles from './index.less'


const SearchForm = ({
    searchVisible,
    onFinish,
    searchForm,
    tableColumn,
    setSelectedRowKeys
}:{
    searchVisible:boolean;
    onFinish:(values:any)=>void;
    searchForm:any;
    tableColumn:AntDesingBuilderTypeAPI.tableColumn;
    setSelectedRowKeys:any
}) =>{
    return (
      searchVisible ? (
        <Card className={styles.searchform} key='searchForm'>
          <Form onFinish={onFinish} form={searchForm}>
            {<Row gutter={24}>{SearchBuilder(tableColumn)}</Row>}
            <Row>
              <Col sm={24} className={styles.textalignright}>
              <Space>
              <Button type='primary' htmlType='submit'>查询</Button>
              <Button onClick={()=>{
                searchForm.resetFields()
                setSelectedRowKeys([])
              }}
              >清除</Button>
              </Space>
              </Col>
            </Row>
          </Form>
        </Card>
      ): (<></>)
    )
  }
export default SearchForm