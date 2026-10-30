import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import GroupView from './views/GroupView.vue'
import ToolView from './views/ToolView.vue'

// hash 模式：靜態部署不需額外設定伺服器轉址
export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/:cat', component: GroupView, props: true },
    { path: '/:cat/:tool', component: ToolView, props: true },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})
