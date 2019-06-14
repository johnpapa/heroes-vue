import axios from 'axios';
import { parseItem, parseList } from './action-utils';
import API from '../config';
import {
  ADD_HERO,
  DELETE_HERO,
  GET_HEROES,
  UPDATE_HERO,
} from './mutation-types';

const captains = console;

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    heroes: [],
  },
  mutations: {
    [ADD_HERO](state, hero) {
      state.heroes.unshift(hero); // mutate the heroes array
    },
    [UPDATE_HERO](state, hero) {
      const index = state.heroes.findIndex(h => h.id === hero.id);
      state.heroes.splice(index, 1, hero);
      state.heroes = [...state.heroes]; // replace heroes
    },
    [GET_HEROES](state, heroes) {
      state.heroes = heroes; // no changes, just get
    },
    [DELETE_HERO](state, hero) {
      state.heroes = [...state.heroes.filter(p => p.id !== hero.id)]; // replace heroes
    },
  },
  actions: {
    // actions let us get to ({ state, getters, commit, dispatch }) {
    async getHeroesAction({ commit }) {
      try {
        const response = await axios.get(`${API}/heroes`);
        const heroes = parseList(response);
        commit(GET_HEROES, heroes);
        return heroes;
      } catch (error) {
        return captains.log(error);
      }
    },
    async deleteHeroAction({ commit }, hero) {
      try {
        const response = await axios.delete(`${API}/heroes/${hero.id}`);
        parseItem(response, 200);
        commit(DELETE_HERO, hero);
        return null;
      } catch (error) {
        captains.error(error);
      }
    },
    async updateHeroAction({ commit }, hero) {
      try {
        const response = await axios.put(`${API}/heroes/${hero.id}`, hero);
        const updatedHero = parseItem(response, 200);
        commit(UPDATE_HERO, updatedHero);
        return updatedHero;
      } catch (error) {
        captains.error(error);
      }
    },
    async addHeroAction({ commit }, hero) {
      try {
        const response = await axios.post(`${API}/heroes`, hero);
        const addedHero = parseItem(response, 201);
        commit(ADD_HERO, addedHero);
        return addedHero;
      } catch (error) {
        captains.error(error);
      }
    },
  },
  getters: {
    heroes: state => state.heroes,
  },
};
