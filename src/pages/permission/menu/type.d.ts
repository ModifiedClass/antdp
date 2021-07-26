// @ts-ignore
/* eslint-disable */

declare namespace MenuTypeAPI {

  type Menu = {
    id?: number;
    name?: string;
    remark?: string;
    create_time?: string;
    current_rules?: string[] | string;
    children?: MenuDataItem[];
    hide_children?: boolean;
    hide_self?: boolean;
    icon?: string;
    component?: string;
    path?: string;
    sort?:mubber;
    [key: string]: any;
  };

}
  