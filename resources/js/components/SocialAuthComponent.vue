<template>
    <v-row cols="1">
        <v-col class="text-center pb-0" cols="12">
            <h3>
                Autentificare cu altele
            </h3>
        </v-col>
        <v-col class="text-center py-0" cols="12">
            <v-btn href="/login/facebook" icon color="indigo">
                <v-icon>mdi-facebook-box</v-icon>
            </v-btn>
            <v-btn class="mr-2 ml-2" href="/login/google" icon>
                <v-icon>mdi-google-plus</v-icon>
            </v-btn>
            <v-btn href="/login/twitter" icon>
                <v-icon>mdi-twitter</v-icon>
            </v-btn>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        props: {},
        data() {
            return {}
        },
        methods: {},
        mounted() {}
    }

</script>
