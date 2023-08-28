<template>
  <div>
    <ul>
      <div v-for="value in input.childrens" v-bind:key="value.guid">
        <li v-if="!hide">
          {{ value.name }}
          <EditLink
            v-if="!iconsHidden"
            @click="$bvModal.show(`edit-${value.guid}`)"
          />
          <DeleteLink
            v-if="!iconsHidden"
            @click="$bvModal.show(`delete-${value.guid}`)"
          />
        </li>
        <EditModal
          :modalTitle="getModalTitle"
          :componentData="value"
          :componentDataType="11"
        />
        <DeleteModal
          :modalTitle="getModalTitle"
          :componentData="value"
          :message="deleteModalMessage"
          @remove="splice(value)"
        />
      </div>
      <div v-if="!iconsHidden">
        <AddLink :text="getModalTitle" @click="$bvModal.show(`add-${guid}`)" />
      </div>
    </ul>
    <AddModal :guid="guid" :componentDataType="11" @save="save($event)" />
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
  name: "OtherView",
  components: {
    AddModal,
    EditModal,
    DeleteModal,
    AddLink,
    DeleteLink,
    EditLink,
  },
  props: {
    input: {
      type: Component,
      required: true,
    },
    iconsHidden: {
      type: Boolean,
      required: true,
    },
  },
  data(): any {
    return {
      guid: crypto.randomUUID(),
      hide: false,
      add: false,
      valueNew: "",
      deleteModalMessage: "la experiencia",
      modalTitle: "Experiencia",
    };
  },
  methods: {
    cancel(): void {
      this.valueNew = "";
      this.add = false;
    },
    save(value: Component): void {
      this.$nextTick(() => {
        let component = new Component(
          value.guid,
          value.childrensDataType,
          value.name
        );
        this.input.childrens.push(component);
        this.values.push(component);
        this.cancel();
        this.$emit("reload");
      });
    },
    splice(element: Component): void {
      this.input.childrens.splice(this.input.childrens.indexOf(element), 1);
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
