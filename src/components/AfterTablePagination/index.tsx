import { Row, Col, Pagination } from 'antd'
import styles from './index.less'

const AfterTablePagination = ({
    dataSource,
    pageNo,
    pageSize,
    paginationChagenHandler,
}:{
    dataSource:AntDesingBuilderTypeAPI.DataSource;
    pageNo:number;
    pageSize:number | undefined;
    paginationChagenHandler:(_pageNo:number,_pageSize:number | undefined) =>void
}) =>{
    return(
    <Row>
      <Col xs={24} sm={12}></Col>
      <Col xs={24} sm={12} className={styles.tabletoolbar}>
        <Pagination
          total={dataSource?.total}
          current={pageNo}
          pageSize={pageSize}
          showSizeChanger
          showQuickJumper
          showTotal={(total)=>`共 ${total} 条记录`}
          onChange={paginationChagenHandler}
          onShowSizeChange={paginationChagenHandler}
        />
      </Col>
    </Row>
    )
  }

  export default AfterTablePagination 