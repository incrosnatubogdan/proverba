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

    

}
