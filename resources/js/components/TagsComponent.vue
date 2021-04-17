<template>
    <v-row>
        <v-col
            cols="12"
            sm="12"
          >
          <v-chip
            v-for="(tag) in tags"
            :key="tag.name_translated"
            color="green"
            outlined
            pill
            >
            {{ tag.name_translated }}
            </v-chip>
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
            tags: Array,
        },
        data() {
            return {
            }
        },
        methods: {
        },
        mounted() {
        }
    }
</script>
