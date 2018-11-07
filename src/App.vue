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

<script>
// import { mapActions, mapGetters, mapMutations } from 'vuex';
import HeaderBar from '@/components/header-bar.vue';
import NavBar from '@/components/nav-bar.vue';
// import { ADD_PLANET, UPDATE_PLANET, DELETE_PLANET } from '@/store';

export default {
  name: 'App',
  data() {
    return {};
  },
  components: {
    HeaderBar,
    NavBar,
  },
  computed: {},
  created() {
    // this.getPlanets();
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
