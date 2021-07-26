import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { message, notification } from 'antd';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import type { RequestInterceptor, RequestOptionsInit, ResponseError } from 'umi-request';
import { currentUser as queryCurrentUser,currentMenu as queryCurrentMenu } from '@/pages/auth/Login/services';
import { getToken,getUid } from '@/utils/utils'

const loginPath = '/auth/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: AuthAPI.CurrentUser;
  currentMenu?: AuthAPI.CurrentMenu[];
  fetchUserInfo?: (uid:number) => Promise<AuthAPI.CurrentUser | undefined>;
  fetchMenu?: (uid:number) => Promise<AuthAPI.CurrentMenu[] | undefined>;
}> {
  const fetchUserInfo = async (uid:number) => {
    try {
      const currentUser = await queryCurrentUser(uid);
      return currentUser;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };

  const fetchMenu = async (uid:number) => {
    try {
      const currentMenu = await queryCurrentMenu(uid);
      return currentMenu;
    } catch (error) {
      message.error('获取菜单失败',5)
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const _uid = getUid()
    const currentUser = await fetchUserInfo(_uid);
    const currentMenu = await fetchMenu(_uid);
    return {
      fetchUserInfo,
      fetchMenu,
      currentUser,
      currentMenu,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    fetchMenu,
    settings: {},
  };
}

/*
 * 异常处理程序
 const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    405: '请求方法不被允许。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
 };
 * @see https://beta-pro.ant.design/docs/request-cn
 */

const requestInterceptor: RequestInterceptor = (url: string,options: RequestOptionsInit) => {
  return {
    url,
    options: {
      ...options,
      headers: {
        //token: getToken()!,
        //Authorization:'Basic ' + btoa('username' + ":" + 'password')
        Authorization:'Basic ' + btoa(getToken()! + ":")
      }
    }
  }
}

export const request: RequestConfig = {
  errorHandler: (error: ResponseError) => {
    const { response } = error;

    if (response && response.status) {
      const { status, statusText, url } = response;
      const requestErrorMessage = '请求错误';
      const errorMessage = `${requestErrorMessage} ${status}: ${url}`;
      const errorDescription = statusText;
     /*  notification.error({
        message: errorMessage,
        description: errorDescription,
      }); */
      console.log('errorMessage',errorMessage)
      console.log('errorDescription',errorDescription)
    }

    if (!response) {
      notification.error({
        description: '您的网络发生异常，无法连接服务器',
        message: '网络异常',
      });
    }
    throw error;
  },
  requestInterceptors: [requestInterceptor]
};

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    /* waterMarkProps: {
      content: initialState?.currentUser?.name,
    }, */
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    //menuHeaderRender: undefined,
    // 后端菜单
    menuDataRender:()=>{
      return initialState?.currentMenu
    },
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};
