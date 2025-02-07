<template>
  <div id="app">
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar
  }
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
