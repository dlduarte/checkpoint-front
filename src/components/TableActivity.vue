<template>
  <div>
    <v-card class="mx-auto">
      <v-list-item>
        <v-btn icon small disabled></v-btn>
        <v-row>
          <v-col md="7" lg="8">Descição</v-col>
          <v-col md="2" lg="1">Início</v-col>
          <v-col md="2" lg="1">Fim</v-col>
          <v-col md="2" lg="2">Tipo</v-col>
        </v-row>
      </v-list-item>
      <v-virtual-scroll
        :height="vsheight"
        :max-height="vsmheight"
        :items="items"
        :item-height="50"
      >
        <template v-slot="{ item }">
          <v-divider />
          <input type="hidden" id="clipboard-activity" />
          <v-list-item>
            <v-btn icon small @click.stop.prevent="copyToClipboard(item.name)">
              <v-icon color="blue" small>mdi-content-copy</v-icon>
            </v-btn>
            <v-row @click.stop.prevent="editActivity(item)">
              <v-col md="7" lg="8">{{ item.name }}</v-col>
              <v-col md="2" lg="1">{{ item.beginning }}</v-col>
              <v-col md="2" lg="1">{{ item.ended }}</v-col>
              <v-col md="2" lg="2">
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
    <EditActivityForm
      v-model="dlgEditActivity"
      :selected="selected"
      @formchange="$emit('formchange')"
    />
  </div>
</template>

<script>
import EditActivityForm from "./EditActivityForm";

import { copy } from "../utilities/clipboard";

export default {
  props: { items: Array },
  components: {
    EditActivityForm,
  },
  data() {
    return {
      dlgEditActivity: false,
      selected: {
        name: "",
        ended: "00:00",
        type: "PAID",
      },
    };
  },
  computed: {
    vsheight() {
      if (this.items.length == 0) return 50;
      return this.items.length * 50;
    },
    vsmheight() {
      let heigth = window.innerHeight - window.innerHeight * 0.2; // I remove 20% from total heigth
      let diff = heigth % 50; // I calculate the rest of the multiple of 50 (50 = list line heigth)

      if (heigth + (diff % 50) == 0) {
        // if the rest + the heigth is a multiple of 50, I use it
        return heigth + diff;
      } else {
        // otherwise I use the height minus the rest
        return heigth - diff;
      }
    },
  },
  methods: {
    editActivity(item) {
      this.selected = item;
      this.dlgEditActivity = true;
    },
    copyToClipboard: function (name) {
      const success = copy(name, "clipboard-activity");
      if (success) {
        this.$toast.info(`Copiado '${name}'`, {
          color: "gray",
          timeout: 3000,
        });
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
.v-virtual-scroll::-webkit-scrollbar {
  display: none;
}
</style>