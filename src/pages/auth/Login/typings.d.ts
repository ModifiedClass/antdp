// @ts-ignore
/* eslint-disable */

declare namespace AuthAPI {
  type CurrentUser = {
    nickname?: string;
    avatar?: string;
    gender?: number;
    uid?: number;
    email?: string;
    id_number?:string;
    last_login_time?:string
    group?: string;
    mobile?: string;
    realname?:string;
    [key: string]: any;
  };

  type CurrentMenu = {
    id?: number;
    current_rules?: string[] | string;
    children?: MenuDataItem[];
    hide_children?: boolean;
    hide_self?: boolean;
    icon?: string;
    component?: string;
    name?: string;
    path: string;
    sort?:mubber;
    [key: string]: any;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
    uid?: number | undefined;
    token?: string | undefined;
  };

  type LoginParams = {
    email?: string | undefined;
    mobile?: string | undefined;
    nickname?: string | undefined;
    username?: string | undefined;
    account?: string | undefined;
    secret?: string | undefined;
    password?: string | undefined;
    type?: string | undefined;
  };

}
