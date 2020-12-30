<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2">
        <Calendar label="Data" />
      </v-col>
      <v-col cols="4">
        <v-text-field
          v-model="name"
          ref="focusable"
          id="name"
          label="Descrição"
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field
          v-model="ended"
          id="ended"
          type="time"
          label="Horário de finalização"
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <SelectType @change="onSelectType" />
      </v-col>
      <v-col cols="2">
        <v-btn color="green" style="color: #fff" v-on:click="newActivity" x-large>Inserir</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="7">
        <TableActivity v-bind:items="activities" />
      </v-col>
      <v-col cols="5">
        <SummaryActivity v-bind:summary="summary" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Calendar from './Calendar';
import SelectType from "./SelectType";
import TableActivity from "./TableActivity";
import SummaryActivity from "./SummaryActivity";

import axios from "axios";

export default {
  name: "Index",
  components: {
    Calendar,
    SelectType,
    TableActivity,
    SummaryActivity,
  },
  mounted() {
    this.updateTable();
  },
  data() {
    return {
      today: this.getToday(),
      ended: new Date().toTimeString().substring(0, 5),
      name: "",
      type: "PAID",
      activities: [],
      summary: {
        resume: [],
        worked: "00:00",
        strayed: "00:00",
      },
    };
  },
  methods: {
    getToday() {
      const date = new Date();
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    onSelectType(type) {
      this.type = type;
    },
    updateTable() {
      axios
        .get(`http://localhost:9100/activity/${this.today}`)
        .then((response) => (this.activities = response.data))
        .then(
          axios
            .get(`http://localhost:9100/activity/summary/${this.today}`)
            .then((response) => (this.summary = response.data))
        );
    },
    newActivity() {
      const activity = {
        reference: this.today,
        name: this.name.toUpperCase(),
        ended: this.ended,
        type: this.type,
      };

      axios
        .post("http://localhost:9100/activity", activity)
        .then(() => this.updateTable())
        .then(() => this.reset());
    },
    reset() {
      this.name = "";
      this.type = "PAID";
      this.ended = new Date().toTimeString().substring(0, 5);
      this.$refs.focusable.focus();
    },
  },
};
</script>