<!-- NavLink -->
<template>
  <a :class="{active:isActive}"
       @click="navigate">
    {{route.name}}
  </a>
</template>

<script >
import { reactive, toRefs } from 'vue'
import { RouterLink, useLink } from 'vue-router'
export default {
  name: 'NavLink',
  props: {
    ...RouterLink.props,
    inactiveClass: String
  },
  setup (props) {
    console.log( useLink(props));
    const data = reactive({

    })
    const { route, href, isActive, isExactActive, navigate } = useLink(props)
    // console.log(router, href, isActive, isExactActive, navigate);
    const refData = toRefs(data);
    return {
      ...refData,
      route,
      isActive,
      navigate
    }

  }
};
</script>
<style lang='scss' scoped>
.active{
  background-color: #3fb983;
}
</style>