<template>
  <ELink :hidden="hidden" :icon="'x-circle-fill'" @click="$emit('click')" />
</template>

<script lang="ts">
import ELink from "./ELink.vue";

export default {
  name: "DeleteLink",
  data(): any {
    return {};
  },
  components: {
    ELink,
  },
  props: {
    hidden: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
