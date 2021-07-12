import * as mutations from '../../types/mutations'
import * as actions from '../../types/actions'

export default {

    [actions.ADMIN_QUOTES](context, id) {
        return new Promise((resolve, reject) => {
            axios.get('/admin/quotes/' + id).then(response => {
                context.commit(mutations.ADMIN_QUOTES, response.data)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
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
    

}
