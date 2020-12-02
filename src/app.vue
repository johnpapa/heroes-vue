<template>
  <div id="app">
    <HeaderBar />
    <div class="section columns">
      <NavBar />
      <main class="column">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderBar from '@/components/header-bar.vue';
import NavBar from '@/components/nav-bar.vue';

export default defineComponent({
  name: 'App',
  components: {
    HeaderBar,
    NavBar,
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
