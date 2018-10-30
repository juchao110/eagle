import Vue from 'vue'
import Router from 'vue-router'


const Index = r => require.ensure([], () => r(require('../pages/index/index.vue')), 'index')


const Login = r => require.ensure([], () => r(require('../pages/login/login.vue')), 'login')

/*
 ****************************************metrics****************************************
 */
const MetricsModule = r => require.ensure([], () => r(require('../pages/metrics/module.vue')), 'metricsmodule')
const OverView = r => require.ensure([], () => r(require('../pages/metrics/overview.vue')), 'overview')
const PoolView = r => require.ensure([], () => r(require('../pages/metrics/poolview.vue')), 'poolview')
const RackView = r => require.ensure([], () => r(require('../pages/metrics/rackview.vue')), 'rackview')


/*
 ****************************************mointor****************************************
 */
const MonitorModule = r => require.ensure([], () => r(require('../pages/monitor/module.vue')), 'monitormodule')
const AlarmList = r => require.ensure([], () => r(require('../pages/monitor/alarmlist.vue')), 'alarmlist')
const MonitorStatus = r => require.ensure([], () => r(require('../pages/monitor/monitorstatus.vue')), 'monitorstatus')


/*
 ****************************************customer****************************************
 */
const CustomerModule = r => require.ensure([], () => r(require('../pages/customer/module.vue')), 'customermodule')
const CustomerList = r => require.ensure([], () => r(require('../pages/customer/customerlist.vue')), 'customerlist')
const CustomerOverView = r => require.ensure([], () => r(require('../pages/customer/overview.vue')), 'ccustomeroverview')
const CustomerPoolView = r => require.ensure([], () => r(require('../pages/customer/poolview.vue')), 'ccustomerpoolview')
const CustomerRackView = r => require.ensure([], () => r(require('../pages/customer/rackview.vue')), 'ccustomerrackview')



Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [{
      path: '',
      redirect: '/index'
    },
    {
      path: '*',
      redirect: '/index'
    },
    {
      path: '/index',
      component: Index,
      meta: {
        title: '首页',
        requireAuth: true
      }
    },
    {
      path: '/login',
      component: Login,
      meta: {
        title: '登录',
        requireAuth: false
      }
    },
    {
      path: '/metrics',
      name: 'MetricsModule',
      component: MetricsModule,
      meta: {
        title: '指标数据',
        requireAuth: true,
        icon: 'metrics'
      },
      children: [{
          path: '',
          redirect: 'overview'
        },
        {
          path: 'overview',
          name: 'OverView',
          component: OverView,
          meta: {
            title: '矿场总览'
          }
        },
        {
          path: 'poolview',
          name: 'PoolView',
          component: PoolView,
          meta: {
            title: '矿场详情',
            hidden: true
          }
        },
        {
          path: 'rackview',
          name: 'RackView',
          component: RackView,
          meta: {
            title: '机架详情',
            hidden: true
          }
        }
      ]
    },
    {
      path: '/customer',
      name: 'CustomerModule',
      component: CustomerModule,
      meta: {
        title: '客户管理',
        requireAuth: true,
        icon: 'customer'
      },
      children: [{
          path: '',
          redirect: 'customerlist'
        },
        {
          path: 'customerlist',
          component: CustomerList,
          name: 'CustomerList',
          meta: {
            title: '客户列表'
          }
        },
        {
          path: 'overview',
          component: CustomerOverView,
          name: 'CustomerOverView',
          meta: {
            title: '客户矿场总览',
            hidden: true
          }
        },
        {
          path: 'poolview',
          component: CustomerPoolView,
          name: 'CustomerPoolView',
          meta: {
            title: '客户矿场详情',
            hidden: true
          }
        },
        {
          path: 'rackview',
          component: CustomerRackView,
          name: 'CustomerRackView',
          meta: {
            title: '客户机架详情',
            hidden: true
          }
        }
      ]
    },
    {
      path: '/monitor',
      name: 'MonitorModule',
      component: MonitorModule,
      meta: {
        title: '报警与监控',
        requireAuth: true,
        icon: 'alarm'
      },
      children: [{
          path: '',
          redirect: 'alarmlist'
        },
        {
          path: 'monitorstatus',
          component: MonitorStatus,
          name: 'MonitorStatus',
          meta: {
            title: '矿机状态监控汇总'
          }
        },
        {
          path: 'alarmlist',
          component: AlarmList,
          name: 'AlarmList',
          meta: {
            title: '极端异常报警',
            roles: ['Admin', 'PoolAdmin']
          }
        }
      ]
    }
  ]
})