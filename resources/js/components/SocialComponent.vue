<template>
    <v-row class="social">
        <v-col cols="3" sm="3">
            <div class="social__btn" @click="isLoggedIn ? toggleLike(true) : toggleBubble()">
                <like-svg />
                <p> Bun </p>
            </div>
        </v-col>

        <v-col cols="3" sm="3">
            <div class="social__btn" @click="isLoggedIn ? toggleLike(false) : toggleBubble()">
                <dislike-svg />
                <p> Nu prea </p>
            </div>
        </v-col>

        <v-col cols="3" sm="3">
            <div class="social__btn" @click="isLoggedIn ? addToFavorite() : toggleBubble()">
                <favorite-svg />
                <p> Favorit </p>
            </div>
        </v-col>

        <v-col cols="3" sm="3">
            <div class="social__btn" @click="next()">
                <next-svg />
                <p> Urmatorul </p>
            </div>
        </v-col>

        <v-col cols="12" v-if="showBubble">
            <unregistered-component />
        </v-col>
    </v-row>
</template>

<script>
    import * as actions from '../store/types/actions'
    import store from '../store/index'
    import {
        mapState,
        mapGetters
    } from 'vuex';

    import ArrowIcon from './img/ArrowIcon';
    import LikeIcon from './img/LikeIcon';
    import DislikeIcon from './img/DislikeIcon';
    import FavoriteIcon from './img/FavoriteIcon'
    import UnregisteredComponent from './UnregisteredComponent.vue';

    export default {
        props: {
            id: Number,
        },
        computed: {
            ...mapGetters([
                'isLoggedIn',
            ]),
        },
        components: {
            'next-svg': ArrowIcon,
            'like-svg': LikeIcon,
            'dislike-svg': DislikeIcon,
            'favorite-svg': FavoriteIcon,
            UnregisteredComponent,
        },
        data() {
            return {
                liked: null,
                activeLike: false,
                activeDislike: false,
                showBubble: false,
                bubbleTimeout: null
            }
        },
        methods: {
            toggleBubble() {
                const bubbleBool = this.showBubble
                this.showBubble = !bubbleBool;
                clearTimeout(this.bubbleTimeout);
                if(this.showBubble) {
                    this.bubbleTimeout = setTimeout(() => {
                        this.showBubble = false
                    }, 2000)
                }
            },
            // returnColor(value) {
            //     if(value) {
            //         return this.activeLike ? "blue lighten-2" : "green lighten-2"
            //     } else {
            //         return this.activeDislike ? "red lighten-2" : "lighten-2"
            //     }
            // },

            addToFavorite() {
                alert('WIP');
            },

            toggleLike(value) {
                if (value) {
                    this.activeLike = !this.activeLike
                } else {
                    this.activeDislike = !this.activeDislike
                }

                store.dispatch(actions.TOGGLE_LIKE, {
                    liked: value,
                    id: this.id
                }).then(() => {
                    this.liked = value;
                });
            },
            next() {
                this.showBubble = false;
                store.dispatch(actions.NEXT_QUOTE);
            }
        },
        mounted() {
            this.liked = null;
        }
    }

</script>
