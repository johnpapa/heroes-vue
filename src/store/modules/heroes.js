import axios from 'axios';
import { API } from '../config';
import {
  ADD_HERO,
  DELETE_HERO,
  GET_HEROES,
  UPDATE_HERO,
} from './mutation-types';

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    heroes: [],
  },
  mutations: {
    [ADD_HERO](state, hero) {
      state.heroes.unshift(hero); // mutable addition
    },
    [UPDATE_HERO](state, hero) {
      const index = state.heroes.findIndex(h => h.id === hero.id);
      state.heroes.splice(index, 1, hero);
      state.heroes = [...state.heroes];
    },
    [GET_HEROES](state, heroes) {
      state.heroes = heroes;
    },
    [DELETE_HERO](state, hero) {
      state.heroes = [...state.heroes.filter(p => p.id !== hero.id)];
    },
  },
  actions: {
    // actions let us get to ({ state, getters, commit, dispatch }) {
    getHeroesAction({ commit }) {
      return axios
        .get(`${API}/heroes`)
        .then(response => {
          if (response.status !== 200) throw Error(response.message);
          const heroes = response.data;
          commit(GET_HEROES, heroes);
          return heroes;
        })
        .catch(console.error);
    },
    deleteHeroAction({ commit }, hero) {
      return axios
        .delete(`${API}/heroes/${hero.id}`)
        .then(response => {
          if (response.status !== 200) throw Error(response.message);
          commit(DELETE_HERO, hero);
          return null;
        })
        .catch(console.error);
    },
    updateHeroAction({ commit }, hero) {
      return axios.put(`${API}/heroes/${hero.id}`, hero).then(response => {
        if (response.status !== 200) throw Error(response.message);
        const updatedHero = response.data;
        commit(UPDATE_HERO, updatedHero);
        return updatedHero;
      });
    },
    addHeroAction({ commit }, hero) {
      return axios.post(`${API}/heroes`, hero).then(response => {
        if (response.status !== 201) throw Error(response.message);
        const addedHero = response.data;
        commit(ADD_HERO, addedHero);
        return addedHero;
      });
    },
  },
  getters: {
    // selectors
    heroes: state => state.heroes,
    // sortedPeople(state) {
    //   return [...state.heroes].sort((a, b) => a.id - b.id);
    // },
  },
};
