<template>
  <ul v-if="childrensTitle">
    <li v-if="elements.length > 0">
      <strong v-if="elements && elements.length > 0" class="m-2"
        >{{ childrensTitle.value }}:</strong
      >
      <ul>
        <li v-for="element in elements" v-bind:key="element.guid">
          <label @click="(hide = !hide), $emit('reload')">{{
            element.name.value
          }}</label>
          <edit-link
            v-show="!iconsHidden"
            @click="$bvModal.show(`edit-${element.guid}`)"
          />
          <delete-link
            v-if="!iconsHidden"
            @click="$bvModal.show(`delete-${element.guid}`)"
          />
          <list-view
            v-show="!hide"
            :guid="element.guid"
            :key="element.guid"
            :elements="element.childrens"
            :childrensTitle="element.childrensTitle"
            :childrensDataType="element.childrensDataType"
            :parentComponent="element"
            :iconsHidden="iconsHidden"
            @reload="$emit('reload')"
          />
          <edit-new-modal
            :modalTitle="getModalTitle"
            :componentData="element"
            :childrensDataType="element.childrensDataType"
          />
          <delete-modal
            :modalTitle="getModalTitle"
            :message="deleteModalMessage"
            :componentData="element"
            @remove="splice(element)"
          />
        </li>
      </ul>
    </li>
    <add-new-link
      v-show="!iconsHidden"
      v-if="childrensDataType != 11 && childrensDataType != undefined"
      :type="childrensDataType"
      @click="$bvModal.show(`add-${guid}`)"
    />
    <add-new-modal
      :guid="guid"
      :modalTitle="getModalTitle"
      :childrensDataType="childrensDataType"
      :parentComponent="parentComponent"
      @save="$emit('reload')"
    />
  </ul>
  <ul v-else>
    <li v-for="element in elements" v-bind:key="element.guid">
      <label @click="(hide = !hide), $emit('reload')">{{
        element.name.value
      }}</label>
      <edit-link
        v-if="!iconsHidden"
        @click="$bvModal.show(`edit-${element.guid}`)"
      />
      <delete-link
        v-if="!iconsHidden"
        @click="$bvModal.show(`delete-${element.guid}`)"
      />
      <list-view
        v-show="!hide"
        :guid="element.guid"
        :key="element.guid"
        :elements="element.childrens"
        :childrensTitle="element.childrensTitle"
        :childrensDataType="element.childrensDataType"
        :parentComponent="element"
        :iconsHidden="iconsHidden"
        @reload="$emit('reload')"
      />
      <edit-new-modal
        :modalTitle="getModalTitle"
        :componentData="element"
        :childrensDataType="element.childrensDataType"
      />
      <delete-modal
        :modalTitle="getModalTitle"
        :message="deleteModalMessage"
        :componentData="element"
        @remove="splice(element)"
      />
    </li>
    <add-new-link
      v-show="!iconsHidden"
      v-if="childrensDataType != 11 && childrensDataType != undefined"
      :type="childrensDataType"
      @click="$bvModal.show(`add-${guid}`)"
    />
    <add-new-modal
      :guid="guid"
      :modalTitle="getModalTitle"
      :childrensDataType="childrensDataType"
      :parentComponent="parentComponent"
      @save="$emit('reload')"
    />
  </ul>
</template>

<script lang="ts">
import DeleteModal from "./Modal/DeleteModal.vue";
import DeleteLink from "@/components/DeleteLink.vue";
import EditLink from "@/components/EditLink.vue";
import EditNewModal from "./Modal/EditNewModal.vue";
import AddNewModal from "./Modal/AddNewModal.vue";
import AddNewLink from "@/components/AddNewLink.vue";
import { Component } from "@/Config/Base/Component/Component";
import { ComponentType } from "@/Config/Base/Enums";
import { FieldValue } from "@/Config/Base/FieldValue/FieldValue";

export default {
  name: "ListView",
  components: {
    DeleteModal,
    DeleteLink,
    EditLink,
    EditNewModal,
    AddNewLink,
    AddNewModal,
  },
  props: {
    guid: {
      type: String,
      required: true,
    },
    elements: {
      type: Array,
      required: true,
    },
    parentComponent: {
      type: Component,
      required: true,
    },
    childrensTitle: {
      type: FieldValue,
      required: false,
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
      this.elements.splice(this.elements.indexOf(element), 1);
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
