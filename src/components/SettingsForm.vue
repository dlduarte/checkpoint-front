<template>
  <v-dialog v-model="control" max-width="500">
    <v-card>
      <v-card-title>Configurações</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row v-for="item in settings" :key="item.key">
          <v-col cols="12">
            <v-text-field
              v-model="item.value"
              type="time"
              label="Início do expediente"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="control = false">
          Cancelar
        </v-btn>
        <v-btn color="green darken-1" text @click="saveSettings">
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import { setting_save, errorHandling } from "../api";

export default {
  name: "SettingsForm",
  props: { value: Boolean, settings: Array },
  computed: {
    control: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    saveSettings() {
      axios
        .post(setting_save, this.settings[0])
        .then(() => (this.control = false))
        .catch((err) => this.$toast.error(errorHandling(err)));
    },
  },
};
</script>