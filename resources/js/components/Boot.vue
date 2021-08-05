<template>
    <v-app>
        <div v-if="numberOfQuotes > 0 && tutorialCompleted && !loadingQuotes">
            <quote :quote="currentQuote" />
            <Snackbar />
        </div>
        <tutorial v-else-if="!tutorialCompleted" />
        <loader v-else />
        <!-- <auth /> -->
    </v-app>
</template>

<script>
    import Quote from './Quote';
    import Social from './SocialComponent';
    // import Auth from './AuthComponent';
    import Tutorial from './pages/Tutorial.vue'
    import Loader from './img/Loader.vue';

    import * as actions from '../store/types/actions'
    import store from '../store/index'
    import {
        mapState,
        mapGetters
    } from 'vuex'
    import Snackbar from './pages/Snackbar';


    export default {
        components: { Quote, Snackbar, Social, Tutorial, Loader },
        props: {
            is_auth: Boolean,
        },
        computed: {
            ...mapState([
                'initialized'
            ]),
            ...mapGetters([
                'getQuotes',
                'getAuthPopup',
                'tutorialCompleted',
                'loadingQuotes',
                'getQuotes',
                'getTags',
                'numberOfQuotes'
            ]),
            currentQuote() {
                return this.getQuotes[0]
            },
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
        },
        mounted() {
            if (!this.initialized) {
                store.dispatch(actions.INITIALIZE).then( () => {
                })
            }

            if(this.tutorialCompleted && this.getTags.length > 0) {
                store.dispatch(actions.SEARCH_WITH_TAGS, this.getTags)
            }
        }
    }

</script>