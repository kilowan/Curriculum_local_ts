<template>
  <li v-if="!edit">
    {{ input.name }}
    <EditLink v-if="!iconsHidden" @click="$emit('edit')" />
    <DeleteLink v-if="!iconsHidden" @click="$emit('delete')" />
  </li>
  <!--name-->
  <b-form-textarea
    v-else
    placeholder="name"
    v-model="input.name"
    rows="3"
    max-rows="5"
  />
</template>

<script lang="ts">
import DeleteLink from "@/components/DeleteLink.vue";
import EditLink from "@/components/EditLink.vue";
import { Component } from "@/Config/Base/Component/Component";

export default {
  name: "OtherView",
  components: {
    DeleteLink,
    EditLink,
  },
  props: {
    input: {
      type: Component,
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
