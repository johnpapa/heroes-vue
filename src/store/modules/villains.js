import axios from 'axios';
import API from '../config';
import { parseItem, parseList } from './action-utils';
import {
  ADD_VILLAIN,
  DELETE_VILLAIN,
  GET_VILLAINS,
  UPDATE_VILLAIN,
} from './mutation-types';

const captains = console;

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    villains: [],
  },
  mutations: {
    [ADD_VILLAIN](state, villain) {
      state.villains.unshift(villain);
    },
    [UPDATE_VILLAIN](state, villain) {
      const index = state.villains.findIndex(v => v.id === villain.id);
      state.villains.splice(index, 1, villain);
      state.villains = [...state.villains];
    },
    [GET_VILLAINS](state, villains) {
      state.villains = villains;
    },
    [DELETE_VILLAIN](state, villain) {
      state.villains = [...state.villains.filter(p => p.id !== villain.id)];
    },
  },
  actions: {
    // actions let us get to ({ state, getters, commit, dispatch }) {
    async getVillainsAction({ commit }) {
      try {
        const response = await axios.get(`${API}/villains`);
        const villains = parseList(response);
        commit(GET_VILLAINS, villains);
        return villains;
      } catch (error) {
        captains.error(error);
      }
    },
    async deleteVillainAction({ commit }, villain) {
      try {
        const response = await axios.delete(`${API}/villains/${villain.id}`);
        parseItem(response, 200);
        commit(DELETE_VILLAIN, villain);
        return null;
      } catch (error) {
        captains.error(error);
      }
    },
    async updateVillainAction({ commit }, villain) {
      try {
        const response = await axios.put(
          `${API}/villains/${villain.id}`,
          villain
        );
        const updatedvillain = parseItem(response, 200);
        commit(UPDATE_VILLAIN, updatedvillain);
        return updatedvillain;
      } catch (error) {
        captains.error(error);
      }
    },
    async addVillainAction({ commit }, villain) {
      try {
        const response = await axios.post(`${API}/villains`, villain);
        const addedVillain = parseItem(response, 201);
        commit(ADD_VILLAIN, addedVillain);
        return addedVillain;
      } catch (error) {
        captains.error(error);
      }
    },
  },
  getters: {
    villains: state => state.villains,
  },
};
