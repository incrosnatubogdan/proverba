import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const state = {
    snackbar: {
        showing: true,
        authPopup: false,
        message: "Test",
        timeout: 3000,
        type: 'success',
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
