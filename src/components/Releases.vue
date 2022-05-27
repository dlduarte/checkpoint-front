<template>
  <v-dialog v-model="dialog" scrollable max-width="800px">
    <template v-slot:activator="{ on, attrs }">
      <v-icon color="blue" dense large v-bind="attrs" v-on="on"
        >mdi-text-box-check</v-icon
      >
    </template>
    <v-card>
      <v-card-title>Lançamentos</v-card-title>
      <v-divider></v-divider>
      <input type="hidden" />
      <v-card-text style="min-height: 100px; max-height: 300px">
        <v-list>
          <v-list-item v-for="item in haveCommand" :key="item.name" two-line>
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.command }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-icon>
              <v-icon v-if="item.sent" color="green">mdi-check</v-icon>
            </v-list-item-icon>
            
            <v-list-item-action>
              <v-select
                v-model="item.issue"
                :items="issues"
                label="Issue"
                item-text="title"
                return-object
              ></v-select>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click="dialog = false">
          FECHAR
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="applySpends"> ENVIAR </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import { issue_getAll, issue_applySpend, errorHandling } from "../api";

export default {
  name: "Releases",
  props: { spends: Array },
  computed: {
    haveCommand: function () {
      return this.spends.filter(item => item.type == "PAID");
    },
  },
  mounted() {
    this.updateIssues();
  },
  data() {
    return {
      dialog: false,
      issues: [],
    };
  },
  methods: {
    async updateIssues() {
      await axios
        .get(issue_getAll)
        .then((resp) => (this.issues = resp.data))
        .catch((err) => this.$toast.error(errorHandling(err)));
    },
    applySpends() {
      this.haveCommand.forEach(spend => {
        const duration = spend.command.substring(7, spend.command.length - 10);
        axios
          .post(issue_applySpend(spend.issue.projectId, spend.issue.issueId, duration))
          .then(() => spend.sent = true)
          .catch((err) => this.$toast.error(errorHandling(err)));
      });
    },
  },
};
</script>