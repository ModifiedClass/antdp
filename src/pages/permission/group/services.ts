import { request } from 'umi'

export const url = {
  group: '/api/v1/group',
}

// group
export const getGroup = async(
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
  return request<GroupTypeAPI.Group>(url.group+'/collection', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改新建 */
export const couGroup = async(params:GroupTypeAPI.Group,options?: { [key: string]: any }) => {
  return request<GroupTypeAPI.Group>(url.group, {
    method: params.id! > 0 ? 'PUT':'POST',
    data:params,
    ...(options || {}),
  });
}

/** 删除 */
export const deleteGroup = async(params:number,options?: { [key: string]: any }) => {
  return request<Record<string, any>>(url.group, {
    method: 'DELETE',
    data:{id:params},
    ...(options || {}),
  });
}

/** 组规则 */
export const groupRule = async(params:GroupTypeAPI.Group,options?: { [key: string]: any }) => {
  return request<GroupTypeAPI.Group>(url.group+'/rules', {
    method: 'PUT',
    data:params,
    ...(options || {}),
  });
}