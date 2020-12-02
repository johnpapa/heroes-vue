import { createStore } from 'vuex';
import heroesModule from './modules/heroes';
import villainsModule from './modules/villains';
import type { RootState } from './modules/types';

export * from './modules/mutation-types';

const store = createStore({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    heroes: heroesModule,
    villains: villainsModule,
  },
  actions: {},
  mutations: {},
  state() {
    return {} as RootState;
  },
});

export default store;
