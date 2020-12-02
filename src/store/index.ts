import Vuex from 'vuex';
import heroesModule from './modules/heroes';
import villainsModule from './modules/villains';

export * from './modules/mutation-types';

export default Vuex.createStore({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    heroes: heroesModule,
    villains: villainsModule,
  },
  state: {},
});
