<template>
    <v-card>
        <v-card-title>
            {{ quote }}
        </v-card-title>
        <v-card-actions>
            <social-component :id="quote.id"> </social-component>
        </v-card-actions>
    </v-card>
</template>

<script>
    import SocialComponent from './SocialComponent';
    import store from '../store/index';
    import * as actions from '../store/types/actions'

    export default {
        components: { SocialComponent },
        props: {
            quote: Object
        },
        data() {
            return {
                alllikes: '',
            }
        },
        methods: {
            showSocial() {
                store.dispatch(actions.TOGGLE_AUTH_POPUP, true)
            }
        },
        mounted() {
        }
    }

</script>