<template>
    <v-row cols="2">
        <v-col
          >
            <v-btn
                href="/login/facebook"
              icon
              color="indigo"
            >
              <v-icon>mdi-facebook-box</v-icon>
            </v-btn>
        </v-col>
        <v-col
          >
            <v-btn
                href="/login/google"
                icon
            >
              <v-icon>mdi-google-plus</v-icon>
            </v-btn>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        props: {
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
