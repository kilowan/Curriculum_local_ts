<template>
  <ELink :hidden="hidden" :icon="'pencil-square'" @click="$emit('click')"/>
</template>

<script lang="ts">

import ELink from './ELink.vue';

export default {
  name: "EditLink",
  data(): any {
    return {};
  },
  components: {
    ELink
  },
  props: {
    hidden: {
      type: Boolean,
      default: false
    }
  }
};
</script>
