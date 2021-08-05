export default {
    getQuotes: state => state.quotes,
    allTags: state => state.allTags,
    getTags: state => state.tags,
    loadingQuotes: state => state.loadingQuotes,
    numberOfQuotes: state => state.quotes.length
}
