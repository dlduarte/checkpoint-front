<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="summary.resume"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
    <v-card
      style="
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        box-shadow: 0px 5px 1px -2px rgba(0, 0, 0, 0.2),
          0px 5px 2px 0px rgba(0, 0, 0, 0.14),
          0px 5px 5px 0px rgba(0, 0, 0, 0.12);
      "
    >
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <label>Total de Horas remuneradas: <b>{{ summary.worked }}</b></label>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <label>Total de Horas não remuneradas: <b>{{ summary.strayed }}</b></label>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  props: { summary: Object },
  data() {
    return {
      headers: [
        { text: "Descrição", value: "name" },
        { text: "Total", value: "total" },
      ],
    };
  },
};
</script>

<style>
</style>