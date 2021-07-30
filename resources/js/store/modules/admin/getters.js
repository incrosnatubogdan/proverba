export default {
    adminQuotes: state => state.adminQuotes,
    getAdminSearchFilters: state => state.filters,
    adminTableNumberOfPages: state => state.numberOfPages,
    adminTableNumberOfQuotes: state => state.numberOfquotes,
    getCSVData: state => state.CSVData,
    sentQuote: state => state.sentQuote,
    // lastQuoteId(state) {
    //     return () => {
    //         let lastUser = state.adminQuotes[state.adminQuotes.length - 1]
    //         return lastUser.id
    //     }
    // },
    lastQuoteId: state => state.adminQuotes[state.adminQuotes.length - 1].id,
    adminEditDialog: state => state.editDialog,
    emptyQuote: state => state.emptyQuote,
    quoteToDelete: state => state.quoteToDelete,
    adminDeleteDialog: state => state.deleteDialog,
}
