import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const state = {
    loggedUser: {},
    isLoggedIn: false
}

export default {
    state,
    getters,
    actions,
    mutations
}
