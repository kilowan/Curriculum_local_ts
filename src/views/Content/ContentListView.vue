<template>
  <div v-if="input != undefined">
    <li v-for="content in input" v-bind:key="content.guid">
      <label @click="hide = !hide, $emit('reload')">{{ content.name }}</label>
      <EditLink v-if="!iconsHidden" @click="editing(content)" />
      <DeleteLink v-if="!iconsHidden" @click="deleting(content)" />
      <content-view
        v-show="!hide"
        :guid="content"
        :input="content"
        :iconsHidden="iconsHidden"
        @reload="reload"
      />
      <delete-modal
        :modalTitle="getModalTitle"
        :message="deleteModalMessage"
        :componentData="content"
        @remove="splice(content)"
      />
      <edit-modal :modalTitle="getModalTitle" :componentData="content" />
    </li>
  </div>
</template>

<script lang="ts">
import ContentView from "./ContentView.vue";
import DeleteModal from "../Modal/DeleteModal.vue";
import EditModal from "../Modal/EditModal.vue";
import DeleteLink from "@/components/DeleteLink.vue";
import EditLink from "@/components/EditLink.vue";
import { Component } from "@/Config/Base/Component/Component";
import { ComponentType } from "@/Config/Base/Enums";

export default {
  name: "ContentsView",
  components: {
    ContentView,
    DeleteModal,
    EditModal,
    DeleteLink,
    EditLink,
  },
  props: {
    input: {
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
      deleteModalMessage: "la experiencia",
      modalTitle: "Experiencia",
      hide: false,
    };
  },
  methods: {
    splice(element: Component): void {
      this.input.splice(this.input.indexOf(element), 1);
      this.$emit("reload");
    },
    reload(): void {
      this.$emit("reload");
    },
  },
  computed: {
    getModalTitle(): string {
      return this.modalTitle;
    },
  },
  created(): void {
    this.$nextTick(() => {
      switch (this.input.childrensDataType) {
        case ComponentType.Academic:
          this.deleteModalMessage = "la formación";
          this.modalTitle = "Formación";
          break;

        case ComponentType.Experience:
          this.deleteModalMessage = "la experiencia";
          this.modalTitle = "Experiencia";
          break;

        case ComponentType.Languages:
          this.deleteModalMessage = "el idioma";
          this.modalTitle = "Idioma";
          break;

        case ComponentType.Other:
          this.deleteModalMessage = "el elemento";
          this.modalTitle = "Elemento";
          break;

        case ComponentType.Skills:
          this.deleteModalMessage = "la skill";
          this.modalTitle = "Skill";
          break;

        case ComponentType.Description:
          this.deleteModalMessage = "la descripción";
          this.modalTitle = "Descripcion";
          break;

        case ComponentType.Content:
          this.deleteModalMessage = "el contenido";
          this.modalTitle = "Contenido";
          break;

        case ComponentType.Contract:
          this.deleteModalMessage = "el contrato";
          this.modalTitle = "Contrato";
          break;

        case ComponentType.SubContent:
          this.deleteModalMessage = "el subcontenido";
          this.modalTitle = "SubContenido";
          break;

        case ComponentType.Project:
          this.deleteModalMessage = "el proyecto";
          this.modalTitle = "Proyecto";
          break;

        default:
          break;
      }
    });
  },
};
</script>
