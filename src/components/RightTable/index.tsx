import { Table } from 'antd'
import {ColumnBuilder} from '@/builder/columnBuilder'

const RightTable = ({
    tableScrollWidth,
    tableLoding,
    tableColumn,
    dataSource,
    rowSelection,
    actionHandler
}:{
    tableScrollWidth:number;
    tableLoding:boolean;
    tableColumn:AntDesingBuilderTypeAPI.tableColumn;
    dataSource:AntDesingBuilderTypeAPI.DataSource;
    rowSelection:{};
    actionHandler:(action:AntDesingBuilderTypeAPI.Action,record:AntDesingBuilderTypeAPI.Field)=>void;
}) => {

    return (
      <Table
        rowKey='id'
        bordered
        size='small'
        loading={tableLoding}
        dataSource={dataSource?.data}
        columns = {ColumnBuilder(tableColumn,actionHandler)}
        scroll={{ x: tableScrollWidth }}
        pagination={false}
        rowSelection={rowSelection}
      />
    )
  }

export default RightTable