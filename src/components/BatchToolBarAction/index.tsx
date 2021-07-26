import { Space } from 'antd'
import {ActionBuilder} from '@/builder/actionBuilder'

const BatchToolBarAction = ({
  selectedRowKeys,
  batchToolBar,
  actionHandler
}:{
  selectedRowKeys:any
  batchToolBar:AntDesingBuilderTypeAPI.batchToolBar;
  actionHandler:(action:AntDesingBuilderTypeAPI.Action,record:AntDesingBuilderTypeAPI.Field)=>void;
}) => {
    return (
      selectedRowKeys.length >0 ? (
        <Space>
          {ActionBuilder(batchToolBar,actionHandler)}
        </Space>
      ):(<></>)
    )
  }

export default BatchToolBarAction