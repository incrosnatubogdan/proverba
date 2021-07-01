<template>
    <v-card>
        <v-card-title>
            {{ quote.post_title }}
        </v-card-title>
        <v-card-subtitle>
            {{ quote.post_slug }}
        </v-card-subtitle>
        <v-card-text>
            {{ quote.description }}
        </v-card-text>
        <v-card-actions v-if="isLoggedIn">
            <tags-component :tags="quote.tags_translated"> </tags-component>
            <social-component :id="quote.id"> </social-component>
        </v-card-actions>
        <v-card-actions v-else>
            <unregistered-component :tags="quote.tags_translated"> </unregistered-component>
        </v-card-actions>
    </v-card>
</template>

<script>
    import SocialComponent from './SocialComponent';
    import UnregisteredComponent from './UnregisteredComponent';
    import TagsComponent from './TagsComponent';
    import store from '../store/index';
    import * as actions from '../store/types/actions';

    import {
        mapState,
        mapGetters
    } from 'vuex';

    export default {
        components: { SocialComponent, TagsComponent, UnregisteredComponent },
        computed: {
            ...mapGetters([
                'isLoggedIn',
            ]),
        },
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