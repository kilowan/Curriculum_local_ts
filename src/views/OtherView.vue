<template>
  <li v-if="!edit">
    {{ input.name }}
    <EditLink v-if="!iconsHidden" @click="$emit('edit')" />
    <DeleteLink v-if="!iconsHidden" @click="$emit('delete')" />
  </li>
  <li v-else>
    <!--name-->
    <input type="text" placeholder="name" v-model="input.name.field" />
    <input type="text" placeholder="name" v-model="input.name.value" />
  </li>
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
