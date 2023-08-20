<template>
    <div v-if="contents != undefined">
      <li v-for="content in contents" v-bind:key="content.guid">
        {{ content.name }}
        <EditLink v-if="!iconsHidden" @click="$bvModal.show(`edit-${content.guid}`)"/>
        <DeleteLink v-if="!iconsHidden" @click="$bvModal.show(`delete-${content.guid}`)"/>
        <content-view
          v-if="content != undefined"
          :guid="content.guid"
          :input="content"
          :iconsHidden="iconsHidden"
          @update="refresh($event, content)"
        />
        <delete-modal
        v-if="content != undefined"
        :modalTitle="'Contenido'"
        :message="'el contenido'"
        :componentData="content"
        @remove="splice(content.guid)"
      />
      <edit-modal
        v-if="content != undefined"
        :modal-title="'Contenido'"
        :componentData="content"
        :componentDataType="6"
        @update="update($event)"
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
    refresh(subContents: Array<Component>, content: any): void {
      this.$nextTick(() => {
        let cont = this.contents.find(
          (data: any) => data.guid === content.guid
        );
        if (cont !== undefined) {
          cont.childrens = subContents;
          this.contents.push(cont);
        } else {
          this.contents.push(content);
        }
        this.$emit("update", this.contents);
      });
    },
    update(contents: any): void {
      this.$nextTick(() => {
        this.$emit("update", contents);
      });
    },
    splice(guid: string): void {
      this.contents = this.contents.filter(
        (data: any) => data.guid !== guid
      );
      this.$emit("update", this.contents);
    },
  }
};
</script>
