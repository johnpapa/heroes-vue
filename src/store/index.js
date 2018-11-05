import Vue from 'vue';
import Vuex from 'vuex';
import heroesModule from './modules/heroes';

export * from './modules/mutation-types';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    heroes: heroesModule,
  },
  state: {},
});
