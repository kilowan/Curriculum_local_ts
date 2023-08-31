<template>
  <ul v-if="!edit">
    <li>
      <strong>{{ input.name }}</strong>
      <EditLink v-if="!iconsHidden" @click="$emit('edit')" />
      <DeleteLink v-if="!iconsHidden" @click="$emit('delete')" />
    </li>
  </ul>
  <ul v-else>
    <!--name-->
    <b-form-textarea
      placeholder="name"
      v-model="input.name"
      rows="6"
      max-rows="16"
    />
    <br />
    <!--childrensTitle-->
    <label>Título:</label>
    <b-form-textarea
      placeholder="childrensTitle"
      v-model="input.childrensTitle"
      rows="3"
      max-rows="5"
    />
  </ul>
</template>

<script lang="ts">
import { Experience } from "@/Config/Experience/Experience";
import DeleteLink from "../components/DeleteLink.vue";
import EditLink from "../components/EditLink.vue";

export default {
  name: "ProjectView",
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
  methods: {
    formatDate(date: string): string {
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>
