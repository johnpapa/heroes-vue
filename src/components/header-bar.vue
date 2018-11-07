<template>
  <header class="">
    <nav class="navbar has-background-dark is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://vuejs.org/" target="_blank" rel="noopener noreferrer">
          <i class="fab js-logo fa-vuejs fa-2x" aria-hidden="true" />
        </a>
        <router-link to="/" class="navbar-item nav-home">
          <span class="tour">TOUR</span>
          <span class="of">OF</span>
          <span class="heroes">HEROES</span>
        </router-link>
        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a href="https://github.com/johnpapa/heroes-vue" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-github fa-2x" aria-hidden="true"></i>
              </a>
              <a href="https://twitter.com/john_papa" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-twitter fa-2x" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'HeaderBar',
};
</script>

<style lang="scss" scoped>
</style>
