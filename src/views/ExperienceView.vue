<template>
  <ul v-if="!edit">
    <li>
      <strong>{{ input.name }}</strong>
      <EditLink v-if="!iconsHidden" @click="$emit('edit')" />
      <DeleteLink v-if="!iconsHidden" @click="$emit('delete')" />
      <ul>
        <li v-if="input.place">
          {{ input.place.field }}: {{ input.place.value }}
        </li>
        <li v-if="input.initDate">
          {{ input.initDate.field }}: {{ formatDate(input.initDate.value) }}
        </li>
        <li v-if="input.finishDate">
          {{ input.finishDate.field }}:
          {{ formatDate(input.finishDate.value) }}
        </li>
      </ul>
    </li>
  </ul>
  <ul v-else>
    <!--name-->
    <label>Nombre:</label>
    <input type="text" placeholder="name" v-model="input.name" />
    <!--place-->
    <input type="text" placeholder="place" v-model="input.place.field" />
    <input type="text" placeholder="place" v-model="input.place.value" />
    <!--initDate-->
    <input
      type="text"
      placeholder="initDate"
      v-model="input.initDate.field"
    />
    <input
      type="date"
      v-model="input.initDate.value"
      min="2015-01-01"
      max="2030-12-31"
    />
    <!--finishDate-->
    <input
      type="text"
      placeholder="finishDate"
      v-model="input.finishDate.field"
    />
    <input
      type="date"
      v-model="input.finishDate.value"
      min="2015-01-01"
      max="2030-12-31"
    /><br />
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
