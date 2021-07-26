export default [
  {
    path: '/auth',
    layout: false,
    routes: [
      {
        path: '/auth',
        routes: [
          {
            name: '登录',
            path: '/auth/login',
            component: './auth/Login',
          },
        ],
      },
    ],
  },
  {
    name: '人事管理',
    icon: 'table',
    path: '/hrm',
    routes: [
      {
        path: '/hrm/department',
        name: '部门',
        icon: '',
        component: './hrm/Department',
      },
      {
        path: '/hrm',
        redirect: '/hrm/department',
      }
    ]
  },
  {
    name: '权限管理',
    icon: 'control',
    path: '/permission',
    routes: [
      {
        path: '/permission/menu',
        name: '菜单',
        icon: '',
        component: './permission/Menu',
      },
      {
        path: '/permission/rule',
        name: '规则',
        icon: '',
        component: './permission/Rule',
      },
      {
        path: '/permission/group',
        name: '组',
        icon: '',
        component: './permission/Group',
      },
      {
        path: '/permission/user/*',
        component: './permission/user/components/Detailpage',
      },
      {
        path: '/permission/user',
        name: '用户',
        icon: '',
        component: './permission/User',
      },
      {
        path: '/permission',
        redirect: '/permission/User',
      }
    ],
  },
  {
    path: '/',
    redirect: '/permission/User',
  },
  {
    component: './404',
  },
];
