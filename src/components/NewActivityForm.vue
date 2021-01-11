<template>
  <div>
    <v-card>
      <v-container fluid>
        <v-row align="center">
          <v-col cols="4">
            <Calendar label="Data" @blur="onChangeReference" />
          </v-col>
          <v-col cols="6">
            <v-row>
              <v-col cols="6">
                <b>Tempo útil</b>
                <p>{{ summary.worked }}</p>
              </v-col>
              <v-col cols="6">
                <b>Tempo perdido</b>
                <p>{{ summary.strayed }}</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="2">
            <Releases :spends="summary.resume" />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <br />
    <v-card>
      <v-card-title>Novo registro</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              ref="focusable"
              v-model="activity.name"
              label="Descrição"
            />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="3">
            <v-text-field
              v-model="activity.ended"
              type="time"
              label="Finalização"
            />
          </v-col>
          <v-col cols="6">
            <SelectType v-model="activity.type" @change="onSelectType" />
          </v-col>
          <v-col cols="3">
            <v-btn color="green darken-1" text @click="newActivity">
              Inserir
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Releases from "./Releases";
import Calendar from "./Calendar";
import SelectType from "./SelectType";

import axios from "axios";
import { activity_save, errorHandling } from '../api';

export default {
  name: "NewActivityForm",
  props: { summary: Object, date: String },
  components: {
    Releases,
    SelectType,
    Calendar,
  },
  data() {
    return {
      reference: this.date,
      activity: {
        name: "",
        ended: new Date().toTimeString().substring(0, 5),
        type: "PAID",
      },
    };
  },
  methods: {
    getSpends() {
      this.spends = this.summary.resume
        .filter((item) => item.type === "PAID")
        .map((item) => {
          let command = "/spend";
          return { name: item.name, command: command };
        });
    },
    onSelectType(type) {
      this.activity.type = type;
    },
    onChangeReference(reference) {
      this.reference = reference;
      this.emitChange();
    },
    emitChange() {
      this.$emit("change", this.reference);
    },
    newActivity() {
      this.activity.reference = this.reference;
      axios
        .post(activity_save, this.activity)
        .then(() => this.emitChange())
        .then(() => this.reset())
        .catch(err => this.$toast.error(errorHandling(err)));
    },
    reset() {
      this.activity = {
        name: "",
        ended: new Date().toTimeString().substring(0, 5),
        type: "PAID",
      };
      this.$refs.focusable.focus();
    },
  },
};
</script>