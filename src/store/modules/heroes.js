import axios from 'axios';
import {
  ADD_HERO,
  DELETE_HERO,
  GET_HEROES,
  UPDATE_HERO,
} from './mutation-types';

const API = '/api';

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    heroes: [],
  },
  mutations: {
    [ADD_HERO](state, hero) {
      state.heroes.push(hero); // mutable addition
    },
    [UPDATE_HERO](state, hero) {
      state.heroes = [...state.heroes.filter(p => p.id !== hero.id), hero];
    },
    [GET_HEROES](state, heroes) {
      state.heroes = heroes;
    },
    [DELETE_HERO](state, hero) {
      state.heroes = state.heroes.filter(p => p.id !== hero.id);
    },
  },
  actions: {
    // actions let us get to ({ state, getters, commit, dispatch }) {
    getHeroes({ commit }) {
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

    // import axios from 'axios';

    // const API = '/api';
    // const captains = console;

    // export const deleteHeroApi = async hero => {
    //   const response = await axios.delete(`${API}/heroes/${hero.id}`);
    //   if (response.status !== 200) throw Error(response.message);
    //   return response.data;
    // };

    // export const updateHeroApi = async hero => {
    //   captains.log(hero.id);
    //   const response = await axios.put(`${API}/heroes/${hero.id}`, hero);
    //   if (response.status !== 200) throw Error(response.message);
    //   return response.data;
    // };

    // export const addHeroApi = async hero => {
    //   const response = await axios.post(`${API}/heroes`, hero);
    //   if (response.status !== 201) throw Error(response.message);
    //   return response.data;
    // };

    // export const loadHeroesApi = async () => {
    //   const response = await axios.get(`${API}/heroes`);
    //   if (response.status !== 200) throw Error(response.message);
    //   return response.data;
    // }
  },
  getters: {
    // selectors
    heroes: state => state.heroes,
    // sortedPeople(state) {
    //   return [...state.heroes].sort((a, b) => a.id - b.id);
    // },
  },
};
