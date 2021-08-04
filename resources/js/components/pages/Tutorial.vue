<template>
    <div>
        <v-row 
        align="center"
        justify="center"
        v-if="!passedLogin"
        >
            <v-col class="text-center" cols="12">
                <logo-svg />
            </v-col>
            <v-col class="text-center" cols="12">
                <h2>
                    Bine ai nimerit!
                </h2>
            </v-col>
            <v-col class="text-center" cols="12">
                <v-btn class="mr-2">
                    Creaza cont
                </v-btn>
                <v-btn class="ml-2">
                    Autentificare
                </v-btn>
                <v-btn class="ml-2" @click="showSetTags">
                    Nu acum, mai incolo
                </v-btn>
            </v-col>
            <v-col class="text-center" cols="12">
                <social-login />
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col class="text-center" cols="12">
                <all-tags />
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import SocialAuthComponent from '../SocialAuthComponent';
    import * as actions from '../../store/types/actions'
    import store from '../../store/index'
    import LogoSVG from '../img/LogoSVG'
    import AllTags from '../pages/AllTags'
    import {
        mapGetters
    } from 'vuex'


    export default {
        components: { 
            'social-login' : SocialAuthComponent,
            'logo-svg' :LogoSVG,
            AllTags
        },
        props: {
            is_auth: Boolean,
        },
        computed: {
            ...mapGetters([
                'tutorialCompleted',
                'passedLogin'
            ]),
        },
        props: {
        },
        data() {
            return {
                // skipLogin: true
            }
        },
        watch: {
            numberOfQuotes: {
                handler(number) {}
            },
        },
        mounted() {
            // store.dispatch(actions.INITIALIZE).then( () => {
            //         store.dispatch(actions.GET_QUOTES)
            // })
        },
        methods: {
            showSetTags() {
                store.dispatch(actions.PASSED_LOGIN, true)
                
                // this.skipLogin = true
            }
        },
    }

</script>