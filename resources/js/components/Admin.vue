<template>
   <v-app>
       <v-btn x-large color="success" @click="editQuote(emptyQuote)"> New quote </v-btn>
       <csv-card />
        <v-data-table
        v-if="adminQuotes"
        :footer-props="{
            showCurrentPage:true,
            showFirstLastPage: true,
            showCurrentPage:true,
            disablePagination: false,
            'items-per-page-options': [10,20, 50],
            firstIcon: 'mdi-arrow-collapse-left',
            lastIcon: 'mdi-arrow-collapse-right',
            prevIcon: 'mdi-minus',
            nextIcon: 'mdi-plus',
        }" 
      :page-count="adminTableNumberOfPages"
      :items-per-page="options.itemsPerPage"
      :options.sync="options"
      :headers="tableHeaders" 
      :server-items-length="adminTableNumberOfQuotes"
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
    import CSVCard from './pages/CSVCard.vue';

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
        components: {QuoteModal, QuoteDeleteModal, CSVCard},
        computed: {
            ...mapGetters([
                'isLoggedIn',
                'adminQuotes',
                'getAdminSearchFilters',
                'adminTableNumberOfQuotes',
                'adminTableNumberOfPages',
                'emptyQuote',
                'lastQuoteId'
            ]),

            options: {
                get() {
                    return this.getAdminSearchFilters
                },
                set(value) {
                    store.dispatch(actions.SET_ADMIN_FILTERS, value)
                    store.dispatch(actions.ADMIN_QUOTES, this.lastQuoteId)

                },
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

            // onChange(e) {
            //     var files = e.target.files,
            //         f = files[0];
            //     var reader = new FileReader();
            //     let readData;
            //     reader.onload = function (e) {
            //         var data = new Uint8Array(e.target.result);
            //         var workbook = XLSX.read(data, {
            //             type: 'array'
            //         });
            //         let sheetName = workbook.SheetNames[0]
            //         /* DO SOMETHING WITH workbook HERE */
            //         let worksheet = workbook.Sheets[sheetName];

            //         readData = XLSX.utils.sheet_to_json(worksheet)
            //         if (readData.length > 0) {
            //             try {
            //                 readData = readData.map((item, index) => {
                                
            //                     return {
            //                         lname: item['Title'],
            //                         fname: item['Description'],
            //                         location: item['Tags'],
            //                         index: index
            //                     };
            //                 });

            //                 store.dispatch(actions.SET_CSV_DATA, readData)
            //             } catch (e) {
            //                 store.dispatch(actions.PUSH_NOTIFICATION, {
            //                     type: 'warning',
            //                     message: 'An error has occured while adding the excel data, please make sure that the data is valid.'
            //                 }, {
            //                     root: true
            //                 });
            //                 store.dispatch(actions.SET_CSV_DATA, [])
            //             }
            //         }
            //     };
            //     reader.readAsArrayBuffer(f);
            // },

            editQuote(quote) {
                store.dispatch(actions.EDIT_ADMIN_QUOTES, quote)
            }
        },
        mounted() {
            store.dispatch(actions.ADMIN_QUOTES, 0)
        }
    }

</script>
