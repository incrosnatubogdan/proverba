<template>
    <v-row class="bubble">
        <v-col cols="12">
            <bubble/>
            <div class="bubble__text">
                Trebuie să ai cont pentru a aprecia și participa la mișcarea Proverba
                <v-row class="mt-3 px-2">
                    <v-col cols="4">
                        <v-btn block>
                            Autentificare
                        </v-btn>
                    </v-col>
                    <!-- Used as a separator -->
                    <v-col cols="2" />


                    <v-col cols="4">
                        <v-btn block>
                            Creaza cont
                        </v-btn>
                    </v-col>
                </v-row>
            </div>
        </v-col>
    </v-row>
</template>

<script>
    import * as actions from '../store/types/actions'
    import store from '../store/index';
    import BuubleIcon from './img/BubbleIcon.vue'
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
        components: {
            'bubble': BuubleIcon,
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
