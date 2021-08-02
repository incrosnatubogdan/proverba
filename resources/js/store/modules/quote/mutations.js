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

    [types.NEXT_QUOTE](state) {
        state.quotes.splice(0, 1);
        localStorage.setItem('last_id', state.quotes[0].id)
    },

    

    
}
