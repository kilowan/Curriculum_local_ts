<template>
  <li v-if="!edit">
    <strong>{{ name.value }}</strong>
    <EditLink v-if="!iconsHidden" @click="$emit('edit')" />
    <DeleteLink v-if="!iconsHidden" @click="$emit('delete')" />
    <ul>
      <li>{{ place.field }}: {{ place.value }}</li>
      <li v-if="graduationDate">
        {{ graduationDate.field }}:
        {{ formatDate(graduationDate.value) }}
      </li>
    </ul>
  </li>
  <div v-else>
    <!--name-->
    <label>Name:</label>
    <input type="text" placeholder="name" v-model="name.value" /><br />
    <!--place-->
    <input type="text" placeholder="place" v-model="place.field" />
    <input type="text" placeholder="place" v-model="place.value" /><br />
    <!--graduationDate-->
    <input
      type="text"
      placeholder="graduationDate"
      v-model="graduationDate.field"
    />
    <input
      type="date"
      v-model="graduationDate.value"
      min="2015-01-01"
      max="2030-12-31"
    />
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
import DeleteLink from "../components/DeleteLink.vue";
import EditLink from "../components/EditLink.vue";
import { FieldValue } from "@/Config/Base/FieldValue/FieldValue";

export default {
  name: "TrainingView",
  props: {
    name: {
      type: FieldValue,
      required: true,
    },
    place: {
      type: FieldValue,
      required: true,
    },
    graduationDate: {
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
    formatDate(date: string): number {
      return new Date(date).getFullYear();
    },
  },
};
</script>
