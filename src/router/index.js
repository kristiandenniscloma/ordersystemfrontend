import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Item from '../views/Item.vue'
import Welcome from '../views/Welcome.vue'
import Cart from '../views/Cart.vue'
import PlaceOrder from '../views/PlaceOrder.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/home/:id',
      name: 'home',
      component: Home
    },
    {
      path: '/item/:id',
      name: 'item',
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
    }
  ]
})

export default router
