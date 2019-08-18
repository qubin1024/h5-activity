import Vue from 'vue'
import Router from 'vue-router'
import ContentT from "../components/index";
import Info from "../components/info.vue";
import page1Edit from "../components/1pageEdit"
import page1Info from "../components/1pageInfo"
import page2Edit from "../components/2pageEdit"
import page2Info from "../components/2pageInfo"
import page3Edit from "../components/3pageEdit"
import page3Info from "../components/3pageInfo"
import page4Edit from "../components/4pageEdit"
import page4Info from "../components/4pageInfo"
import payInfo from "../components/payInfo"
import egg from "../components/egg"
import eggEdit from "../components/eggEdit"
import appEgg from "../components/appEgg"



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/info',
      name: 'info',
      component: Info
    },
    {
      path: '/edit',
      name: 'edit',
      component: ContentT
    },
    {
      path: '/1pageEdit',
      name: '1pageEdit',
      component: page1Edit
    },
    {
      path: '/1pageInfo',
      name: '1pageInfo',
      component: page1Info
    },
    {
      path: '/2pageEdit',
      name: '2pageEdit',
      component: page2Edit
    },
    {
      path: '/2pageInfo',
      name: '2pageInfo',
      component: page2Info
    },
    {
      path: '/3pageEdit',
      name: '3pageEdit',
      component: page3Edit
    },
    {
      path: '/3pageInfo',
      name: '3pageInfo',
      component: page3Info
    },
    {
      path: '/4pageEdit',
      name: '4pageEdit',
      component: page4Edit
    },
    {
      path: '/4pageInfo',
      name: '4pageInfo',
      component: page4Info
    },
    {
      path: '/egg',
      name: 'egg',
      component: egg
    },
    {
      path: '/app',
      name: 'app',
      component: appEgg
    },
    {
      path: '/eggEdit',
      name: 'eggEdit',
      component: eggEdit
    },
    {
      path: '/payInfo',
      name: 'payInfo',
      component: payInfo
    }
  ]
})
