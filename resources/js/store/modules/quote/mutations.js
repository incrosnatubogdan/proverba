import * as types from '../../types/mutations'


import QuotesSync from "../../../database/Sync/QuotesSync";


export default {
    async [types.GET_QUOTES](state, data) {
        // if(state.quotes.length > 0) {
        //     const newData = Object.assign(state.quotes, data);
        //     state.quotes = newData;
        // } else {
        //     state.quotes = data;
        // }

        state.quotes = data;
        localStorage.setItem('last_id', data[0].id);

        await new QuotesSync().execute().then();
    },

    [types.TOGGLE_LIKE](state) {
        // state.quotes.splice(0, 1);
    },

    [types.SET_LOADER](state, data) {
        state.loadingQuotes = data;
    },

    [types.GET_ALL_TAGS](state, data) {
        state.allTags = data
    },

    [types.SEARCH_WITH_TAGS](state, data) {
        // state.quotes.splice(0, 1);
        localStorage.setItem('ids', JSON.stringify([]))
        localStorage.setItem('tags', JSON.stringify(state.tags))
        state.quotes = data;
        setTimeout(() => {
            state.loadingQuotes = false
        }, 2000)
        // setTimeout(
        //     function() {
        //         state.loadingQuotes = false
        // }, 2000);
    },

    [types.SET_LOCAL_TAGS](state, tag) {

        if (state.tags.includes(tag)) {
            state.tags.splice(state.tags.indexOf(tag), 1)
        } else {
            state.tags.push(tag)
        }

        localStorage.setItem('tags', JSON.stringify(state.tags))
    },

    [types.NEXT_QUOTE](state) {
        state.quotes.splice(0, 1);
        localStorage.setItem('last_id', state.quotes[0].id)
    },
}
