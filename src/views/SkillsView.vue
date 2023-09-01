<template>
  <div v-if="!edit">
    <strong class="m-2">{{ name.value }}:</strong>
    <EditLink v-if="!iconsHidden" @click="$emit('edit')" />
    <DeleteLink v-if="!iconsHidden" @click="$emit('delete')" />
  </div>
  <div v-else>
    <!--name-->
    <label>Name:</label>
    <input type="text" placeholder="name" v-model="name.value" /><br />
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
import DeleteLink from "@/components/DeleteLink.vue";
import EditLink from "@/components/EditLink.vue";

export default {
  name: "skillsView",
  components: {
    DeleteLink,
    EditLink,
  },
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
};
</script>
