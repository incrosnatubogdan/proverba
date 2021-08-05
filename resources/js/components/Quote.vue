<template>
    <v-card>
        <v-card-title>
            {{ quote.post_title }} -  {{ quote.id }}
        </v-card-title>
        <v-card-subtitle>
            {{ quote.post_slug }}
        </v-card-subtitle>
        <v-card-text>
            {{ quote.description }}
        </v-card-text>

        <v-list flat>
            <v-list-item-group color="primary">
                <v-list-item v-for="(item, i) in quote.tags_translated" :key="i">
                    <v-list-item-content>
                        <v-list-item-title v-text="item.name.en" :class="objectClass(item.name.en)">
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>

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
        data() {
            return {
                selectedItem: null
            }
        },
        components: {
            SocialComponent,
            TagsComponent,
            UnregisteredComponent
        },
        computed: {
            ...mapGetters([
                'isLoggedIn',
                'getTags',
                'numberOfQuotes'
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
        watch: {
            numberOfQuotes(val) {
                console.log(val, 'numberOfQuotes')
            }
        },
        methods: {
            showSocial() {
                store.dispatch(actions.TOGGLE_AUTH_POPUP, true)
            },
            isSelected(tag) {
                return this.getTags.includes(tag)
            },
            objectClass(tag) {
                return {
                    "tags__item" : true,
                    tags__selected: this.isSelected(tag),
                }
            }
        },
        mounted() {
            
        }
    }

</script>

<style lang="scss" scoped>
.tags {
    &__item{
        pointer-events:none;
    }

    &__selected{
        color: red;
    }
}
</style>