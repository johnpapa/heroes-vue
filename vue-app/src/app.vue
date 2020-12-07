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

<style lang="scss">
@import 'styles.scss';
</style>
