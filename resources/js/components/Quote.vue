<template>
    <v-row class="quote">
        <v-col class="text-center" cols="12">
            <logo-svg />
        </v-col>

        <v-col class="text-center" cols="12">
            <v-card-text v-html="quote.emphasys_description" class="quote__title" />
        </v-col>

        <v-col class="text-center" cols="12">
            <p>
                <v-icon small> mdi-eye </v-icon>
                21.285
            </p>
        </v-col>

        <v-col class="text-center" cols="12">
            <v-card-actions>
                <social-component :id="quote.id"> </social-component>
            </v-card-actions>
            <!-- <v-card-actions v-else>
                    <unregistered-component :tags="quote.tags_translated"> </unregistered-component>
                </v-card-actions> -->
        </v-col>

        <v-col class="text-center tags__grid" cols="12">
            <p v-for="(tag, i) in quote.tags_translated" :key="i" :class="objectClass(tag.name.en)" disabled>
                {{ tag.name.en }}
            </p>
        </v-col>

    </v-row>
</template>

<script>
    import SocialComponent from './SocialComponent';
    import UnregisteredComponent from './UnregisteredComponent';
    import TagsComponent from './TagsComponent';
    import LogoSVG from './img/LogoSVG.vue';

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
            UnregisteredComponent,
            'logo-svg': LogoSVG
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
                    "tags__item": true,
                    tags__preferred: this.isSelected(tag),
                    tags__disabled: !this.isSelected(tag),
                }
            }
        },
        mounted() {

        }
    }

</script>

<style lang="scss" scoped>
    .tags {
        &__item {
            pointer-events: none;
        }

        &__selected {
            color: red;
        }
    }

</style>
