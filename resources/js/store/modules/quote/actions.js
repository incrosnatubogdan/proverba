import * as mutations from '../../types/mutations'
import * as actions from '../../types/actions'

export default {



    [actions.GET_QUOTES](context) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: '/quotes/' + localStorage.getItem('last_id'),
            }).then((response) => {
                context.commit(mutations.GET_QUOTES, response.data)
                // this.quotes = response.data.data;
                resolve(response)
            }).catch((error) => {
                reject(error)
            });
        })



        // return new Promise((resolve, reject) => {
        //     axios({
        //         method: 'get',
        //         url: '/server-timestamp',
        //     }).then((response) => {
        //         context.commit(mutations.GET_QUOTES, response.data)
        //         // this.quotes = response.data.data;
        //         resolve(response)
        //     }).catch((error) => {
        //         reject(error)
        //     });
        // })

    },

    [actions.GET_TAG](context, category) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: '/quotes/tag/' + category + '/' + 0,
            }).then((response) => {
                context.commit(mutations.GET_QUOTES, response.data)
                // this.quotes = response.data.data;
                resolve(response)
            }).catch((error) => {
                reject(error)
            });
        })
    },

    [actions.GET_ALL_TAGS](context, category) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: '/tags/all',
            }).then((response) => {
                context.commit(mutations.GET_ALL_TAGS, response.data)
                resolve(response)
            }).catch((error) => {
                reject(error)
            });
        })
    },
    
    [actions.SEARCH_WITH_TAGS](context, data) {
        return new Promise((resolve, reject) => {
            axios.post('/tags/generate', {
                tags: data,
                ids: context.state.ids
            }).then((response) => {
                context.commit(mutations.SEARCH_WITH_TAGS, response.data)
                resolve(response)
            }).catch((error) => {
                reject(error)
            });
        })
    },

    [actions.SET_LOCAL_TAGS](context, data) {
        return new Promise((resolve) => {
            context.commit(mutations.SET_LOCAL_TAGS, data)
            resolve()
        })
    },

    [actions.SET_LOADER](context, data) {
        return new Promise((resolve) => {
            context.commit(mutations.SET_LOADER, data)
            resolve()
        })
    },

    [actions.TOGGLE_LIKE](context, value) {
        return new Promise((resolve, reject) => {
            let method = value.liked ? 'post' : 'delete';
            axios({
                method: method,
                url: '/quotes/' + value.id + '/like',
            }).then((response) => {
                context.commit(mutations.TOGGLE_LIKE)
                resolve(response)
            }).catch((error) => {
                reject(error)
            });
        })
    },

    [actions.NEXT_QUOTE](context) {
        return new Promise(() => {
            context.commit(mutations.NEXT_QUOTE)
        })
    },
}
