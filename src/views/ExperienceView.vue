<template>
  <li v-if="!edit">
    <strong>{{ name.value }}</strong>
    <edit-link v-if="!iconsHidden" @click="$emit('edit')" />
    <delete-link v-if="!iconsHidden" @click="$emit('delete')" />
    <ul>
      <li v-if="place">{{ place.field }}: {{ place.value }}</li>
      <li v-if="initDate">
        {{ initDate.field }}: {{ formatDate(initDate.value) }}
      </li>
      <li v-if="finishDate">
        {{ finishDate.field }}:
        {{ finishDate.value ? formatDate(finishDate.value) : "Actualidad" }}
      </li>
    </ul>
  </li>
  <div v-else>
    <!--name-->
    <label>Nombre:</label>
    <input type="text" placeholder="name" v-model="name.value" /><br />
    <!--place-->
    <input type="text" placeholder="place" v-model="place.field" />
    <input type="text" placeholder="place" v-model="place.value" /><br />
    <!--initDate-->
    <input type="text" placeholder="initDate" v-model="initDate.field" />
    <input
      type="date"
      v-model="initDate.value"
      min="2015-01-01"
      max="2030-12-31"
    /><br />
    <!--finishDate-->
    <input type="text" placeholder="finishDate" v-model="finishDate.field" />
    <input
      type="date"
      v-model="finishDate.value"
      min="2015-01-01"
      max="2030-12-31"
    /><br />
    <!--childrensTitle-->
    <label>Título:</label>
    <b-form-textarea
      placeholder="childrensTitle"
      v-model="childrensTitle.value"
      rows="3"
      max-rows="5"
    />
  </div>
</template>

<script lang="ts">
import { FieldValue } from "@/Config/Base/FieldValue/FieldValue";
import DeleteLink from "../components/DeleteLink.vue";
import EditLink from "../components/EditLink.vue";

export default {
  name: "ExperienceView",
  props: {
    name: {
      type: FieldValue,
      required: true,
    },
    place: {
      type: FieldValue,
      required: true,
    },
    initDate: {
      type: FieldValue,
      required: true,
    },
    finishDate: {
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
