<template>
  <ul>
    <li v-if="input.place">Centro/Lugar: {{ input.place }}</li>
    <li v-if="input.initDate">Fecha inicio: {{ formatDate(input.initDate) }}</li>
    <li v-if="input.finishDate">Fecha Fin: {{ formatDate(input.finishDate) }}</li>
    <li v-if="input.graduationDate">Graduación: {{ formatDate(input.graduationDate) }}</li>
    <div>
      <component-list-view
        :name="input.guid"
        :iconsHidden="iconsHidden"
        :elements="input.childrens"
        :childrensTitle="input.childrensTitle"
        :childrensDataType="input.childrensDataType"
        @reload="$emit('reload')"
      />
    </div>
  </ul>
</template>

<script lang="ts">
import { Component, ComponentType } from "../../Config/types";
import ComponentListView from "./ComponentListView.vue";

export default {
  name: "ComponentView",
  components: {
    ComponentListView
  },
  props: {
    input: {
      type: Component,
      required: true,
    },
    childrensDataType: {
      type: Number,
      required: true,
    },
    iconsHidden: {
      type: Boolean,
      required: true,
    }
  },
  data(): any {
    return {
      element: "",
      deleteModalMessage: "la experiencia",
      modalTitle: "Experiencia",
      guid: crypto.randomUUID(),
    };
  },
  methods: {
    formatDate(date: string): string {
      return new Date(date).toLocaleDateString();
    },
  },
  created(): void {
    this.$nextTick(() => {
      switch (this.childrensDataType) {
        case ComponentType.Academic:
          this.deleteModalMessage = "la formación";
          this.modalTitle = "Formación";
          this.guid = crypto.randomUUID();
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
  }
};
</script>
