<template>
   <v-app>
       <v-btn x-large color="success" @click="editQuote(emptyQuote)"> New quote </v-btn>
        <v-data-table
        v-if="adminQuotes"
        :footer-props="{
            showCurrentPage:true,
            showFirstLastPage: true,
            showCurrentPage:true,
            disablePagination: false,
            'items-per-page-options': [10,15, 20, 30, 40, 50,100],
            firstIcon: 'mdi-arrow-collapse-left',
            lastIcon: 'mdi-arrow-collapse-right',
            prevIcon: 'mdi-minus',
            nextIcon: 'mdi-plus',
        }" 
      :page-count="adminTableNumberOfPages"
      :items-per-page="options.itemsPerPage" 
      :headers="tableHeaders" 
      :items.sync="localCopy">

        <template #item.tags_translated="{ item }">
            <v-chip
            v-for="(tag, tagIndex) in item.tags_translated"
            :key="tagIndex"
            dark
            x-small
            >
            {{ tag.name.en }}
            </v-chip>
        </template>


        <template #item.actions="{ item }">
            <v-icon small @click="deleteQuote(item)">
                mdi-delete
            </v-icon>

            <v-icon small @click="editQuote(item)">
                mdi-pencil
            </v-icon>
        </template>
    </v-data-table>
    <quote-modal />
    <quote-delete-modal />
   </v-app>
</template>

<script>
    import store from '../store/index';
    import * as actions from '../store/types/actions';

    import {
        mapState,
        mapGetters
    } from 'vuex';
    import QuoteModal from './QuoteModal.vue';
import QuoteDeleteModal from './QuoteDeleteModal.vue';

    export default {
        data() {
            return {
                tableHeaders: [{
                        text: 'ID',
                        align: 'start',
                        sortable: false,
                        value: 'id',
                    },
                    {
                        text: 'Title',
                        value: 'post_title'
                    },
                    {
                        text: 'Description',
                        value: 'description'
                    },
                    {
                        text: 'Total likes',
                        value: 'total_likes'
                    },
                    {
                        text: 'Tags',
                        value: 'tags_translated',
                        sortable: false
                    },
                    {
                        text: 'Actions',
                        value: 'actions',
                        sortable: false
                    },
                ],
            }
        },
        components: {QuoteModal, QuoteDeleteModal},
        computed: {
            ...mapGetters([
                'isLoggedIn',
                'adminQuotes',
                'getAdminSearchFilters',
                'adminTableNumberOfQuotes',
                'adminTableNumberOfPages',
                'emptyQuote'
            ]),

            options: {
                get() {
                    return this.getAdminSearchFilters
                },
                set(value) {},
            },

             localCopy() {
                return this.adminQuotes.map(x => Object.assign({}, x));
            },
        },
        methods: {
            deleteQuote(quote) {
                store.dispatch(actions.TOGGLE_DELETE_POPUP, {
                    popup: true,
                    quote: quote
                })
            },

            editQuote(quote) {
                store.dispatch(actions.EDIT_ADMIN_QUOTES, quote)
            }
        },
        mounted() {
            store.dispatch(actions.ADMIN_QUOTES, 0)
        }
    }

</script>
