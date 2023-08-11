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
          (data: any) => data.guid !== content.guid
        );
        var cont: Component = this.contentsData.find(
          (data: any) => data.guid === content.guid
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
    splice(index: string) {
      this.contentsData = this.contentsData.filter(
        (data: any) => data.guid !== index
      );
      this.$emit("update", this.contentsData);
    },
  },
  mounted() {
    this.contentsData = this.contents;
  },
};
</script>
