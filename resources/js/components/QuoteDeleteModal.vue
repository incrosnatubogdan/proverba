<template>
  <!--Delete user confirmation!-->
  <v-dialog
    v-model="adminDeleteDialog"
    max-width="800px"
  >
    <v-card>
      <v-card-title
        class="headline"
      >
        Are you sure you want to delete  &nbsp;
        <b>{{ quoteToDelete.post_title }}</b> ?
      </v-card-title>
      <v-card-subtitle class="mt-2">
        This quote will be permanently deleted. <br>
      </v-card-subtitle>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          text
          @click="closeDelete"
        >
          Cancel
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="deleteItemConfirm"
        >
          OK
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import * as actions from '../store/types/actions';
import store from '../store/index';
import {mapGetters} from "vuex";

export default {
    name: "DialogConfirmation",
    computed: {
        ...mapGetters(['adminDeleteDialog','quoteToDelete']),
    },
    methods: {
        closeDelete() {
            store.dispatch(actions.TOGGLE_DELETE_POPUP, {
                popup: false,
            })
        },
        deleteItemConfirm() {
            store.dispatch(actions.DELETE_QUOTE,this.quoteToDelete);
        }
    }
}
</script>

<style scoped>

</style>
