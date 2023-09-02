<template>
  <li v-if="!edit">
    <strong>{{ name.value }}:</strong>
    {{ level.value }}
    <edit-link v-if="!iconsHidden" @click="$emit('edit')" />
    <delete-link v-if="!iconsHidden" @click="$emit('delete')" />
  </li>
  <div v-else>
    <!--name-->
    <label>Name:</label>
    <input type="text" placeholder="name" v-model="name.value" /><br />
    <!--level-->
    <input type="text" placeholder="level" v-model="level.field" />
    <input type="text" placeholder="level" v-model="level.value" />
  </div>
</template>

<script lang="ts">
import { FieldValue } from "@/Config/Base/FieldValue/FieldValue";
import DeleteLink from "@/components/DeleteLink.vue";
import EditLink from "@/components/EditLink.vue";

export default {
  name: "LanguageView",
  props: {
    name: {
      type: FieldValue,
      required: true,
    },
    level: {
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
};
</script>
