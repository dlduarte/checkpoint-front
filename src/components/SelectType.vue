<template>
  <v-select
    v-model="control"
    :items="items"
    item-text="label"
    item-value="value"
    label="Tipo"
    @change="onSelectType"
  ></v-select>
</template>

<script>
export default {
  name: "SelectType",
  props: { value: String },
  computed: {
    control: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  data: (vm) => {
    return {
      items: [
        { label: "Remunerado", value: "PAID" },
        { label: "Não Remunerado", value: "UNPAID" },
        { label: "Falta Justificada", value: "JUSTIFIED_ABSENCE" },
        { label: "Falta Não Justificada", value: "UNEXCUSED_ABSENCE" },
      ],
    };
  },
  methods: {
    onSelectType(event) {
      this.$emit("change", event);
    },
  },
};
</script>