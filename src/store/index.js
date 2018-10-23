import Vue from 'vue';
import Vuex from 'vuex';
import { fetchItem, fetchList } from '../api/index.js';
import fooModule from './modules/foo';

Vue.use(Vuex);

export function createStore () {
  return new Vuex.Store({
    state: {
      items: {},
      list: []
    },
    actions: {
      fetchItem ({ commit }, config) {
        return fetchItem(config).then((res) => {
          commit('setItem', { id: config.params.id, item: res });
        }).catch((err) => console.log(err));
      },
      fetchList ({ commit }, config) {
        return fetchList(config).then((res) => {
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
    },
    modules: {
      foo: fooModule
    }
  });
}
