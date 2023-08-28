<template>
  <div>
    <ul>
      <div v-for="sub in input.childrens" v-bind:key="sub.guid">
        <li>
          {{ sub.name }}
          <EditLink
            v-if="!iconsHidden"
            @click="$bvModal.show(`edit-${sub.guid}`)"
          />
          <DeleteLink
            v-if="!iconsHidden"
            @click="$bvModal.show(`delete-${sub.guid}`)"
          />
        </li>
        <DeleteModal
          :componentData="sub"
          :modalTitle="getModalTitle"
          :message="deleteModalMessage"
          @remove="splice(sub)"
        />
        <EditModal :modalTitle="getModalTitle" :componentData="sub" />
      </div>
      <AddLink
        v-if="!iconsHidden"
        :text="getModalTitle"
        @click="$bvModal.show(`add-${guid}`)"
      />
    </ul>
    <AddModal :guid="guid" :componentDataType="7" @save="push($event)" />
  </div>
</template>

<script lang="ts">
import AddModal from "../Modal/AddModal.vue";
import EditModal from "../Modal/EditModal.vue";
import DeleteModal from "../Modal/DeleteModal.vue";
import AddLink from "@/components/AddLink.vue";
import DeleteLink from "@/components/DeleteLink.vue";
import EditLink from "@/components/EditLink.vue";
import { Component } from "@/Config/Base/Component/Component";
import { ComponentType } from "@/Config/Base/Enums";

export default {
  name: "ContentView",
  components: {
    AddModal,
    EditModal,
    DeleteModal,
    AddLink,
    DeleteLink,
    EditLink,
  },
  props: {
    iconsHidden: {
      type: Boolean,
      required: true,
    },
    input: {
      type: Component,
      required: true,
    },
  },
  data(): any {
    return {
      subcontent: "",
      guid: crypto.randomUUID(),
      deleteModalMessage: "la experiencia",
      modalTitle: "Experiencia",
    };
  },
  methods: {
    splice(element: Component): void {
      this.input.childrens.splice(this.input.childrens.indexOf(element), 1);
      this.$emit("reload");
    },
    push(subContent: Component): void {
      this.input.childrens.push(
        new Component(
          crypto.randomUUID(),
          subContent.childrensDataType,
          subContent.name
        )
      );
      this.$emit("reload");
      this.subcontent = "";
    },
  },
  computed: {
    getModalTitle(): any {
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
