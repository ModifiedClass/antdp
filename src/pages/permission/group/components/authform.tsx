import { Modal, message,Transfer,Button } from 'antd'
import { useState,useEffect } from 'react'
import { groupRule } from '../services'
import { ArrayToCommaStr } from '@/utils/strhelper'


const AuthForm = ({
    authVisible,
    hideAuth,
    allRules,
    selectedAuthdata,
}:{
    authVisible:boolean;
    hideAuth:(record?:boolean)=>void;
    allRules:any[];
    selectedAuthdata:GroupTypeAPI.Group
}) => {

    const [targetKeys, setTargetKeys] = useState<any[]>([]);
    // 模态框打开或关闭时初始化穿梭框
    useEffect(()=>{
      setTargetKeys(selectedAuthdata.ruleids)
    },[authVisible])

    const onChange = (targetKeys:any, direction:any, moveKeys:any) => {
      setTargetKeys(targetKeys);
    }

    const filterOption = (inputValue:any, option:any) => option.title.indexOf(inputValue) > -1;

    const onFinish = async () => {
        const hide = message.loading('正在执行...')
        try {
            const currentdata={
              'id':selectedAuthdata.id,
              'ids':ArrayToCommaStr(targetKeys)
            }
            console.log(currentdata)
            await groupRule(currentdata)
            message.loading('执行成功！')
            hide()
            hideAuth(true)
        } catch (error) {
            hide()
            message.loading('执行失败，请重试！')
            hideAuth()
        }
    }

    const onHide = () => {
      hideAuth(true)
    }

    const renderItem = (item:any) => {
      const customLabel = (
        <span className="custom-item">
          {item.title} - {item.description}
        </span>
      );
  
      return {
        label: customLabel, // for displayed item
        value: item.title, // for title and filter matching
      };
    };

    return (
        <Modal
          title={selectedAuthdata.name + '授权'}
          visible={authVisible}
          getContainer={false}
          onCancel={()=>{
            hideAuth()
          }}
          maskClosable ={false}
          footer = {false}
          forceRender
        >
            <Transfer
                dataSource={allRules}
                targetKeys={targetKeys}
                filterOption={filterOption}
                onChange={onChange}
                showSearch
                render={renderItem}
                oneWay={true}
                pagination
            />
            <Button style={{marginTop:10,marginLeft:335}} onClick={onHide}>取消</Button>
            <Button type='primary' style={{marginTop:10,float:'right'}} onClick={onFinish}>确定</Button>
        </Modal>
    )
}


export default AuthForm
