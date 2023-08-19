<template>
  <ELink :hidden="hidden" :icon="'hdd'" @click="$emit('click')"/>
</template>

<script lang="ts">

import ELink from './ELink.vue';

export default {
  name: "SaveLink",
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
  },
};
</script>
