<template>
  <v-dialog v-model="dialog" scrollable max-width="500px">
    <template v-slot:activator="{ on, attrs }">
      <v-icon color="blue" dense large v-bind="attrs" v-on="on"
        >mdi-text-box-check</v-icon
      >
    </template>
    <v-card>
      <v-card-title>Lançamentos</v-card-title>
      <v-divider></v-divider>
      <input type="hidden" id="clipboard-release" />
      <v-card-text style="min-height: 100px; max-height: 300px">
        <v-list>
          <v-list-item
            v-for="item in haveCommand"
            :key="item.name"
            two-line
            @click.stop.prevent="copyToClipboard(item.command)"
          >
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.command }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          FECHAR
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { copy } from "../utilities/clipboard";

export default {
  name: "Releases",
  props: { spends: Array },
  computed: {
    haveCommand: function () {
      return this.spends.filter((item) => item.type == "PAID");
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    copyToClipboard: function (command) {
      const success = copy(command, "clipboard-activity");
      if (success) {
        this.$toast.info(`Copiado '${command}'`, {
          color: "gray",
          timeout: 3000,
        });
      }
    },
  },
};
</script>