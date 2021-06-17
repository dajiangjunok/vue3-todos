<template>
  <p class="filters">
    <span
      v-for="item in items"
      :key="item.value"
      @click="$emit('update:modelValue', item.value)"
      :class="{ selected: modelValue === item.value }"
    >{{ item.label }}</span>
  </p>
</template>

<script>

export default {
  name: "Filter",
  props: ['items', 'modelValue'],
  emits: ['update:modelValue']
}
</script>

<style  scoped>
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
</style>
