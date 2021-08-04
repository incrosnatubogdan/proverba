import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const state = {
    loggedUser: {},
    tutorialCompleted: localStorage.getItem('tutorialCompleted') ? localStorage.getItem('tutorialCompleted') : false,
    isLoggedIn: false,
    passedLogin: false
}

export default {
    state,
    getters,
    actions,
    mutations
}
