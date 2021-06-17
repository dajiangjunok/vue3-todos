import { ref, watchEffect } from 'vue'
// 缓存操作
const todoStorage = {
  fetch () {
    let todos = JSON.parse(localStorage.getItem('vue3-todos')) || []
    return todos
  },
  save (todos) {
    localStorage.setItem('vue3-todos', JSON.stringify(todos))
  }
}

// todos: todoStorage.fetch()
export function useTodos (state) {
  const todos = ref(todoStorage.fetch())

  watchEffect(() => {
    todoStorage.save(todos.value)
  })

  function addTodo () {
    if (!state.newTodo.trim()) return
    todos.value.unshift({
      id: new Date().getTime(),
      title: state.newTodo.trim(),
      completed: false
    })
    state.newTodo = ''
  }

  function handleDeleteTodo (index) {
    todos.value.splice(index, 1)
  }

  return {
    todos,
    addTodo,
    handleDeleteTodo
  }
}