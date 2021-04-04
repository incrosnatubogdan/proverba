<template>
  <v-snackbar
    v-model="show"
    timeout="3000"
    :color="color || 'success'"
    absolute
    right
    bottom
  >
    {{ message }}
    <template #action="{ attrs }">
      <v-btn
        color="black"
        text
        v-bind="attrs"
        @click.native="show = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>

export default {
    data() {
        return {
            show: false,
            message: 'success',
            color: '',
            timeout: 3000
        }
    },

    mounted() {
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'PUSH_NOTIFICATION') {
                this.message = state.ui.snackbar.message
                this.color = state.ui.snackbar.type
                this.show = true
            }
        })
    }
}
</script>
