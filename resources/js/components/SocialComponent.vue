<template>
    <v-row>
        <v-col
            cols="4"
            sm="3"
          >
            <v-btn
            @click="toggleLike(true)"
              icon
              :color="returnColor(true)"
            >
              <v-icon>mdi-thumb-up</v-icon>
            </v-btn>
        </v-col>
        <v-col
            cols="4"
            sm="3"
             
          >
            <v-btn
                @click="toggleLike(false)"
                icon
                :color="returnColor(false)"
            >
              <v-icon>mdi-thumb-down</v-icon>
            </v-btn>
        </v-col>
        <v-col
            cols="4"
            sm="3"
             
          >
            <v-btn
                @click="next()"
                icon
                color="indigo"
            >   Next
            </v-btn>
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
    
    export default {
        props: {
            id: Number,
        },
        data() {
            return {
                liked: null,
                activeLike: false,
                activeDislike: false
            }
        },
        methods: {
            returnColor(value) {
                if(value) {
                    return this.activeLike ? "blue lighten-2" : "green lighten-2"
                } else {
                    return this.activeDislike ? "red lighten-2" : "lighten-2"
                }
            },
            
            toggleLike(value) {
                if(value) {
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
