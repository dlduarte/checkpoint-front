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
    <v-btn title="Configurações" icon disabled>
      <v-icon>mdi-cog</v-icon>
    </v-btn>
    <v-btn title="Sair" icon @click="logout">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import Cookies from "js-cookie";

export default {
  name: "Navbar",
  methods: {
    logout() {
      Cookies.remove("authentication");
      this.$router.push("/");
    },
  },
};
</script>

<style>
</style>