import { request } from 'umi'

export const url = {
  department: '/api/v1/department',
}

// department
export const getDepartment = async(
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
  return request<DepartmentTypeAPI.Department>(url.department+'/collection', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改新建 */
export const couDepartment = async(params:DepartmentTypeAPI.Department,options?: { [key: string]: any }) => {
  return request<DepartmentTypeAPI.Department>(url.department, {
    method: params.id! > 0 ? 'PUT':'POST',
    data:params,
    ...(options || {}),
  });
}

/** 删除 */
export const deleteDepartment = async(params:number,options?: { [key: string]: any }) => {
  return request<Record<string, any>>(url.department, {
    method: 'DELETE',
    data:{id:params},
    ...(options || {}),
  });
}

// 层级部门
export const getTreeDepartments = async(options?: { [key: string]: any }) => {
  return request<DepartmentTypeAPI.Department[]>(url.department + '/treedepartments', {
    method: 'GET',
    ...(options || {}),
  });
}
