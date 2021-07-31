import * as mutations from '../../types/mutations'
import * as actions from '../../types/actions'

export default {

    // [actions.ADMIN_QUOTES](context, id) {
    //     return new Promise((resolve, reject) => {
    //         axios.get('/admin/quotes/' + id).then(response => {
    //             context.commit(mutations.ADMIN_QUOTES, response.data)
    //             resolve(response)
    //         }).catch(error => {
    //             reject(error)
    //         })
    //     })
    // },

    [actions.ADMIN_QUOTES](context) {
        return new Promise((resolve, reject) => {
            // axios.get('/admin/quotes/' + id).then(response => {
            //     context.commit(mutations.ADMIN_QUOTES, response.data)
            //     resolve(response)
            // }).catch(error => {
            //     reject(error)
            // })
            

            axios.post('/admin/quotes', context.state.filters).then((response) => {
                context.commit(mutations.ADMIN_QUOTES, response.data)
                resolve(response)
            }).catch((error) => {
                reject(error)
            });
        })
    },

    [actions.QUOTES_BULK_UPDATE](context, data) {
        return new Promise((resolve, reject) => {
            axios.put(`/admin/spreadsheet`, data).then((response) => {
                
                resolve(response)
            }).catch((error) => {
                reject(error)
            });
        })
    },

    

    [actions.SET_ADMIN_QUOTES](context, data) {
        return new Promise((resolve) => {
            context.commit(mutations.SET_ADMIN_QUOTES, data)
            resolve()
        })
    },
    
    [actions.EDIT_ADMIN_QUOTES](context, data) {
        return new Promise((resolve) => {
            context.commit(mutations.EDIT_ADMIN_QUOTES, data)
            resolve()
        })
    },

    [actions.RESET_ADMIN_QUOTES](context, data) {
        return new Promise((resolve) => {
            context.commit(mutations.RESET_ADMIN_QUOTES, data)
            resolve()
        })
    },

    [actions.UPDATE_QUOTE](context, payload) {
        return new Promise((resolve, reject) => {
            axios.put(`/admin/update`, payload).then((response) => {
                context.commit(mutations.UPDATE_QUOTE, payload)
                resolve(response)
            }).catch((error) => {
                reject(error)
            });
        })
    },

    [actions.TOGGLE_DELETE_POPUP](context, data) {
        return new Promise((resolve) => {
            context.commit(mutations.TOGGLE_DELETE_POPUP, data)
            resolve()
        })
    },

    [actions.SET_CSV_DATA](context, data) {
        return new Promise((resolve) => {
            context.commit(mutations.SET_CSV_DATA, data)
            resolve()
        })
    },

    

    [actions.SET_ADMIN_FILTERS](context, filters) {
        return new Promise((resolve) => {
            context.commit(mutations.SET_ADMIN_FILTERS, filters)
            resolve()
        })
    },

    [actions.DELETE_QUOTE](context, payload) {
        return new Promise((resolve, reject) => {
            axios.delete(`/admin/delete`, payload).then((response) => {
                context.commit(mutations.DELETE_QUOTE, payload)
                resolve(response)
            }).catch((error) => {
                reject(error)
            });
        })
    },
    

}
