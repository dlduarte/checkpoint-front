<template>
  <v-footer color="primary" app padless>
    <v-row justify="center" no-gutters>
      <v-col class="py-4 text-center white--text" cols="12">
        Checkpoint App - {{ version }} - {{ publicationDate }}
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
import { publicationDate, version } from "../../package.json";
export default {
  data() {
    return {
      publicationDate,
      version,
    };
  },
};
</script>