import Vue from 'vue';
import Vuex from 'vuex';
import { fetchItem, fetchList } from '../api/index.js';

Vue.use(Vuex);

export function createStore () {
  return new Vuex.Store({
    state: {
      items: {},
      list: []
    },
    actions: {
      fetchItem ({ commit }, id) {
        return fetchItem(id).then((res) => {
          commit('setItem', { id, item: res });
        }).catch((err) => console.log(err));
      },
      fetchList ({ commit }) {
        return fetchList().then((res) => {
          commit('setList', res.list);
        }).catch((err) => console.log(err));
      }
    },
    mutations: {
      setItem (state, { id, item }) {
        Vue.set(state.items, id, item);
      },
      setList (state, list) {
        state.list = list;
      }
    }
  });
}
