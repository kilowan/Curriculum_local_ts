<template>
  <ul v-if="!edit">
    <li>{{ input.place.field }}: {{ input.place.value }}</li>
    <li v-if="input.graduationDate">
      {{ input.graduationDate.field }}:
      {{ formatDate(input.graduationDate.value) }}
    </li>
  </ul>
  <ul v-else>
    <!--place-->
    <input type="text" v-model="input.place.field" />
    <input type="text" v-model="input.place.value" />
    <!--graduationDate-->
    <input type="text" v-model="input.graduationDate.field" />
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
  },
  data(): any {
    return {};
  },
  methods: {
    formatDate(date: string): number {
      return new Date(date).getFullYear();
    },
  },
};
</script>
