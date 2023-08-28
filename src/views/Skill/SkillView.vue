<template>
  <ul>
    <contents-view
      :input="input.childrens"
      :iconsHidden="iconsHidden"
      @reload="$emit('reload')"
    />
    <input v-if="add" class="m-2" type="text" v-model="element" />
    <b-button v-if="add" class="m-2" @click="save(element)">Guardar</b-button>
    <b-button v-if="add" class="m-2" @click="cancel">Cancelar</b-button>
    <AddLink
      v-if="!iconsHidden && !add"
      :text="getModalTitle"
      @click="add = true"
    />
  </ul>
</template>

<script lang="ts">
import { Component } from "@/Config/Base/Component/Component";
import ContentsView from "../Content/ContentListView.vue";
import AddLink from "@/components/AddLink.vue";
import { ComponentType } from "@/Config/Base/Enums";

export default {
  name: "ComplementaryExperienceView",
  components: {
    ContentsView,
    AddLink,
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
      add: false,
      element: "",
      //deleteModalMessage: "la experiencia",
      modalTitle: "Experiencia",
    };
  },
  methods: {
    cancel(): void {
      this.element = "";
      this.add = false;
    },
    save(content: string): void {
      this.$nextTick(() => {
        this.input.childrens.push(
          new Component(crypto.randomUUID(), ComponentType.SubContent, content)
        );
        this.cancel();
        this.$emit("reload");
      });
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
          //this.deleteModalMessage = "la formación";
          this.modalTitle = "Formación";
          break;

        case ComponentType.Experience:
          //this.deleteModalMessage = "la experiencia";
          this.modalTitle = "Experiencia";
          break;

        case ComponentType.Languages:
          //this.deleteModalMessage = "el idioma";
          this.modalTitle = "Idioma";
          break;

        case ComponentType.Other:
          //this.deleteModalMessage = "el elemento";
          this.modalTitle = "Elemento";
          break;

        case ComponentType.Skills:
          //this.deleteModalMessage = "la skill";
          this.modalTitle = "Skill";
          break;

        case ComponentType.Description:
          //this.deleteModalMessage = "la descripción";
          this.modalTitle = "Descripcion";
          break;

        case ComponentType.Content:
          //this.deleteModalMessage = "el contenido";
          this.modalTitle = "Contenido";
          break;

        case ComponentType.Contract:
          //this.deleteModalMessage = "el contrato";
          this.modalTitle = "Contrato";
          break;

        case ComponentType.SubContent:
          //this.deleteModalMessage = "el subcontenido";
          this.modalTitle = "SubContenido";
          break;

        case ComponentType.Project:
          //this.deleteModalMessage = "el proyecto";
          this.modalTitle = "Proyecto";
          break;

        default:
          break;
      }
    });
  },
};
</script>
