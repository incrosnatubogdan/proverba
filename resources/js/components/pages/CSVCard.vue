<template>
    <v-card>
        <v-card-title>
            Add quotes from excel
        </v-card-title>
        <v-card-text>
            <input ref="excelUpload" type="file" @change="onChange">
            <v-data-table :headers="headers" :items="getCSVData">
                <template #item.index="props">
                    {{ props.item.index + 1 }}
                </template>

                <template #item.fname="props">
                    <v-edit-dialog :return-value.sync="props.item.fname">
                        {{ props.item.fname }}
                        <template #input>
                            <v-text-field v-model="props.item.fname" label="Edit" single-line />
                        </template>
                    </v-edit-dialog>
                </template>

                <template #item.lname="props">
                    <v-edit-dialog :return-value.sync="props.item.lname">
                        {{ props.item.lname }}
                        <template #input>
                            <v-text-field v-model="props.item.lname" label="Edit" single-line />
                        </template>
                    </v-edit-dialog>
                </template>

                <template #item.username="props">
                    <v-tooltip v-if="getOnlyCheckedUsernames.includes(props.item.username)" bottom>
                        <template #activator="{ on, attrs }">
                            <v-edit-dialog :return-value="props.item.username">
                                <v-btn :class="checkIfErrored('username', props.item.index) ? 'red--text' : '' "
                                    class="ma-2 text__button" depressed outlined v-bind="attrs" v-on="on">
                                    {{ props.item.username }}
                                    <v-icon dark right color="red">
                                        mdi-pencil
                                    </v-icon>
                                </v-btn>
                                <template #input>
                                    <v-text-field :value="props.item.username" label="Edit" single-line
                                        @change="updateUsername($event, props.item)" />
                                </template>
                            </v-edit-dialog>
                        </template>
                        <span
                            v-if="checkIfErrored('username', props.item.index)">{{ getBulkErrors.username[props.item.index].join(', ') }}</span>
                    </v-tooltip>

                    <v-btn v-else class="ma-2 text__button new" depressed>
                        {{ props.item.username }}
                        <v-icon dark right color="success">
                            mdi-checkbox-marked-circle
                        </v-icon>
                    </v-btn>

                    <v-icon v-if="getOnlyCheckedUsernames.includes(props.item.username)" dark right color="success"
                        class="custom-icon__see_user" @click="userByUsername(props.item.username)">
                        mdi-eye
                    </v-icon>
                </template>

                <template #item.email="props">
                    <v-tooltip v-if="checkIfErrored('email', props.item.index)" bottom>
                        <template #activator="{ on, attrs }">
                            <v-edit-dialog :return-value="props.item.email">
                                <v-btn class="ma-2 text__button red--text" depressed outlined v-bind="attrs" v-on="on">
                                    {{ props.item.email }}
                                    <v-icon dark right color="red">
                                        mdi-pencil
                                    </v-icon>
                                </v-btn>
                                <template #input>
                                    <v-text-field v-model="props.item.email" label="Edit" single-line />
                                </template>
                            </v-edit-dialog>
                        </template>
                        <span
                            v-if="checkIfErrored('email', props.item.index)">{{ getBulkErrors.email[props.item.index].join(', ') }}</span>
                    </v-tooltip>

                    <v-edit-dialog v-else :return-value.sync="props.item.email">
                        {{ props.item.email }}
                        <template #input>
                            <v-text-field v-model="props.item.email" label="Edit" single-line />
                        </template>
                    </v-edit-dialog>
                </template>

                <template #item.location="props">
                    <v-edit-dialog :return-value.sync="props.item.location" large persistent>
                        <div>{{ props.item.location }}</div>
                        <template #input>
                            <v-autocomplete v-model="props.item.location" label="Location" clearable
                                :items="availableLocation" />
                        </template>
                    </v-edit-dialog>
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
                headers: [{
                        text: 'Index',
                        align: 'start',
                        sortable: false,
                        value: 'index',
                    }, {
                        text: 'Title',
                        sortable: false,
                        value: 'title',
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
                                    title: item['Title'],
                                    description: item['Description'],
                                    tags: item['Tags'].split(","),
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

            },

        },

    }

</script>
