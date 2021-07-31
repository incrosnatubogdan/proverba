<template>
    <v-card>
        <v-card-title>
            Add quotes from excel
        </v-card-title>
        <v-card-text>
            <input ref="excelUpload" type="file" @change="onChange">
            <v-btn
                class="ma-2"
                color="secondary"
                href="/spreadsheet/empty"
                target="_blank"
                >
                Download Excel template
                </v-btn>
            <v-data-table :headers="headers" :items="getCSVData">
                <template #item.index="props">
                    {{ props.item.index + 1 }}
                </template>

                <template #item.tags="{ item }">
                    <v-chip
                    v-for="(tag, tagIndex) in item.tags"
                    :key="tagIndex"
                    dark
                    x-small
                    >
                    {{ tag }}
                    </v-chip>
                </template>

                <template #item.actions="{ item }">
                    <v-icon small @click="deleteUser(item)">
                        mdi-delete
                    </v-icon>
                </template>
            </v-data-table>
        </v-card-text>
        <v-card-actions>
            <v-spacer />
            <v-btn class="warning" @click="clear">
                Clear
            </v-btn>
            <v-btn
                color="blue darken-1" elevation="2" @click="saveQuotes">
                Save
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import store from '../../store/index';
    import * as actions from '../../store/types/actions';

    import {
        mapState,
        mapGetters
    } from 'vuex';
    import XLSX from "xlsx"

    export default {
        data() {
            return {
                localCopy: [],
                loadingCSV: false,
                headers: [{
                        text: 'Index',
                        align: 'start',
                        sortable: false,
                        value: 'index',
                    }, {
                        text: 'Title',
                        sortable: false,
                        value: 'post_title',
                    },
                    {
                        text: 'Description',
                        value: 'description'
                    },
                    {
                        text: 'Tags',
                        value: 'tags'
                    },
                    {
                        text: 'Actions',
                        value: 'actions',
                        sortable: false
                    },
                ],
            }
        },
        computed: {
            ...mapGetters([
                'isLoggedIn',
                'getCSVData'
            ]),

            localCopy() {
                return this.getCSVData.map(x => Object.assign({}, x));
            },
        },
        mounted() {},
        methods: {
            clear() {
                this.$refs.excelUpload.value = null;
                store.dispatch(actions.SET_CSV_DATA, [])
            },
            onChange(e) {
                var files = e.target.files,
                    f = files[0];
                var reader = new FileReader();
                let readData;
                reader.onload = function (e) {
                    var data = new Uint8Array(e.target.result);
                    var workbook = XLSX.read(data, {
                        type: 'array'
                    });
                    let sheetName = workbook.SheetNames[0]
                    /* DO SOMETHING WITH workbook HERE */
                    let worksheet = workbook.Sheets[sheetName];

                    readData = XLSX.utils.sheet_to_json(worksheet)
                    if (readData.length > 0) {
                        try {
                            readData = readData.map((item, index) => {
                                return {
                                    post_title: item['Title'],
                                    description: item['Description'],
                                    tags: Object.values(_.pickBy(item, (value, key) =>
                                        _.some(['Tags'], str => _.includes(key, str))
                                     )),
                                    index: index
                                };
                            });

                            store.dispatch(actions.SET_CSV_DATA, readData)
                        } catch (e) {
                            store.dispatch(actions.PUSH_NOTIFICATION, {
                                type: 'warning',
                                message: 'An error has occured while adding the excel data, please make sure that the data is valid.'
                            }, {
                                root: true
                            });
                            store.dispatch(actions.SET_CSV_DATA, [])
                        }
                    }
                };
                reader.readAsArrayBuffer(f);
            },

            saveQuotes() {
                this.loadingCSV = true;
                store.dispatch(actions.QUOTES_BULK_UPDATE, this.localCopy).then(() => {
                    store.dispatch(actions.SET_CSV_DATA, []);
                    this.loadingCSV = false;
                });
            },

        },

    }

</script>
