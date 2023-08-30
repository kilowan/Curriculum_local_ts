<template>
  <ul v-if="!edit">
    <li v-if="input.place">{{ input.place.field }}: {{ input.place.value }}</li>
    <li v-if="input.initDate">
      {{ input.initDate.field }}: {{ formatDate(input.initDate.value) }}
    </li>
    <li v-if="input.finishDate">
      {{ input.finishDate.field }}:
      {{ formatDate(input.finishDate.value) }}
    </li>
  </ul>
  <ul v-else>
    <!--place-->
    <input type="text" v-model="input.place.field" />
    <input type="text" v-model="input.place.value" />
    <!--initDate-->
    <input type="text" v-model="componentData.initDate.field" />
    <input
      type="date"
      v-model="componentData.initDate.value"
      min="2015-01-01"
      max="2030-12-31"
    />
    <!--finishDate-->
    <input type="text" v-model="componentData.finishDate.field" />
    <input
      type="date"
      v-model="componentData.finishDate.value"
      min="2015-01-01"
      max="2030-12-31"
    />
  </ul>
</template>

<script lang="ts">
import { Experience } from "@/Config/Experience/Experience";

export default {
  name: "ExperienceView",
  props: {
    input: {
      type: Experience,
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
    formatDate(date: string): string {
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>
