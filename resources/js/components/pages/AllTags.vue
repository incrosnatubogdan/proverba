<template>
<!-- :class="isSelected(tag) ? 'tags__item tags__selected' : 'tags__item',
                        needToRemoveTag && !isSelected(tag) ? '' : ''" -->
    <div>
        <v-row>
            <v-col cols="12" class="tags__grid">
                <!-- {{ allTags }} -->
                <p v-for="tag in allTags" :key="tag" 
                 :class="classObject(tag)"
                @click="toggleTag(tag)" 
                :disabled="needToRemoveTag && !isSelected(tag)">
                    {{ tag }}
                </p>
            </v-col>
            <v-col cols="12" v-if="needToRemoveTag">
                Tags need to be removed
            </v-col>
            <v-col cols="12" v-else>
                <!-- <v-btn @click="setTags" :disabled="submitDisabled">
                    Set tags
                </v-btn> -->

                <v-tooltip bottom :disabled="!validNoTags">
                    <template v-slot:activator="{ on }">
                        <div v-on="on" class="d-inline-block">
                            <v-btn @click="setTags" color="primary" :disabled="validNoTags">Set tags</v-btn>
                        </div>
                    </template>
                    <span>Intre 3-5 taguri</span>
                </v-tooltip>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import * as actions from '../../store/types/actions'
    import store from '../../store/index'
    import {
        mapGetters
    } from 'vuex'
    export default {
        computed: {
            ...mapGetters([
                'allTags',
                'getTags'
            ]),
            validNoTags() {
                return this.getTags.length >= 6 || this.getTags.length < 3
            }
        },
        data() {
            return {
                needToRemoveTag: false
            }
        },
        watch: {
            numberOfQuotes: {
                handler(number) {}
            },
        },
        mounted() {
            store.dispatch(actions.GET_ALL_TAGS)
        },
        methods: {
            toggleTag(tag) {
                store.dispatch(actions.SET_LOCAL_TAGS, tag).then(() => {
                    if(this.getTags.length >= 6) {
                        this.needToRemoveTag = true
                    } else {
                        this.needToRemoveTag = false
                    }
                })
            },
            isSelected(tag) {
                return this.getTags.includes(tag)
            },
            setTags() {
                store.dispatch(actions.SET_LOADER, true).then( () => {
                    store.dispatch(actions.SET_TUTORIAL, true).then( () => {
                        store.dispatch(actions.SEARCH_WITH_TAGS, this.getTags)
                    })
                })                
            },
            classObject(tag) {
                return {
                    "tags__item" : true,
                    tags__selected: this.isSelected(tag),
                    tags__disabled: this.needToRemoveTag && !this.isSelected(tag),
                }
            }
        },
    }

</script>
