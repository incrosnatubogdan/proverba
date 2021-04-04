import * as mutations from '../../types/mutations'
import * as actions from '../../types/actions'

export default {

    [actions.LOGGED_USER](context) {
        return new Promise((resolve, reject) => {
            axios.get('/user').then(response => {
                context.commit(mutations.LOGGED_USER, response.data)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    [actions.LOG_OUT_USER](context) {
        return new Promise(() => {
            context.commit(mutations.LOG_OUT_USER)
        })
    },

}
