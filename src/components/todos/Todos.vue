<template>
  <div class="todos">
    <!-- 新增Todo -->
    <EditTodo
      v-model="newTodo"
      @keyup.enter="addTodo"
      autofocus="false"
      placeholder="请输入新增待办"
      autocomplete="off"
    ></EditTodo>
    <!-- todo的列表 -->
    <ul>
      <TodoItem
        v-model:editTodoData="editTodoData"
        v-for="(item,index) in filterdTodos"
        :key="item.id"
        :todo="item"
        @handleDeleteTodo="handleDeleteTodo"
      ></TodoItem>
    </ul>

    <!-- 过滤 -->
    <Filter :items="filterItems" v-model="visibility" />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue"

import TodoItem from './TodoItem.vue'
import Filter from './Filter.vue'
import { useTodos } from './useTodos.js'
import { useFilters } from './useFilters.js'

export default {
  name: "Todos",
  components: {
    TodoItem,
    Filter
  },
  setup() {
    const todoState = reactive({
      newTodo: '',
      editTodoData: null,
    })

    const { todos, addTodo, handleDeleteTodo } = useTodos(todoState)
    const filterState = useFilters(todos)

    return {
      ...toRefs(todoState),
      ...toRefs(filterState),
      addTodo,
      handleDeleteTodo,
    }
  },
}
</script>

<style lang="scss" scoped>
.todos {
  text-align: center;
}
</style>
