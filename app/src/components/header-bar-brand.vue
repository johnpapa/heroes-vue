<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeaderBarBrand',
});
</script>

<template>
  <div class="navbar-brand">
    <a
      class="navbar-item"
      href="https://vuejs.org/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i class="fab js-logo fa-vuejs fa-2x" aria-hidden="true" />
    </a>
    <router-link to="/" class="navbar-item nav-home">
      <span class="brand-first">TOUR</span>
      <span class="brand-second">OF</span>
      <span class="brand-third">HEROES</span>
    </router-link>
  </div>
</template>
