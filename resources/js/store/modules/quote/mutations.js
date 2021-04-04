import * as types from '../../types/mutations'

export default {
    [types.GET_QUOTES](state, data) {
        console.log(state.quotes.length, 'state.quotes.length')
        if(state.quotes.length > 0) {
            const newData = Object.assign(state.quotes, data);
            state.quotes = newData;
        } else {
            state.quotes = data;
        }
        
        
        localStorage.setItem('last_id', data[0].id)
    },

    [types.TOGGLE_LIKE](state) {
        state.quotes.splice(0, 1);
        localStorage.setItem('last_id', state.quotes[0].id)
    },

    
}
