<template>
  <ELink
    v-if="text != undefined"
    :hidden="hidden"
    :icon="'plus-circle-fill'"
    :text="`Añadir ${text}`"
    @click="$emit('click')"
  />
  <ELink
    v-else
    :hidden="hidden"
    :icon="'plus-circle-fill'"
    :text="'Añadir'"
    @click="$emit('click')"
  />
</template>

<script lang="ts">
import ELink from "./ELink.vue";

export default {
  name: "AddLink",
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
    text: {
      type: String,
      required: false,
    },
  },
};
</script>
