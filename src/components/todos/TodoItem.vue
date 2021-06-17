<template>
  <li :class="{ completed: todo.completed, editing: todo === editTodoData }">
    <!-- 绑定完成状态 -->
    <div class="view">
      <input type="checkbox" v-model="todo.completed" />
      <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
      <button @click="handleDeleteTodo(index)">x</button>
    </div>

    <!-- 编辑特办 -->
    <EditTodo
      type="text"
      class="edit"
      v-model="todo.title"
      v-todo-focus="todo === editTodoData"
      @blur="doneEdit(todo)"
      @keyup.enter="doneEdit(todo)"
      @keyup.escape="cancel(todo)"
    />
  </li>
</template>

<script>
import { reactive, toRefs } from "vue"
export default {
  name: "TodoItem",
  props: {
    todo: {
      type: Object,
      require: true
    },
    editTodoData: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['handleDeleteTodo', 'update:editTodoData'],
  setup(props, { emit }) {
    const data = reactive({
      beforeEditCache: ''
    })
    const refData = toRefs(data)

    function handleDeleteTodo(index) {
      emit('handleDeleteTodo', index)
    }

    function editTodo(todo) {
      data.beforeEditCache = todo.title
      // data.editTodoData = todo
      emit('update:editTodoData', todo)
    }

    function cancel(todo) {
      todo.title = data.beforeEditCache
      // data.editTodoData = null
      emit('update:editTodoData', null)
    }

    function doneEdit(todo) {
      // data.editTodoData = null
      emit('update:editTodoData', null)
    }
    return {
      ...refData,
      editTodo,
      cancel,
      doneEdit,
      handleDeleteTodo
    }
  },
  directives: {
    "todo-focus": (el, { value }) => {
      if (value) {
        el.focus()
      }
    }
  }
}
</script>
<style scoped>
.completed {
  text-decoration: line-through;
}

.edit,
.editing .view {
  display: none;
}

.view,
.editing .edit {
  display: block;
}
</style>
 