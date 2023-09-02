<template>
  <li v-if="!edit">
    {{ name.value }}
    <edit-link v-if="!iconsHidden" @click="$emit('edit')" />
    <delete-link v-if="!iconsHidden" @click="$emit('delete')" />
  </li>
  <!--name-->
  <b-form-textarea
    v-else
    placeholder="name"
    v-model="name.value"
    rows="3"
    max-rows="5"
  />
</template>

<script lang="ts">
import { FieldValue } from "@/Config/Base/FieldValue/FieldValue";
import DeleteLink from "@/components/DeleteLink.vue";
import EditLink from "@/components/EditLink.vue";

export default {
  name: "OtherView",
  components: {
    DeleteLink,
    EditLink,
  },
  props: {
    name: {
      type: FieldValue,
      required: true,
    },
    edit: {
      type: Boolean,
      default: false,
    },
    iconsHidden: {
      type: Boolean,
      required: true,
    },
  },
  data(): any {
    return {};
  },
};
</script>
