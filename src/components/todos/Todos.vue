<template>
  <div class="todos">
    <!-- 新增Todo -->
    <EditTodo v-model="newTodo"
              @keyup.enter="addTodo"
              autofocus="false"
              placeholder="请输入新增待办"
              autocomplete="off"></EditTodo>
    <!-- todo的列表 -->
    <ul>
      <TodoItem v-model:editTodoData="editTodoData"
                v-for="item in filterdTodos"
                :key="item.id"
                :todo="item"
                @handleDeleteTodo="handleDeleteTodo"></TodoItem>
    </ul>

    <!-- 过滤 -->
    <Filter :items="filterItems"
            v-model="visibility" />

    <!-- 跳转到关于 -->
    <button @click="backToAbout">跳转到关于</button>
  </div>
</template>

<script>
import { reactive, toRefs, watch } from "vue"
import { useRouter, useRoute, onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";

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
  setup () {
    const todoState = reactive({
      newTodo: '',
      editTodoData: null,
    })

    const { todos, addTodo, handleDeleteTodo } = useTodos(todoState)
    const filterState = useFilters(todos)

    // 获取路由器的实例
    const router = useRouter()
    const route = useRoute()

    watch(() => route.query, query => {
      console.log(query);
    })

    // 路由守卫
    onBeforeRouteLeave((to, from) => {
      console.log(to, from);
      const answer = window.confirm('你确定要离开当前页面吗？')
      if (!answer) return false
    })
    onBeforeRouteUpdate((to, from) => {
      console.log(to, from);
    })

    return {
      ...toRefs(todoState),
      ...toRefs(filterState),
      addTodo,
      handleDeleteTodo,
      backToAbout () {
        router.push('/about')
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.todos {
  text-align: center;
}
</style>
