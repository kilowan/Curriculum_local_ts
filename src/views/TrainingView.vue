<template>
  <ul v-if="!edit">
    <li>
      <strong>{{ input.name }}</strong>
      <EditLink v-if="!iconsHidden" @click="$emit('edit')" />
      <DeleteLink v-if="!iconsHidden" @click="$emit('delete')" />
      <ul>
        <li>{{ input.place.field }}: {{ input.place.value }}</li>
        <li v-if="input.graduationDate">
          {{ input.graduationDate.field }}:
          {{ formatDate(input.graduationDate.value) }}
        </li>
      </ul>
    </li>
  </ul>
  <ul v-else>
    <!--name-->
    <input type="text" placeholder="name" v-model="input.name.field" />
    <input type="text" placeholder="name" v-model="input.name.value" />
    <!--place-->
    <input type="text" placeholder="place" v-model="input.place.field" />
    <input type="text" placeholder="place" v-model="input.place.value" />
    <!--graduationDate-->
    <input
      type="text"
      placeholder="graduationDate"
      v-model="input.graduationDate.field"
    />
    <input
      type="date"
      v-model="input.graduationDate.value"
      min="2015-01-01"
      max="2030-12-31"
    />
  </ul>
</template>

<script lang="ts">
import { Training } from "@/Config/Training/Training";
import DeleteLink from "../components/DeleteLink.vue";
import EditLink from "../components/EditLink.vue";

export default {
  name: "TrainingView",
  props: {
    input: {
      type: Training,
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
    formatDate(date: string): number {
      return new Date(date).getFullYear();
    },
  },
};
</script>
