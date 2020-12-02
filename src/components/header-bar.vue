<script lang="ts">
import HeaderBarBrand from '@/components/header-bar-brand.vue';
import HeaderBarLinks from '@/components/header-bar-links.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeaderBar',
  components: { HeaderBarBrand, HeaderBarLinks },
});
</script>

<template>
  <header>
    <nav
      class="navbar has-background-dark is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <HeaderBarBrand></HeaderBarBrand>
      <HeaderBarLinks></HeaderBarLinks>
    </nav>
  </header>
</template>
