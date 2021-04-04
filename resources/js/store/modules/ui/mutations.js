import * as types from '../../types/mutations'

export default {
    [types.PUSH_NOTIFICATION](state, snackbar) {
        state.snackbar = snackbar
    },

    [types.TOGGLE_AUTH_POPUP](state, value) {
        state.authPopup = value
    }

    
}
