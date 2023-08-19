<template>
  <b-link :hidden="hidden" @click="$emit('click')">
    <b-icon :icon="icon" aria-hidden="true" /> {{ text }}
  </b-link>
</template>

<script lang="ts">
export default {
  name: "ELink",
  data(): any {
    return {};
  },
  props: {
    icon: {
      type: String,
      required: true,
    },
    hidden: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      required: false
    }
  },
};
</script>
