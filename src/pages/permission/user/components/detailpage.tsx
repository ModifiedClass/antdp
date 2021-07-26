import { PageContainer } from '@ant-design/pro-layout';
import { Card,Descriptions,Button,Tabs,Col,Row,Avatar } from 'antd'
import { LeftOutlined,UserOutlined } from '@ant-design/icons'
import {useEffect,useState} from 'react'
import {useHistory} from 'umi'


const { TabPane } = Tabs
const Item=Descriptions.Item

const DetailPage = () => {
    const history = useHistory()
    const data:any = history.location.state
    const [userInfo,setUserInfo] = useState<any>({})


    useEffect(() => {
        if(data) {
            setUserInfo(data)
        }
    },[data])
    const title=(
        <span>
            <Button type='default' onClick={()=>history.goBack()}><LeftOutlined /></Button>
        </span>
    )
    return (
        <PageContainer>
            <Card title={title}>
                <Tabs type='card'>
                    <TabPane tab='基本信息' key='1'>
                        <Row gutter={24}>
                            <Col>
                                <Descriptions bordered>
                                    <Item label='昵称'>{userInfo?.nickname}</Item>
                                    <Item label='邮箱' span={2}>{userInfo?.email}</Item>
                                    <Item label='姓名'>{userInfo?.realname}</Item>
                                    <Item label='身份证号' span={2}>{userInfo?.id_number}</Item>
                                    <Item label='性别'>
                                        {(userInfo?.gender)===1?'男':((userInfo?.gender)===2?'女':'其他')}
                                    </Item>
                                    <Item label='手机号' span={2}>{userInfo?.mobile}</Item>
                                    <Item label='注册时间'>{userInfo?.create_time}</Item>
                                    <Item label='上次登录' span={2}>{userInfo?.last_login_time}</Item>
                                    <Item label='组' span={3}>{userInfo?.groups?.map((g:any)=>g.name).join(',')}</Item>
                                    <Item label='备注' span={3}>{userInfo?.remark}</Item>
                                </Descriptions>
                            </Col>
                            <Col>
                                <Descriptions bordered layout='vertical'>
                                    <Item label='头像'>
                                        <Avatar
                                            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                                            icon={<UserOutlined />}
                                            src={userInfo?.avatar}
                                        />
                                    </Item>
                                </Descriptions>  
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab='其他' key='2'>
                        <Descriptions bordered>
                            <Item label='test'>test</Item>
                        </Descriptions>
                    </TabPane>
                </Tabs>
            </Card>
        </PageContainer>
    )
}


export default DetailPage
