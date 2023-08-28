<template>
  <div v-if="projects.length > 0">
    {{ childrensTitle }}:
    <ul>
      <div v-for="project in projects" v-bind:key="project.guid">
        <li>
          <label @click="hide = !hide, $emit('reload')">{{ project.name }}</label>
          {{ project.name }}
          <EditLink
            v-if="!iconsHidden"
            @click="$bvModal.show(`edit-${project.guid}`)"
          />
          <DeleteLink
            v-if="!iconsHidden"
            @click="$bvModal.show(`delete-${project.guid}`)"
          />
          <project-view
            v-show="!hide"
            :guid="project.guid"
            :project="project"
            :iconsHidden="iconsHidden"
            @reload="$emit('reload')"
          />
        </li>
        <edit-modal :modalTitle="getModalTitle" :componentData="project" />
        <delete-modal
          :modalTitle="getModalTitle"
          :message="deleteModalMessage"
          :componentData="project"
          @remove="splice($event)"
        />
      </div>
    </ul>
  </div>
</template>

<script lang="ts">
import ProjectView from "./ProjectView.vue";
import EditModal from "../Modal/EditModal.vue";
import DeleteModal from "../Modal/DeleteModal.vue";
import DeleteLink from "@/components/DeleteLink.vue";
import EditLink from "@/components/EditLink.vue";
import { Component } from "@/Config/Base/Component/Component";
import { ComponentType } from "@/Config/Base/Enums";

export default {
  name: "ProjectListView",
  components: {
    ProjectView,
    EditModal,
    DeleteModal,
    DeleteLink,
    EditLink,
  },
  props: {
    guid: {
      type: String,
      required: true,
    },
    projects: {
      type: Array,
      required: true,
    },
    childrensTitle: {
      type: String,
      required: true,
    },
    childrensDataType: {
      type: Number,
      required: true,
    },
    iconsHidden: {
      type: Boolean,
      required: true,
    },
  },
  data(): any {
    return {
      deleteModalMessage: "la experiencia",
      modalTitle: "Experiencia",
      hide: false,
    };
  },
  methods: {
    splice(element: Component): void {
      this.projects.splice(this.projects.indexOf(element), 1);
      this.$emit("reload");
    },
  },
  computed: {
    getModalTitle(): any {
      return this.modalTitle;
    },
  },
  created(): void {
    this.$nextTick(() => {
      switch (this.childrensDataType) {
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
