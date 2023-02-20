export const routeModel: Record<Auth.RoleType, AuthRoute.Route[]> = {
  super: [
    {
      name: 'dashboard',
      path: '/dashboard',
      component: 'basic',
      children: [
        {
          name: 'dashboard_analysis',
          path: '/dashboard/analysis',
          component: 'self',
          meta: {
            title: '能耗评价',
            requiresAuth: true,
            icon: 'icon-park-outline:analysis'
          }
        },
      ],
      meta: {
        title: '工作台',
        icon: 'mdi:monitor-dashboard',
        order: 1
      }
    }
  ],
  admin: [],
  user: []
};
