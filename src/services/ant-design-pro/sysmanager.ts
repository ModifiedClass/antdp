// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export const url = {
  action: '/api/v1/action',
  permission: '/api/v1/permission',
  group: '/api/v1/group',
  scope: '/api/v1/scope',
  allowaccess: '/api/v1/allowaccess',
  department: '/api/v1/department',
  user: '/api/v1/user'
}

// action
export const getAction = async(
  params?: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) => {
  return request<API.Action>(url.action+'/collection', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改新建 */
export const couAction = async(params:API.Action,options?: { [key: string]: any }) => {
  return request<API.Action>(url.action, {
    method: params.id! > 0 ? 'PUT':'POST',
    data:params,
    ...(options || {}),
  });
}

/** 删除 */
export const deleteAction = async(params:API.Action,options?: { [key: string]: any }) => {
  return request<Record<string, any>>(url.action, {
    method: 'DELETE',
    data:params,
    ...(options || {}),
  });
}

// permission
/** 获取权限列表 */
export const getPermission = async(
  params?: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) => {
  return request<API.Permission>(url.permission, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改权限 */
export const updatePermission = async(options?: { [key: string]: any }) => {
  return request<API.Permission>(url.permission, {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建权限 */
export const createPermission = async(options?: { [key: string]: any }) => {
  return request<API.Permission>(url.permission, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除权限 */
export const deletePermission = async(options?: { [key: string]: any }) => {
  return request<Record<string, any>>(url.permission, {
    method: 'DELETE',
    ...(options || {}),
  });
}

// group
export const getGroup = async (
  params: {
    // query
    name?: string;
  },
  options?: { [key: string]: any },
) => {
  return request<API.Group>(url.group, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export const couGroup = async (
  params: {
    id?: string;
    name?: string;
  },
  options?: { [key: string]: any },
) => {
  return request<API.Group>(url.group, {
    method: params.id?'put':'post',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export const deleteGroup = async (id: string,options?: { [key: string]: any }) => {
  return request<API.Group>(url.group, {
    method: 'DELETE',
    params: {
      id:id,
    },
    ...(options || {})
  });
}

// allowaccess
export const getAllowAccess = async (
  params: {
    // query
    name?: string;
  },
  options?: { [key: string]: any },
) => {
  return request<API.AllowAccess>(url.allowaccess, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export const couAllowAccess = async (
  params: {
    id?: string;
    name?: string;
  },
  options?: { [key: string]: any },
) => {
  return request<API.AllowAccess>(url.allowaccess, {
    method: params.id?'put':'post',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export const deleteAllowAccess = async (id: string,options?: { [key: string]: any }) => {
  return request<API.AllowAccess>(url.allowaccess, {
    method: 'DELETE',
    params: {
      id:id,
    },
    ...(options || {})
  });
}

// scope
export const getScope = async (
  params: {
    // query
    name?: string;
  },
  options?: { [key: string]: any },
) => {
  return request<API.Scope>(url.scope, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export const couScope = async (
  params: {
    id?: string;
    name?: string;
  },
  options?: { [key: string]: any },
) => {
  return request<API.Scope>(url.scope, {
    method: params.id?'put':'post',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export const deleteScope = async (id: string,options?: { [key: string]: any }) => {
  return request<API.Scope>(url.scope, {
    method: 'DELETE',
    params: {
      id:id,
    },
    ...(options || {})
  });
}