import { LockOutlined, MobileOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Alert, message, Tabs } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Link, history, useModel } from 'umi';
import Footer from '@/components/Footer';
import { login } from './services';
import { setToken, setUid } from '@/utils/utils'
import styles from './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);
/** 此方法会跳转到 redirect 参数所在的位置 */

const goto = () => {
  if (!history) return;
  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query as {
      redirect: string;
    };
    history.push(redirect || '/');
  }, 10);
};

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [userLoginState, setUserLoginState] = useState<AuthAPI.LoginResult>({});
  const [type, setType] = useState<string>('mobile');
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async (uid:number) => {
    const userInfo = await initialState?.fetchUserInfo?.(uid);

    if (userInfo) {
      setInitialState({ ...initialState, currentUser: userInfo });
    }
  };

  const handleSubmit = async (values: AuthAPI.LoginParams) => {
    setSubmitting(true);

    try {
      // 登录
      const msg = await login({ ...values, type });
      if (msg.token !== undefined && msg.token !== '' && msg.uid !== undefined && msg.uid > 0) {
        setToken(msg.token)
        setUid(msg.uid)
        const defaultloginSuccessMessage = '登录成功！';
        message.success(defaultloginSuccessMessage);
        await fetchUserInfo(msg.uid);
        goto();
        return;
      } // 如果失败去设置用户错误信息

      setUserLoginState(msg);
    } catch (error) {
      const defaultloginFailureMessage = '账户或密码错误，请重试！';
      message.error(defaultloginFailureMessage);
    }

    setSubmitting(false); 
  };

  const { status, type: loginType } = userLoginState;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src="/logo.svg" />
              <span className={styles.title}>行政管理信息化平台</span>
            </Link>
          </div>
        </div>

        <div className={styles.main}>
          <ProForm
            initialValues={{
              autoLogin: true,
            }}
            submitter={{
              searchConfig: {
                submitText: '登录',
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={async (values) => {
              handleSubmit(values as AuthAPI.LoginParams);
            }}
          >
            <Tabs defaultActiveKey="mobile" activeKey={type} onChange={setType}>
              <Tabs.TabPane
                key="nickname"
                tab='帐号登录'
              />
              <Tabs.TabPane
                key="mobile"
                tab='手机号登录'
              />
              <Tabs.TabPane
                key="email"
                tab='邮箱登录'
              />
            </Tabs>

            {status === 'error' && loginType === 'nickname' && (
              <LoginMessage
                content='账户或密码错误（admin/ant.design)'
              />
            )}
            {type === 'nickname' && (
              <>
                <ProFormText
                  name="username"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder='用户名: Super or Visitor'
                  rules={[
                    {
                      required: true,
                      message: '用户名是必填项！',
                    },
                  ]}
                />
              </>
            )}
            {type === 'mobile' && (
              <>
                <ProFormText
                  fieldProps={{
                    size: 'large',
                    prefix: <MobileOutlined className={styles.prefixIcon} />,
                  }}
                  name="mobile"
                  placeholder='手机号'
                  rules={[
                    {
                      required: true,
                      message: '手机号是必填项！',
                    },
                    {
                      pattern: /^1\d{10}$/,
                      message: '不合法的手机号！',
                    },
                  ]}
                />
              </>
            )}
            {type === 'email' && (
              <>
                <ProFormText
                  fieldProps={{
                    size: 'large',
                    prefix: <MailOutlined className={styles.prefixIcon} />,
                  }}
                  name="email"
                  placeholder='邮箱'
                  rules={[
                    {
                      required: true,
                      message: '邮箱是必填项！',
                    },
                    {
                      pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                      message: '邮箱格式不正确!',
                    },
                  ]}
                />
              </>
            )}
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder='密码: 123456'
              rules={[
                {
                  required: true,
                  message: '密码是必填项！',
                },
              ]}
            />
          </ProForm>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
