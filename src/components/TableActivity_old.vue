<template>
  <v-data-table
    :headers="headers"
    :items="items"
    hide-default-footer
    class="elevation-1"
  >
    <template v-slot:body="{ items }">
      <tbody>
        <tr v-for="item in items" :key="item.id" :class="getColor(item)">
          <td>{{ item.name }}</td>
          <td>{{ item.beginning }}</td>
          <td>{{ item.ended }}</td>
          <td>
            <select :value="item.type" class="masked-option" disabled>
              <option value="PAID">Remunerado</option>
              <option value="UNPAID">Não Remunerado</option>
              <option value="JUSTIFIED_ABSENCE">Falta Justificada</option>
              <option value="UNEXCUSED_ABSENCE">Falta Não Justificada</option>
            </select>
          </td>
        </tr>
      </tbody>
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
  },
};
</script>

<style scoped>
.masked-option {
  border: none;
  color: rgba(0, 0, 0, 0.87);
  -webkit-appearance: none;
  -moz-appearance: none;
  font-size: 0.9rem;
  opacity: 1;
}
</style>