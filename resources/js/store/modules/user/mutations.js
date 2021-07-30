import * as types from '../../types/mutations'

export default {
    [types.LOGGED_USER](state, user) {
        state.loggedUser = user;
        if(user.email !== undefined) {
            state.isLoggedIn = true
        }
    },

    [types.LOG_OUT_USER](state) {
        state.isLoggedIn = false
        state.loggedUser = {}
    },
}
