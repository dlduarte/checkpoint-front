<template>
  <div>
    <v-card class="mx-auto">
    <v-list-item>
      <v-row>
        <v-col cols="10">Descição</v-col>
        <v-col cols="2">Total</v-col>
      </v-row>
    </v-list-item>
    <v-virtual-scroll min-height="50" max-height="300" :items="summary.resume" :item-height="50">
      <template v-slot:default="{ item }">
        <v-divider />
        <v-list-item>
          <v-row>
            <v-col cols="10">{{ item.name }}</v-col>
            <v-col cols="2">{{ item.total }}</v-col>
          </v-row>
        </v-list-item>
      </template>
    </v-virtual-scroll>
    </v-card>
    <br />
    <v-card>
      <v-container fluid>
        <v-row>
          <v-col cols="6">
            <v-row>
              <v-col cols="12">
                <label
                  >Total de Horas remuneradas:
                  <b>{{ summary.worked }}</b></label
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <label
                  >Total de Horas não remuneradas:
                  <b>{{ summary.strayed }}</b></label
                >
              </v-col>
            </v-row>
          </v-col>
          <v-col></v-col>
          <v-col cols="1">
            <Releases :spends="summary.resume" />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import Releases from "./Releases";

export default {
  props: { summary: Object },
  components: {
    Releases,
  },
  data() {
    return {
      headers: [
        { text: "Descrição", value: "name" },
        { text: "Total", value: "total" },
      ]
    };
  },
  methods: {
    getColor(activity) {
      switch (activity.type) {
        case "PAID":
          return "light-blue lighten-4";
        case "JUSTIFIED_ABSENCE":
          return "pink lighten-2";
        case "UNEXCUSED_ABSENCE":
          return "red lighten-1";
        default:
          return "indigo lighten-3";
      }
    },
    getSpends() {
    this.spends = this.summary.resume
      .filter(item => item.type === 'PAID')
      .map(item => {
        let command = '/spend';
        return { name: item.name, command: command}
      });
    console.log(this.spends);
  },
  },
};
</script>