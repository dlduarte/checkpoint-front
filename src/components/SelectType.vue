<template>
  <v-select
    v-model="select"
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
  data: () => {
    return {
      select: "PAID",
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