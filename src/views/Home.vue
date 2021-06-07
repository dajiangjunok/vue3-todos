<template>
  <div class="home">
    <!-- 新增Todo -->
    <input type="text"
           v-model="newTodo"
           @keyup.enter="addTodo"
           autofocus="false"
           placeholder="请输入新增待办"
           autocomplete="off" />

    <!-- todo的列表 -->
    <ul>
      <li v-for="(item,index) in filterdTodos"
          :key="item.id"
          :class="{completed:item.completed,editing:item === editTodoData}">
        <!-- 绑定完成状态 -->
        <div class="view">
          <input type="checkbox"
                 v-model="item.completed">
          <label @dblclick="editTodo(item)">{{item.title}}</label>
          <button @click="handleDeleteTodo(index)">x</button>
        </div>

        <!-- 编辑特办 -->
        <input type="text"
               class="edit"
               v-model="item.title"
               v-todo-focus="item === editTodoData"
               @blur="doneEdit(item)"
               @keyup.enter="doneEdit(item)"
               @keyup.escape="cancel(item)" />
      </li>
    </ul>

    <!-- 过滤 -->
    <p class="filters">
      <span @click="visibility = 'all'"
            :class="{selected:visibility === 'all'}">All</span>
      <span @click="visibility = 'active'"
            :class="{selected:visibility === 'active'}">Active</span>
      <span @click="visibility = 'completed'"
            :class="{selected:visibility === 'completed'}">Completed</span>
    </p>
  </div>
</template>

<script>
import { reactive, toRefs, computed, watchEffect } from "vue"

const filters = {
  all (todos) {
    return todos
  },
  active (todos) {
    return todos.filter(todo => !todo.completed)
  },
  completed (todos) {
    return todos.filter(todo => todo.completed)
  }
}

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

export default {
  name: "Home",
  setup () {
    const data = reactive({
      newTodo: '',
      todos: todoStorage.fetch(),
      beforeEditCache: '',
      editTodoData: null,
      visibility: 'all',
      filterdTodos: computed(() => {
        return filters[data.visibility](data.todos)
      })
    })

    watchEffect(() => {
      todoStorage.save(data.todos)
    })

    const refData = toRefs(data)

    function addTodo () {
      if (!data.newTodo.trim()) return
      data.todos.unshift({
        id: data.todos.length + 1,
        title: data.newTodo.trim(),
        completed: false
      })
      data.newTodo = ''
    }

    function handleDeleteTodo (index) {
      data.todos.splice(index, 1)
    }

    function editTodo (todo) {
      data.editTodoData = todo
    }

    function cancel (todo) {
      todo.title = data.beforeEditCache
      data.editTodoData = null
    }

    function doneEdit (todo) {
      data.editTodoData = null
    }


    return {
      ...refData,
      addTodo,
      handleDeleteTodo,
      editTodo,
      cancel,
      doneEdit
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

<style lang="scss" scoped>
.home {
  text-align: center;

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

  .filters > span {
    padding: 2px 4px;
    margin-right: 4px;
    border: 1px solid transparent;
    font-size: 12px;
    color: #666;
  }
  .filters > span.selected {
    border-color: rgba(172, 47, 47, 0.2);
    border-radius: 2px;
  }
}
</style>
