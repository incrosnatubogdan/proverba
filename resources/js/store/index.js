import Vuex from 'vuex';
import Vue from 'vue';
import ui from './modules/ui'
import user from './modules/user'
import quote from './modules/quote'
import admin from './modules/admin'




import * as mutations from "./types/mutations";
import * as actions from "./types/actions";

Vue.use(Vuex);


const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state: {
        initialized: false,
        errors: {
            messages: [],
            type: null
        }
    },
    actions: {
        [actions.INITIALIZE](state) {
            if (!state.initialized) {
                state.dispatch(actions.LOGGED_USER)
                // state.dispatch(actions.SEARCH_LOOKUPS)

            }
            state.commit(mutations.INITIALIZE);
        },
    },
    mutations: {
        [mutations.INITIALIZE](state) {
            state.initialized = true;
        },
    },
    modules: {
        ui,
        user,
        quote,
        admin
    },
    strict: true
});
