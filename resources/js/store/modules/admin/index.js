import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const state = {
    editDialog: false,
    deleteDialog:false,
    quoteToDelete: {

    },
    adminQuotes: null,
    numberOfquotes: 0,
    numberOfPages: 0,
    filters: {
        page:0,
        itemsPerPage: 15
    },
    sentQuote: {

    },
    emptyQuote: {
        post_title: null,
        description: null,
        tags: []
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
