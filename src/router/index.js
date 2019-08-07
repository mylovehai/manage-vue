import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/components/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/components/manage')), 'manage');
const myshop = r => require.ensure([], () => r(require('@/components/myshop')), 'myshop');
const classify = r => require.ensure([], () => r(require('@/components/classify')), 'classify');
const add_commodity = r => require.ensure([], () => r(require('@/components/add_commodity')), 'add_commodity');
const HelloWorld = r => require.ensure([], () => r(require('@/components/HelloWorld')), 'HelloWorld');
const my_menu = r => require.ensure([], () => r(require('@/components/my_menu')), 'my_menu');
const order = r => require.ensure([], () => r(require('@/components/order')), 'order');

const login2 = r => require.ensure([], () => r(require('@/page/login')), 'login');

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,

    },
    {
      path: '/manage',
      name: 'manage',
      component: manage,
      children: [
        {
          path: '/myshop',
          name: 'myshop',
          component: myshop,
        },
        {
          path: '/classify',
          name: 'classify',
          component: classify,
        }, {
          path: '/add_commodity',
          name: 'add_commodity',
          component: add_commodity,
        }, {

          path: '/my_menu',
          name: 'my_menu',
          component: my_menu,
        }, {
          path: '/order',
          name: 'order',
          component: order,

        }

      ]

    }

  ]
})


export default router;
