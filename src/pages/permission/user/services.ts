import { request } from 'umi'
import { excelDownload } from '@/utils/filedownload'

export const url = {
  user: '/api/v1/user',
}

// user
export const getUser = async(
  params?: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
    /** 其他不固定参数 */
    [key:string]:any;
  },
  options?: { [key: string]: any },
) => {
  return request<UserTypeAPI.User>(url.user+'/collection', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改新建 */
export const couUser = async(params:UserTypeAPI.User,options?: { [key: string]: any }) => {
  return request<UserTypeAPI.User>(url.user, {
    method: params.id! > 0 ? 'PUT':'POST',
    data:params,
    ...(options || {}),
  });
}

/** 删除 */
export const deleteUser = async(params:number,options?: { [key: string]: any }) => {
  return request<Record<string, any>>(url.user, {
    method: 'DELETE',
    data:{id:params},
    ...(options || {}),
  });
}

/** 分组 */
export const userGrouping = async(params:UserTypeAPI.User,options?: { [key: string]: any }) => {
  return request<UserTypeAPI.User>(url.user+'/groups', {
    method:'PUT',
    data:params,
    ...(options || {}),
  });
}

/** 重置密码 */
export const resetPassword = async(params:UserTypeAPI.User,options?: { [key: string]: any }) => {
  return request<UserTypeAPI.User>(url.user+'/resetpassword', {
    method: 'PUT',
    data:params,
    ...(options || {}),
  });
}

/** 上传头像 */
export const userAvatar = async(params:UserTypeAPI.User,options?: { [key: string]: any }) => {
  return request<UserTypeAPI.User>(url.user+'/avatar', {
    method: 'POST',
    data:params,
    ...(options || {}),
  });
}


/** 部门分配 */
export const userDepartment = async(params:UserTypeAPI.User,options?: { [key: string]: any }) => {
  return request<UserTypeAPI.User>(url.user+'/departments', {
    method: 'PUT',
    data:params,
    ...(options || {}),
  });
}

/** 导出表格 */
// parmas:{create_time_start:'',create_time_end:''}
export const userExport =  (params:{}) => {
  excelDownload(url.user+'/export',params)
}