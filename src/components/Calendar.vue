<template>
  <v-menu
    ref="control"
    v-model="control"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="dateFormatted"
        v-bind:label="label"
        persistent-hint
        prepend-icon="mdi-calendar"
        v-bind="attrs"
        @blur="onBlurDate"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      no-title
      @input="control = false"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import { parse, today } from '../utilities/dateHandler';

export default {
  name: "Calendar",
  props: { label: String },
  data: vm => ({
    date: today(),
    dateFormatted: vm.formatDate(today()),
    control: false,
  }),

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },

  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
      this.$emit("blur", this.date);
    },
  },

  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    onBlurDate(event) {
      this.date = parse(event.target.value);
    },
  },
};
</script>