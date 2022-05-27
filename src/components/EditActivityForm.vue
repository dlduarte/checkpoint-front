<template>
  <v-dialog v-model="control" max-width="500">
    <v-card>
      <v-card-title>Editar registro</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="activity.name" label="Descrição" />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="4">
            <v-text-field
              v-model="activity.ended"
              type="time"
              label="Finalização"
            />
          </v-col>
          <v-col cols="8">
            <SelectType v-model="activity.type" @change="onSelectType" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="control = false">
          Cancelar
        </v-btn>
        <v-btn color="green darken-1" text @click="editActivity">
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import SelectType from "./SelectType";

import axios from "axios";
import { activity_update, errorHandling } from '../api';

export default {
  name: "EditActivityForm",
  props: { value: Boolean, selected: Object },
  components: {
    SelectType,
  },
  computed: {
    control: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    activity: {
      get() {
        let a = Object.assign({}, this.selected);
        delete a.beginning;
        delete a.reference;
        return a;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    onSelectType(type) {
      this.activity.type = type;
    },
    editActivity() {
      axios
        .put(activity_update, this.activity)
        .then(() => this.$emit("formchange"))
        .then(() => (this.control = false))
        .catch(err => this.$toast.error(errorHandling(err)));
    },
  },
};
</script>