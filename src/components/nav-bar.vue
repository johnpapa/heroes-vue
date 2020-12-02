<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NavBar',
});
</script>

<template>
  <nav class="column is-2 menu">
    <p class="menu-label">Menu</p>
    <ul class="menu-list">
      <router-link to="/heroes">Heroes</router-link>
      <router-link to="/villains">Villains</router-link>
      <router-link to="/about">About</router-link>
    </ul>
  </nav>
</template>
