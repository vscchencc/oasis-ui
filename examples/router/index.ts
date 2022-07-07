/*
 * @@Description: router
 * @Author: chencc
 * @Date: 2022-07-06 16:51:38
 * @LastEditors: chencc
 * @LastEditTime: 2022-07-06 16:55:09
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import { defineAsyncComponent } from 'vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/button',
    name: 'button',
    component: () => import('../views/Button.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;
