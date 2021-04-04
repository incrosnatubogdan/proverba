import * as mutations from '../../types/mutations'
import * as actions from '../../types/actions'

export default {

    [actions.PUSH_NOTIFICATION](context, data) {
        return new Promise(() => {
            context.commit(mutations.PUSH_NOTIFICATION, data)
        })
    },

    [actions.TOGGLE_AUTH_POPUP](context, data) {
        return new Promise(() => {
            context.commit(mutations.TOGGLE_AUTH_POPUP, data)
        })
    },

    
}
