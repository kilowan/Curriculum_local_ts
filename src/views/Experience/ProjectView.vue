<template>
  <div v-if="project != undefined">
    <ul>
      <div
        v-for="description in project.childrens"
        v-bind:key="description.guid"
      >
        <li>
          {{ description.name }}
          <EditLink
            v-if="!iconsHidden"
            @click="$bvModal.show(`edit-${description.guid}`)"
          />
          <DeleteLink
            v-if="!iconsHidden"
            @click="$bvModal.show(`delete-${description.guid}`)"
          />
        </li>
        <EditModal
          :modalTitle="getModalTitle"
          :componentData="description"
          :componentDataType="10"
          @cancel="cancel"
        />
        <DeleteModal
          :modalTitle="getModalTitle"
          :message="deleteModalMessage"
          :componentData="description"
          @remove="splice(description)"
        />
      </div>
    </ul>
    <div v-if="add">
      <input type="text" v-model="desc" />
      <b-button @click="save(desc)">Guardar</b-button>
      <b-button @click="cancel">Cancelar</b-button>
    </div>
    <AddLink
      v-if="!add && !iconsHidden"
      :text="getModalTitle"
      @click="add = true"
    />
  </div>
</template>

<script lang="ts">
import EditModal from "../Modal/EditModal.vue";
import DeleteModal from "../Modal/DeleteModal.vue";
import AddLink from "@/components/AddLink.vue";
import DeleteLink from "@/components/DeleteLink.vue";
import EditLink from "@/components/EditLink.vue";
import { Component } from "@/Config/Base/Component/Component";
import { ComponentType } from "@/Config/Base/Enums";

export default {
  name: "ProjectView",
  components: {
    EditModal,
    DeleteModal,
    AddLink,
    DeleteLink,
    EditLink,
  },
  props: {
    project: {
      type: Component,
      required: true,
    },
    iconsHidden: {
      type: Boolean,
      required: true,
    },
    guid: {
      type: String,
      required: true,
    },
  },
  data(): any {
    return {
      add: false,
      desc: "",
      deleteModalMessage: "la experiencia",
      modalTitle: "Experiencia",
    };
  },
  methods: {
    cancel(): void {
      this.add = false;
      this.desc = "";
    },
    save(description: string): void {
      this.$nextTick(() => {
        let element = new Component(
          crypto.randomUUID(),
          this.getChildrensType(),
          description
        );
        this.project.childrens.push(element);
        this.cancel();
        this.$emit("reload");
      });
    },
    splice(element: Component): void {
      this.project.childrens.splice(this.project.childrens.indexOf(element), 1);
      this.$emit("reload");
    },
    getChildrensType(): ComponentType {
      switch (this.project.childrensDataType) {
        case ComponentType.Experience:
          return ComponentType.Contract;

        case ComponentType.Contract:
          return ComponentType.Project;

        case ComponentType.Project:
          return ComponentType.Description;

        case ComponentType.Academic:
        case ComponentType.Skills:
          return ComponentType.Content;

        case ComponentType.Content:
        case ComponentType.Other:
          return ComponentType.SubContent;

        default:
          return ComponentType.Value;
      }
    },
  },
  computed: {
    getModalTitle(): any {
      return this.modalTitle;
    },
  },
  created(): void {
    this.$nextTick(() => {
      switch (this.project.childrensDataType) {
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
