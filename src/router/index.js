import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)

const routers = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Index",
      component: () => import("@/pages/index")
    },
    {
      path: "/sports/init",
      name: "Init",
      component: () => import("@/platform/PAY/v-init"),
      meta: {
        title: "支付",
        id: "sports-init"
      }
    },
    {
      path: "/sports/go",
      name: "Go",
      component: () => import("@/platform/PAY/v-go"),
      meta: {
        title: "公告订单详情",
        id: "sports-go"
      }
    },
    {
      path: "/sports/auto",
      name: "Auto",
      component: () => import("@/platform/PAY/v-auto"),
      meta: {
        title: "公告订单详情",
        id: "sports-go"
      }
    },
    {
      path: '/charge/status/:id',
      name: 'chargeStatus',
      component: () => import('@/pages/charge-status'),
      meta: {
        title: '充值状态',
        id: 'chargeStatus'
      }
    },
    {
      path: '/apply/status/:id',
      name: 'applyStatus',
      component: () => import('@/pages/apply-status'),
      meta: {
        title: '提现状态',
        id: 'applyStatus'
      }
    },
    {
      path: "/404",
      name: "404",
      component: () => import("@/pages/not-found")
    },
    {
      path: "*",
      redirect: "/404"
    },

  ]
})
export default routers
