import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Item from '../views/Item.vue'
import Welcome from '../views/Welcome.vue'
import Cart from '../views/Cart.vue'
import Paid from '../views/Paid.vue'
import PlaceOrder from '../views/PlaceOrder.vue'
import Orders from '../views/Orders.vue'
import CRUD from '../views/admin/CRUD.vue'
import Login from '../views/admin/Login.vue'
import Admin from '../views/admin/Admin.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/welcome',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/home/:id',
      name: 'home',
      component: Home
    },
    {
      path: '/item/:id',
      name: 'itemPage',
      component: Item
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/place-order',
      name : 'place-order',
      component: PlaceOrder
    },
    {
      path: '/orders',
      name : 'orders',
      component: Orders
    },

    {
      path : '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/category',
      name : 'category',
      //component: Category
      component: CRUD
    },
    {
      path: '/sub-category',
      name : 'subcategory',
      //component: Category
      component: CRUD
    },
    {
      path: '/item',
      name : 'item',
      //component: Category
      component: CRUD
    },
    {
      path: '/',
      name : 'login',
      component: Login
    },
    {
      path: '/paid',
      name : 'paid',
      component: Paid
    }
  ]
})

export default router
