<template>
  <div>
    <Navbar />
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
    <Footer/>
  </div>
</template>

<script>
import Navbar from "../Navbar";
import Footer from "../Footer";

import TableActivity from "../TableActivity";
import NewActivityForm from "../NewActivityForm";

import axios from "axios";
import { today } from "../../utilities/dateHandler";
import { activity_getAll, activity_getSummary, errorHandling } from "../../api";

export default {
  name: "Activities",
  components: {
    Navbar,
    Footer,
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
      error: { render: false, message: "" },
    };
  },
  methods: {
    onChangeReference(reference) {
      if (reference) this.reference = reference;
      this.updateTable();
    },
    async updateTable() {
      let success = false;

      await axios
        .get(activity_getAll(this.reference))
        .then((resp) => {
          this.activities = resp.data;
          success = true;
        })
        .catch((err) => this.$toast.error(errorHandling(err)));

      if (success) {
        await axios
          .get(activity_getSummary(this.reference))
          .then((resp) => (this.summary = resp.data))
          .catch((err) => this.$toast.error(errorHandling(err)));
      }

      console.log(JSON.stringify(this.summary, null, 2));
    },
  },
};
</script>