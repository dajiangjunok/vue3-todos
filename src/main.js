import { createApp, h, render } from 'vue'
import {createRouter, createWebHashHistory} from 'vue-router'
import App from './App.vue'
import EditTodo from './components/todos/EditTodo.vue'

const router = createRouter({
  history:createWebHashHistory(),
  routes:[
    {
      path:'/',
      name:'todo',
      component:()=> import('./components/todos/Todos.vue')
    },
    {
      path:'/about',
      name:'about',
      component:()=> import('./views/About.vue')
    }
  ]
})

/**
 * 动态路由
 */
router.addRoute({
  path:'/demo',
  name:'demo',
  component:()=>import('./views/Demo.vue')
})

router.addRoute('demo',{
  path:'/demo/child',
  name:'child',
  component:{
    render(){
      return h('div','info page')
    }
  }
})

// compsition结合

createApp(App)
  .use(router)
  .component('EditTodo', EditTodo)
  .mount('#app')
