import Vue from 'vue'
import Router from 'vue-router'

import Full from '@/containers/Full'
import AdminFull from '@/containers/AdminFull'

import Exchange from '@/views/Exchange'
import Transactions from '@/views/Transactions'
import Transaction from '@/views/Transaction'
import Users from '@/views/Users'
import User from '@/views/User'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/exchange',
      name: 'Home',
      component: Full,
      children: [
        {
          path: 'exchange',
          name: 'Exchange',
          component: Exchange,
        },
      ],
    },
    {
      path: '/admin',
      redirect: '/admin/transactions',
      name: 'Admin',
      component: AdminFull,
      children: [
        {
          path: 'transactions',
          name: 'Transactions',
          component: Transactions,
        },
        {
          path: 'transactions/:id',
          name: 'Transaction',
          component: Transaction,
        },
        {
          path: 'users',
          name: 'Users',
          component: Users,
        },
        {
          path: 'users/:id',
          name: 'User',
          component: User,
        },
      ],
    },
  ],
})
