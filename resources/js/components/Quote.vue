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
        <v-card-actions>
            <tags-component :tags="quote.tags_translated"> </tags-component>
            <social-component :id="quote.id"> </social-component>
        </v-card-actions>
    </v-card>
</template>

<script>
    import SocialComponent from './SocialComponent';
    import TagsComponent from './TagsComponent';
    import store from '../store/index';
    import * as actions from '../store/types/actions'

    export default {
        components: { SocialComponent, TagsComponent },
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