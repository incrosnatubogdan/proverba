<template>
    <v-row class="social">
        <v-col cols="4" sm="3">
            <!-- <v-btn class="social__btn" @click="toggleLike(true)" icon>
                <v-icon>mdi-thumb-up</v-icon>
                <p>
                    Bun
                </p>
            </v-btn> -->
            <div class="social__btn" @click="toggleLike(true)">
                <!-- <v-icon>mdi-star</v-icon> -->
                <like-svg />
                <p> Bun </p>
            </div>
        </v-col>
        <v-col cols="4" sm="3">

            <div class="social__btn" @click="toggleLike(false)">
                <!-- <v-icon>mdi-star</v-icon> -->
                <dislike-svg />
                <p> Nu prea </p>
            </div>
        </v-col>
        <v-col cols="4" sm="3">
            <!-- <v-btn class="social__btn" @click="addToFavorite()" icon>
                <v-icon>mdi-star</v-icon>
                <p> Favorit </p>
            </v-btn> -->

            <div class="social__btn" @click="addToFavorite()">
                <!-- <v-icon>mdi-star</v-icon> -->
                <favorite-svg />
                <p> Favorit </p>
            </div>
        </v-col>
        <v-col cols="4" sm="3">
            <!-- <v-btn class="social__btn" @click="next()" icon>
                <next-svg />
                <p> Urmatorul </p>
            </v-btn> -->

            <div class="social__btn" @click="next()">
                <next-svg />
                <p> Urmatorul </p>
            </div>
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
            'next-svg' : ArrowIcon,
            'like-svg' : LikeIcon,
            'dislike-svg' : DislikeIcon,
            'favorite-svg' : FavoriteIcon,
        },
        data() {
            return {
                liked: null,
                activeLike: false,
                activeDislike: false
            }
        },
        methods: {
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
                store.dispatch(actions.NEXT_QUOTE);
            }
        },
        mounted() {
            this.liked = null;
        }
    }

</script>
