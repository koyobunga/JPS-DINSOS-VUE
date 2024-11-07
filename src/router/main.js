import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/starter/Login.vue'
import Logout from '../views/starter/Logout.vue'
import Register from '../views/starter/Register.vue'
import Home from '../views/home/Home.vue'
import Homeoffline from '../views/home/Home-offline.vue'
import Opsi from '../views/home/Opsi.vue'
import Kpm from '../views/wil/Kpm.vue'

import auth from '../middleware/auth.js'
import log from '../middleware/log.js'
import check from '../middleware/check.js'



const router = createRouter({
  history: createWebHistory(`/mobi`),
  base: `/mobi`,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        middleware: check,
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta:{
        middleware: check,
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      props:  { newsletterPopup: false },
      meta: {
        middleware: [auth]
      }
    },
    {
      path: '/home-offline',
      name: 'Home-offline',
      component: Homeoffline,
      props:  { newsletterPopup: false },
      meta: {
        middleware: [auth]
      }
    },
    {
      path: '/opsi',
      name: 'Opsi',
      component: Opsi,
      meta: {
        middleware: [auth]
      }
    },

    {
      path: '/kpm',
      name: 'Kpm',
      component: Kpm,
      meta:{
        middleware: [auth]
      }
    },

    {
      path: '/logout',
      component: Logout
    }
  ],
  mode: 'history',
})


function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});


export default router
