<template>
  <div class="home">
    <div class="link">
      <NavLink to="/" />
      <NavLink to="/about" />
      <NavLink to="/demo" />
      <NavLink to="/demo/child" />
      <!-- <router-link to="/"
                   tag="a">Todo</router-link>
      <router-link to="/about"
                   tag="a">About</router-link>
      <router-link to="/demo"
                   tag="a">Demo</router-link>
      <router-link to="/demo/child"
                   tag="a">demoChild</router-link> -->
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import NavLink from '../components/navlink/NavLink.vue'

export default {
  name: "Home",
  components: {
    NavLink
  }
}
</script>
<style scoped lang="scss">
.link {
  margin-bottom: 30px;

  a {
    padding: 0 20px;
  }
}
</style>
 
