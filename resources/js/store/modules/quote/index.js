import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const state = {
    quotes: {},
    allTags: [],
    tags: localStorage.getItem('tags') ? JSON.parse(localStorage.getItem('tags')) : [],
    ids: localStorage.getItem('ids') ? JSON.parse(localStorage.getItem('ids')) : [],
    loadingQuotes: false,
    
}

export default {
    state,
    getters,
    actions,
    mutations
}
