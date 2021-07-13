export default {
    adminQuotes: state => state.adminQuotes,
    getAdminSearchFilters: state => state.filters,
    adminTableNumberOfPages: state => state.numberOfPages,
    adminTableNumberOfQuotes: state => state.numberOfquotes,
    sentQuote: state => state.sentQuote,
    adminEditDialog: state => state.editDialog,
    emptyQuote: state => state.emptyQuote,
    quoteToDelete: state => state.quoteToDelete,
    adminDeleteDialog: state => state.deleteDialog,
}
