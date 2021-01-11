<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon>
      <v-img
        alt="logo-ckechpoint"
        class="shrink mr-2"
        contain
        src="../assets/logo.svg"
        transition="scale-transition"
        width="25"
      />
    </v-app-bar-nav-icon>
    <v-app-bar-title>Checkpoin</v-app-bar-title>
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
import Cookies from 'js-cookie'

export default {
    name: "Navbar",
    methods: {
        logout() {
            Cookies.remove('authentication');
            this.$router.push("/");
        }
    }
};
</script>

<style>
</style>