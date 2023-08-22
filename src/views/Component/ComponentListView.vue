<template>
  <div>
    <div v-if="elements !=undefined && elements.length > 0">
      <ul>
        <div v-for="data in elements" v-bind:key="data.guid">
          <li>
            {{ data.name }}
            <EditLink v-if="!iconsHidden" @click="$bvModal.show(`edit-${data.guid}`)"/>
            <DeleteLink v-if="!iconsHidden" @click="$bvModal.show(`delete-${data.guid}`)"/>
          </li>
          <component-view
            :iconsHidden="iconsHidden"
            :input="data"
            :childrensDataType="data.childrensDataType"
            @reload="$emit('reload')"
          />
          <delete-modal
            :modal-title="getModalTitle"
            :message="deleteModalMessage"
            :component-data="data"
            @remove="splice(data)"
          />
          <edit-modal
            :modalTitle="getModalTitle"
            :componentData="data"
            :componentDataType="data.childrensDataType"
          />
        </div>
        <AddModal
          :guid="guid"
          :modalTitle="getModalTitle"
          :componentDataType="componentDataType"
          @save="save($event)"
        />
      </ul>
    </div>
    <AddLink v-if="!iconsHidden" :text="childrensTitle" @click="$bvModal.show(`add-${guid}`)"/>
  </div>
</template>

<script lang="ts">
import { Component, ComponentType } from "../../Config/types";
import EditModal from "../Modal/EditModal.vue";
import AddModal from "../Modal/AddModal.vue";
import DeleteModal from "../Modal/DeleteModal.vue";
import AddLink from "@/components/AddLink.vue";
import DeleteLink from "@/components/DeleteLink.vue";
import EditLink from "@/components/EditLink.vue";
import ComponentView from "./ComponentView.vue";

export default {
  name: "ComponentListView",
  components: {
    EditModal,
    DeleteModal,
    AddLink,
    DeleteLink,
    EditLink,
    ComponentView,
    AddModal
},
  props: {
    elements: {
      type: Array,
      required: true,
    },
    childrensDataType: {
      type: Number,
      required: true,
    },
    childrensTitle: {
      type: String,
      required: false,
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
      guid: crypto.randomUUID(),
    };
  },
  methods: {
    splice(element: Component): void {
      this.elements.splice(this.elements.indexOf(element), 1);
      this.$emit("reload");
    },
    save(data: Component): void {
      this.elements.push(data);
    },
    formatDate(date: string): string {
      return new Date(date).toLocaleDateString();
    }
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
