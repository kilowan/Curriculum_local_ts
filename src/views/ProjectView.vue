<template>
  <ul v-if="!edit">
    <li>
      <strong>{{ name.value }}</strong>
      <edit-link v-if="!iconsHidden" @click="$emit('edit')" />
      <delete-link v-if="!iconsHidden" @click="$emit('delete')" />
    </li>
  </ul>
  <ul v-else>
    <!--name-->
    <b-form-textarea
      placeholder="name"
      v-model="name.value"
      rows="6"
      max-rows="16"
    />
    <br />
    <!--childrensTitle-->
    <label>Título:</label>
    <b-form-textarea
      placeholder="childrensTitle"
      v-model="childrensTitle.value"
      rows="3"
      max-rows="5"
    />
  </ul>
</template>

<script lang="ts">
import { FieldValue } from "@/Config/Base/FieldValue/FieldValue";
import DeleteLink from "../components/DeleteLink.vue";
import EditLink from "../components/EditLink.vue";

export default {
  name: "ProjectView",
  props: {
    name: {
      type: FieldValue,
      required: true,
    },
    childrensTitle: {
      type: FieldValue,
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
  methods: {
    formatDate(date: string): string {
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>
