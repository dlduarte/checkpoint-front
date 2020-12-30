<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="logo-ckechpoint"
          class="shrink mr-2"
          contain
          src="./assets/logo.svg"
          transition="scale-transition"
          width="40"
        />
        <h1>Checkpo!nt</h1>
      </div>
    </v-app-bar>

    <v-main>
      <Index />
    </v-main>
  </v-app>
</template>

<script>
import Index from "./components/Index";

export default {
  name: "App",
  components: {
    Index,
  },
};
</script>

<style scoped>
h1 {
  font-family: "Lucida Sans Unicode", sans-serif;
}
</style>
