<template>
  <ul>
    <li
      v-if="
        componentDataType === 'Academic' ||
        componentDataType === 'Experience'
      "
    >
      Centro/Lugar: {{ data.place }}
    </li>
    <li v-if="componentDataType === 'Experience'">
      Fecha inicio: {{ formatDate(data.initDate) }}
    </li>
    <li v-if="data.finishDate">
      Fecha Fin: {{ formatDate(data.finishDate) }}
    </li>
    <div>
      <component-list-view
        :ref="data.guid"
        :iconsHidden="iconsHidden"
        :elements="data.childrens"
        :childrensTitle="data.childrensTitle"
        :componentDataType="data.componentDataType"
        @update="refresh($event)"
      />
    </div>
  </ul>
</template>

<script lang="ts">
import { Component } from "../../Config/types";

export default {
  name: "ComponentView",
  components: {
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    componentDataType: {
      type: String,
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
    refresh(childrens: Array<Component>): void {
      this.$nextTick(() => {
        this.componentData.childrens = childrens
        this.$emit("update", this.componentData);
      });
    },
    formatDate(date: string): string {
      return new Date(date).toLocaleDateString();
    },
  },
  created(): void {
    this.$nextTick(() => {
      switch (this.componentDataType) {
        case "Academic":
          this.deleteModalMessage = "la formación";
          this.modalTitle = "Formación";
          this.guid = crypto.randomUUID();
          break;

        case "Experience":
          this.deleteModalMessage = "la experiencia";
          this.modalTitle = "Experiencia";
          break;

        case "Languages":
          this.deleteModalMessage = "el idioma";
          this.modalTitle = "Idioma";
          break;

        case "Other":
          this.deleteModalMessage = "el elemento";
          this.modalTitle = "Elemento";
          break;

        case "Skills":
          this.deleteModalMessage = "la skill";
          this.modalTitle = "Skill";
          break;

        case "Description":
          this.deleteModalMessage = "la descripción";
          this.modalTitle = "Descripcion";
          break;

        case "Content":
          this.deleteModalMessage = "el contenido";
          this.modalTitle = "Contenido";
          break;

        case "Contract":
          this.deleteModalMessage = "el contrato";
          this.modalTitle = "Contrato";
          break;

        case "SubContent":
          this.deleteModalMessage = "el subcontenido";
          this.modalTitle = "SubContenido";
          break;

        case "Project":
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
