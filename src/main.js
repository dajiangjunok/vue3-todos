import { createApp, h } from 'vue'
import App from './App.vue'
import EditTodo from './components/todos/EditTodo.vue'

createApp(App)
  .component('EditTodo', EditTodo)
  .mount('#app')
