<template>
  <input type="text" :value="modelValue" @input="onInputChange" v-bind="$attrs" />
</template>

<script>
import { reactive, toRefs } from "vue"
export default {
  name: "EditTodo",
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  methods: {
    onInputChange(e) {
      this.$emit('update:modelValue', e.target.value)
    }
  }
}
</script>

<style   scoped>
</style>
