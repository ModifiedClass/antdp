import { request } from 'umi'
// import { MenuDataItem } from '@ant-design/pro-layout'


/** 登录接口 POST /api/login/account */
export async function login(body: AuthAPI.LoginParams, options?: { [key: string]: any }) {
    const params:{
        type:number | undefined,
        account:string | undefined,
        secret:string | undefined
    } = {type:100,account:'',secret:body.password}
    switch(body.type){
        case 'email':
            params.type=100
            params.account = body.email
            break
        case 'mobile':
            params.type=101
            params.account = body.mobile
            break
        case 'nickname':
            params.type=102
            params.account = body.username
            break
        default:
            break
    }
    return request<AuthAPI.LoginResult>('/api/v1/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
      ...(options || {}),
    });
  }

  
  
  /** 获取当前的用户 GET /api/currentUser */
  export async function currentUser(uid:number,options?: { [key: string]: any }) {
    return request<AuthAPI.CurrentUser>('/api/v1/token/userinfo', {
      method: 'GET',
      params: {uid:uid},
      ...(options || {}),
    });
  }
  
  /** 获取当前用户的菜单 GET /api/currentMenu */
  export async function currentMenu(uid:number,options?: { [key: string]: any }) {
    return request<AuthAPI.CurrentMenu[]>('/api/v1/token/usermenu', {
      method: 'GET',
      params: {uid:uid},
      ...(options || {}),
    });
  }
  
  /** 退出登录接口 POST /api/login/outLogin */
  export async function outLogin(options?: { [key: string]: any }) {
    localStorage.removeItem('token')
    localStorage.removeItem('uid')
    /* return request<Record<string, any>>('/api/login/outLogin', {
      method: 'POST',
      ...(options || {}),
    }); */
  }