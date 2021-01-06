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
      <v-card-text style="min-height: 100px; max-height: 300px">
        <input type="hidden" id="clipboard" />
        <v-list>
          <v-list-item
            v-for="item in haveCommand"
            :key="item.name"
            two-line
            @click.stop.prevent="copyToClipboard(item)"
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
        <v-alert
          style="margin-bottom: 0; padding: 6px; font-size: 14px"
          color="grey darken-1"
          dense
          elevation="2"
          type="info"
          transition="slide-x-transition"
          :value="alert.rendered"
        >
          Copiado ``<span style="font-family: Arial; font-style: italic">{{
            alert.message
          }}</span
          >``
        </v-alert>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          FECHAR
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
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
      alert: { rendered: false, message: "" },
      clipboard: "1234",
    };
  },
  methods: {
    copyToClipboard(label) {
      const clipboard = label.command;

      const element = document.querySelector("#clipboard");
      element.setAttribute("type", "text");
      element.setAttribute("value", clipboard);
      element.select();

      const successful = document.execCommand("copy");

      element.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();

      if (successful) {
        this.alert.message = clipboard;
        this.alert.rendered = true;
        setTimeout(() => {
          this.alert.message = "";
          this.alert.rendered = false;
        }, 5000);
      }
    },
  },
};
</script>