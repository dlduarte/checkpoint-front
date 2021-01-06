<template>
  <div>
    <v-card class="mx-auto">
      <v-list-item>
        <v-row>
          <v-col cols="8">Descição</v-col>
          <v-col cols="1">início</v-col>
          <v-col cols="1">Fim</v-col>
          <v-col cols="2">Tipo</v-col>
        </v-row>
      </v-list-item>
      <v-virtual-scroll
        min-height="50"
        max-height="300"
        :items="items"
        :item-height="50"
      >
        <template v-slot:default="{ item }">
          <v-divider />
          <v-list-item @click.stop.prevent="editActivity(item)">
            <v-row>
              <v-col cols="8">{{ item.name }}</v-col>
              <v-col cols="1">{{ item.beginning }}</v-col>
              <v-col cols="1">{{ item.ended }}</v-col>
              <v-col cols="2">
                <select :value="item.type" class="masked-option" disabled>
                  <option value="PAID">Remunerado</option>
                  <option value="UNPAID">Não Remunerado</option>
                  <option value="JUSTIFIED_ABSENCE">Falta Justificada</option>
                  <option value="UNEXCUSED_ABSENCE">
                    Falta Não Justificada
                  </option>
                </select>
              </v-col>
            </v-row>
          </v-list-item>
        </template>
      </v-virtual-scroll>
    </v-card>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>Editar registro</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="selected.name" label="Descrição" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model="selected.ended"
                type="time"
                label="Finalização"
              />
            </v-col>
            <v-col cols="8">
              <SelectType
                :initialValue="selected.type"
                @change="onSelectType"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="closeDialog">
            Cancelar
          </v-btn>
          <v-btn color="green darken-1" text @click="closeDialog">
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import SelectType from "./SelectType";

export default {
  props: { items: Array },
  components: {
    SelectType,
  },
  data() {
    return {
      dialog: false,
      selected: {
        name: "",
        ended: "00:00",
        type: "PAID",
      },
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
    editActivity(item) {
      this.selected = item;
      this.dialog = true;
    },
    onSelectType(type) {
      this.selected.type = type;
    },
    resetSelected() {
      this.selected = {
        name: "",
        ended: "00:00",
        type: "PAID",
      };
    },
    closeDialog() {
      this.resetSelected();
      this.dialog = false;
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
.v-virtual-scroll::-webkit-scrollbar {
  display: none;
}
</style>