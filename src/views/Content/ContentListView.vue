<template>
  <ul>
    <div v-for="content in contentsData" v-bind:key="content.guid">
      <li>
        {{ content.name }}
        <b-link
          v-if="!iconsHidden"
          @click="$bvModal.show(`edit-${content.guid}`)"
        >
          <b-icon icon="pencil-square" aria-hidden="true" />
        </b-link>
        <b-link
          v-if="!iconsHidden"
          @click="$bvModal.show(`delete-${content.guid}`)"
        >
          <b-icon icon="x-circle-fill" aria-hidden="true" />
        </b-link>
        <content-view
          :guid="content.guid"
          :content="content"
          :iconsHidden="iconsHidden"
          @update="refresh($event, content)"
        />
      </li>
      <delete-modal
        :modal-title="'Contenido'"
        :message="'el contenido'"
        :component-data="content"
        @remove="splice(content.guid)"
      />
      <edit-modal
        :modal-title="'Contenido'"
        :component-data="content"
        :component-data-type="'Content'"
        @update="update($event)"
      />
    </div>
  </ul>
</template>

<script lang="ts">
import ContentView from "./ContentView.vue";
import { Component } from "../../Config/types";
import DeleteModal from "../Modal/DeleteModal.vue";
import EditModal from "../Modal/EditModal.vue";

export default {
  name: "ContentsView",
  components: {
    ContentView,
    DeleteModal,
    EditModal,
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
      element: "",
      contentsData: new Array<Component>(),
    };
  },
  methods: {
    refresh(subContents: Array<Component>, content: any): void {
      this.$nextTick(() => {
        let cont = this.contentsData.find(
          (data: any) => data.guid === content.guid
        );
        if (cont !== undefined) {
          cont.childrens = subContents;
          this.contentsData.push(cont);
        } else {
          this.contentsData.push(content);
        }
        this.$emit("update", this.contentsData);
      });
    },
    update(contents: any): void {
      this.$nextTick(() => {
        this.$emit("update", contents);
      });
    },
    splice(guid: string): void {
      this.contentsData = this.contentsData.filter(
        (data: any) => data.guid !== guid
      );
      this.$emit("update", this.contentsData);
    },
  },
  mounted(): void {
    this.contentsData = this.contents;
  },
};
</script>
