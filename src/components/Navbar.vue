<template>
  <v-app-bar app color="primary" dark>
    <v-img
      alt="logo-ckechpoint"
      class="shrink mr-2"
      contain
      src="@/assets/logo.svg"
      transition="scale-transition"
      width="25"
    />
    <label>Checkpoint</label>
    <v-spacer></v-spacer>
    <v-btn title="Configurações" icon @click="openConfigs">
      <v-icon>mdi-cog</v-icon>
    </v-btn>
    <v-btn title="Sair" icon @click="logout">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
    <SettingsForm v-model="dlgSettings" :settings="settings" />
  </v-app-bar>
</template>

<script>
import axios from "axios";
import { setting_getAll, errorHandling } from "../api";
import Cookies from "js-cookie";
import SettingsForm from "./SettingsForm";

export default {
  name: "Navbar",
  components: {
    SettingsForm,
  },
  data() {
    return {
      dlgSettings: false,
      settings: [],
    };
  },
  methods: {
    logout() {
      Cookies.remove("authentication");
      this.$router.push("/");
    },
    openConfigs() {
      axios
        .get(setting_getAll)
        .then((resp) => (this.settings = resp.data))
        .then(() => this.dlgSettings = true)
        .catch((err) => this.$toast.error(errorHandling(err)));
    },
  },
};
</script>

<style>
</style>