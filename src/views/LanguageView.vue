<template>
  <ul v-if="!edit">
    <strong>{{ input.name }}:</strong>
    {{
      input.level.value
    }}
    <EditLink v-if="!iconsHidden" @click="$emit('edit')" />
    <DeleteLink v-if="!iconsHidden" @click="$emit('delete')" />
  </ul>
  <ul v-else>
    <!--name-->
    <input type="text" placeholder="name" v-model="input.name.field" />
    <input type="text" placeholder="name" v-model="input.name.value" />
    <!--level-->
    <input type="text" placeholder="level" v-model="input.level.field" />
    <input type="text" placeholder="level" v-model="input.level.value" />
  </ul>
</template>

<script lang="ts">
import { Experience } from "@/Config/Experience/Experience";
import DeleteLink from "@/components/DeleteLink.vue";
import EditLink from "@/components/EditLink.vue";

export default {
  name: "LanguageView",
  props: {
    input: {
      type: Experience,
      required: true,
    },
    edit: {
      type: Boolean,
      default: false,
    },
    iconsHidden: {
      type: Boolean,
      default: false,
    },
  },
  data(): any {
    return {};
  },
  components: {
    DeleteLink,
    EditLink,
  },
};
</script>
