import * as types from '../../types/mutations'

export default {
    [types.ADMIN_QUOTES](state, quotes) {
        // state.adminQuotes = data;

        state.adminQuotes = quotes.data;
        state.numberOfquotes = quotes.total;
        state.numberOfPages = quotes.last_page;
        state.filters.page = quotes.current_page
        state.filters.itemsPerPage = parseInt(quotes.per_page)

        console.log(state.adminQuotes)
    },

    [types.SET_CSV_DATA](state, data) {
        state.CSVData = data;
    },

    [types.SET_ADMIN_FILTERS](state, filters) {
        state.filters = filters;
    },

    [types.EDIT_ADMIN_QUOTES](state, quote) {
        state.sentQuote.id = quote.id;
        state.sentQuote.post_title = quote.post_title;
        state.sentQuote.description = quote.description;

        if(quote.tags_translated) {
            state.sentQuote.tags = quote.tags_translated.map(x => x.name.en );
        }
        
        state.editDialog = true;
    },  

    [types.RESET_ADMIN_QUOTES](state, data) {
        state.sentQuote = JSON.parse(JSON.stringify(state.emptyQuote))
        state.editDialog = false;
    },

    [types.TOGGLE_DELETE_POPUP](state, data) {
        state.deleteDialog = data.popup;
        if(data.popup) {
            state.quoteToDelete = data.quote
        } else {
            state.quoteToDelete = {}
        }
    },

    [types.UPDATE_QUOTE](state, quote) {
        const quoteIndex = state.adminQuotes.map(x => x.id).indexOf(quote.id)
        const tagsArr = [];
        quote['tags'].forEach((tag) => {
            let obj = {
                'name' : {
                    'en' : tag
                }
            }

            tagsArr.push(obj)
        });
        quote.tags_translated = tagsArr

        state.adminQuotes.splice(quoteIndex, 1, quote)
        state.editDialog = false;
    },
}
