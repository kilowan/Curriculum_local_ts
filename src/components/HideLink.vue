<template>
  <ELink :hidden="hidden" :icon="'eye-slash-fill'" @click="$emit('click')" />
</template>

<script lang="ts">
import ELink from "./ELink.vue";

export default {
  name: "HideLink",
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
