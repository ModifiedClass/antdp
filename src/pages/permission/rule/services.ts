import { request } from 'umi'

export const url = {
  rule: '/api/v1/rule',
}

// rule
export const getRule = async(
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
  return request<RuleTypeAPI.Rule>(url.rule+'/collection', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改新建 */
export const couRule = async(params:RuleTypeAPI.Rule,options?: { [key: string]: any }) => {
  return request<RuleTypeAPI.Rule>(url.rule, {
    method: params.id! > 0 ? 'PUT':'POST',
    data:params,
    ...(options || {}),
  });
}

/** 删除 */
export const deleteRule = async(params:number,options?: { [key: string]: any }) => {
  return request<Record<string, any>>(url.rule, {
    method: 'DELETE',
    data:{id:params},
    ...(options || {}),
  });
}
