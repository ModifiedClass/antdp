import { request } from 'umi'

export const url = {
  menu: '/api/v1/menu',
}

// menu
export const getMenu = async(
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
  return request<MenuTypeAPI.Menu>(url.menu+'/collection', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改新建 */
export const couMenu = async(params:MenuTypeAPI.Menu,options?: { [key: string]: any }) => {
  return request<MenuTypeAPI.Menu>(url.menu, {
    method: params.id! > 0 ? 'PUT':'POST',
    data:params,
    ...(options || {}),
  });
}

/** 删除 */
export const deleteMenu = async(params:number,options?: { [key: string]: any }) => {
  return request<Record<string, any>>(url.menu, {
    method: 'DELETE',
    data:{id:params},
    ...(options || {}),
  });
}
