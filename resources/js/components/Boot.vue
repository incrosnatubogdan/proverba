<template>
    <v-app>
        <div v-if=" numberOfQuotes > 0">
            <quote :quote="getQuotes[0]" />
            <Snackbar />
        </div>
        <auth />
    </v-app>
</template>

<script>
    import Quote from './Quote';
    import Social from './SocialComponent';
    import Auth from './AuthComponent';
    import * as actions from '../store/types/actions'
    import store from '../store/index'
    import {
        mapState,
        mapGetters
    } from 'vuex'
    import Snackbar from './pages/Snackbar';

    export default {
        components: { Quote, Snackbar, Auth, Social },
        computed: {
            ...mapState([
                'initialized'
            ]),
            ...mapGetters([
                'getQuotes',
            ]),
            numberOfQuotes() {
                return this.getQuotes.length
            }
        },
        props: {
        },
        data() {
            return {
            }
        },
        methods: {
        },
        watch: {
            numberOfQuotes: {
                handler(number) {
                    if(number < 10) {
                        store.dispatch(actions.GET_QUOTES)
                    }
                    console.log(number)
                },
                deep: true
            },
        },
        mounted() {
            if (!this.initialized) {
                store.dispatch(actions.INITIALIZE).then( () => {
                    store.dispatch(actions.GET_QUOTES)
                })
                
            }
        }
    }

</script>