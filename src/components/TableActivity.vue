<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="5"
    class="elevation-1"
  >
    <template v-slot:item.type="{ item }">
      <v-chip :color="getColor(item.type)">
        <select v-bind:value="item.type" class="masked-option" disabled>
          <option value="PAID">Remunerado</option>
          <option value="UNPAID">Não Remunerado</option>
          <option value="JUSTIFIED_ABSENCE">Falta Justificada</option>
          <option value="UNEXCUSED_ABSENCE">Falta Não Justificada</option>
        </select>
      </v-chip>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: { items: Array },
  data() {
    return {
      headers: [
        { text: "Descrição", value: "name" },
        { text: "Início", value: "beginning" },
        { text: "Fim", value: "ended" },
        { text: "Tipo", value: "type" },
      ],
    };
  },
  methods: {
    getColor(type) {
      switch (type) {
        case "PAID":
          return "green";
        case "UNEXCUSED_ABSENCE":
          return "red";
        default:
          return "orange";
      }
    },
  },
};
</script>

<style scoped>
.masked-option {
  border: none;
  color: #fff;
  -webkit-appearance: none;
  -moz-appearance: none;
  font-size: 0.9rem;
  opacity: 1;
}
</style>