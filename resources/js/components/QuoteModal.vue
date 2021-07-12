<template>
    <v-dialog v-model="editDialog" max-width="1200px">
        <v-card>
            <v-card-title>
                Edit quote
            </v-card-title>
            <v-card-text>
                <v-text-field v-model="sentQuote.post_title" label="Edit quote title" />

                <v-textarea v-model="sentQuote.description" label="Edit quote description" />

                <v-combobox v-model="sentQuote.tags" label="Tags" multiple chips clearable :items="availableTags" />
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn color="blue darken-1" text @click="closeModal">
                    Close
                </v-btn>
                <v-btn color="blue darken-1" text @click="saveOrUpdateQuote">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import store from '../store/index';
    import * as actions from '../store/types/actions';

    import {
        mapState,
        mapGetters
    } from 'vuex';

    export default {
        data() {
            return {
                availableTags: ['tag 3', 'tag 4', 'first tag', 'second tag']
            }
        },
        components: {},
        computed: {
            ...mapGetters([
                'isLoggedIn',
                'sentQuote',
                'adminEditDialog'
            ]),

            editDialog: {
                get() {
                    return this.adminEditDialog;
                },
                set() {
                    this.closeModal()
                },
            },
        },
        methods: {
            closeModal() {
                store.dispatch(actions.RESET_ADMIN_QUOTES);
            },
            saveOrUpdateQuote() {
                store.dispatch(actions.UPDATE_QUOTE, this.sentQuote);
            }
        },
        mounted() {}
    }

</script>
