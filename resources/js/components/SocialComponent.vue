<template>
    <v-row>
        <v-col
            cols="6"
            sm="3"
          >
            <v-btn
            @click="toggleLike(true)"
            :disabled="liked !== null"
              icon
              v-bind:class="{ 'swirl-out-bl-bck': liked }"
              color="indigo"
            >
              <v-icon>mdi-thumb-up</v-icon>
            </v-btn>
        </v-col>
        <v-col
            cols="6"
            sm="3"
             
          >
            <v-btn
                v-bind:class="{ 'swirl-out-bl-bck': liked == false }"
                @click="toggleLike(false)"
                icon
                :disabled="liked !== null"
                v-if="!liked"
                color="indigo"
            >
              <v-icon>mdi-thumb-down</v-icon>
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
                liked: null
            }
        },
        methods: {
            toggleLike(value) {
                // this.liked = value;
                store.dispatch(actions.TOGGLE_LIKE, {
                    liked: value,
                    id: this.id
                }).then(() => {
                    this.liked = value;
                });
            }
        },
        mounted() {
            this.liked = null;
        }
    }
</script>
