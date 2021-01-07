<template>
  <v-container fluid>
    <br />
    <v-row>
      <v-col cols="4">
        <NewActivityForm
          :summary="summary"
          :date="reference"
          @change="onChangeReference"
        />
      </v-col>
      <v-col cols="8">
        <TableActivity :items="activities" @formchange="onChangeReference" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TableActivity from "./TableActivity";
import NewActivityForm from "./NewActivityForm";

import axios from "axios";
import { today } from "../utilities/dateHandler";

export default {
  name: "Index",
  components: {
    TableActivity,
    NewActivityForm,
  },
  mounted() {
    this.updateTable();
  },
  data() {
    return {
      reference: today(),
      activities: [],
      summary: {
        resume: [],
        worked: "00:00",
        strayed: "00:00",
      },
    };
  },
  methods: {
    onChangeReference(reference) {
      if (reference) this.reference = reference;
      this.updateTable();
    },
    updateTable() {
      axios
        .get(`http://localhost:9100/activity/${this.reference}`)
        .then((response) => (this.activities = response.data))
        .then(
          axios
            .get(`http://localhost:9100/activity/summary/${this.reference}`)
            .then((response) => (this.summary = response.data))
        );
    },
  },
};
</script>