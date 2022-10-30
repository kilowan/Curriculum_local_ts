<template>
  <ul>
    <div v-for="content in contentsData" v-bind:key="content.id">
      <li>
        {{ content.name }}
        <b-link
          v-if="!iconsHidden"
          @click="$bvModal.show(`edit-content-${content.id}`)"
        >
          <b-icon icon="pencil-square" aria-hidden="true" />
        </b-link>
        <b-link
          v-if="!iconsHidden"
          @click="$bvModal.show(`delete-content-${content.id}`)"
        >
          <b-icon icon="x-circle-fill" aria-hidden="true" />
        </b-link>
        <content-view
          :content="content"
          :iconsHidden="iconsHidden"
          :contentIndex="content.id"
          @update="refresh($event, content)"
        />
      </li>
      <delete-modal 
        :modal-id="'content'"
        :modal-title="'Contenido'"
        :message="'el contenido'"
        :component-data="content"
        @remove="splice(content.id)"
      />
      <edit-modal
        :modal-id="'content'"
        :modal-title="'Contenido'"
        :component-data="content"
        :component-datatype="'Content'"
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
    EditModal
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
  data() {
    return {
      element: "",
      contentsData: new Array<Component>(),
    };
  },
  methods: {
    refresh(subContents: Array<Component>, content: any) {
      this.$nextTick(() => {
        var filtered = this.contentsData.filter(
          (data: any) => data.id !== content.id
        );
        var cont: Component = this.contentsData.find(
          (data: any) => data.id === content.id
        );
        cont.childrens = subContents;
        filtered.push(cont);
        this.contentsData = filtered;
        this.$emit("update", this.contentsData);
      });
    },
    update(contents: any) {
      this.$nextTick(() => {
        this.$emit('update', contents);
      });
    },
    splice(index: number) {
      this.contentsData = this.contentsData.filter(
        (data: any) => data.id !== index
      );
      this.$emit("update", this.contentsData);
    },
  },
  mounted() {
    this.contentsData = this.contents;
  },
};
</script>
