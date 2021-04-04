<template>
    <v-card>
        <v-card-title>
            {{ quote }}
        </v-card-title>
        <v-card-actions>
            <social-component :id="quote.id"> </social-component>
        </v-card-actions>
    </v-card>
</template>

<script>
    import SocialComponent from './SocialComponent';

    export default {
        components: { SocialComponent },
        props: {
            quote: Object
        },
        data() {
            return {
                alllikes: '',
            }
        },
        methods: {

        },
        mounted() {
        }
    }

</script>