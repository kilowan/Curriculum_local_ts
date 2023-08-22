<template>
    <div v-if="contents != undefined">
      <li v-for="content in contents" v-bind:key="content.guid">
        {{ content.name }}
        <EditLink v-if="!iconsHidden" @click="$bvModal.show(`edit-${content.guid}`)"/>
        <DeleteLink v-if="!iconsHidden" @click="$bvModal.show(`delete-${content.guid}`)"/>
        <content-view
          :guid="content"
          :input="content"
          :iconsHidden="iconsHidden"
          @reload="reload"
        />
        <delete-modal
          :modalTitle="'Contenido'"
          :message="'el contenido'"
          :componentData="content"
          @remove="splice(content)"
        />
        <edit-modal
          :modalTitle="'Contenido'"
          :componentData="content"
        />
      </li>
    </div>
</template>

<script lang="ts">
import ContentView from "./ContentView.vue";
import { Component } from "../../Config/types";
import DeleteModal from "../Modal/DeleteModal.vue";
import EditModal from "../Modal/EditModal.vue";
import DeleteLink from "@/components/DeleteLink.vue";
import EditLink from "@/components/EditLink.vue";

export default {
  name: "ContentsView",
  components: {
    ContentView,
    DeleteModal,
    EditModal,
    DeleteLink,
    EditLink
},
  props: {
    contents: {
      type: Array,
      required: true,
    },
    iconsHidden: {
      type: Boolean,
      required: true,
    },
  },
  data(): any {
    return {
      element: ""
    };
  },
  methods: {
    splice(element: Component): void {
      this.contents.splice(this.contents.indexOf(element), 1);
      this.$emit("reload");
    },
    reload(){
      this.$emit('reload');
    }
  }
};
</script>
