<template>
  <div>
    <project-list-view
      v-if="contract.childrens != undefined"
      :projects="contract.childrens"
      :childrensTitle="contract.childrensTitle"
      :iconsHidden="iconsHidden"
      @reload="$emit('reload')"
    />
    <div v-if="add">
      <input class="m-2" type="text" v-model="projectData" />
      <b-button class="m-2" @click="save(projectData)">Guardar</b-button>
      <b-button class="m-2">Cancelar</b-button>
    </div>
    <div>
      <AddLink v-if="!add && !iconsHidden" :text="getModalTitle" @click="add = true"/>
    </div>
  </div>
</template>

<script lang="ts">
import AddLink from "@/components/AddLink.vue";
import ProjectListView from "./ProjectListView.vue";
import { Component } from "@/Config/Base/Component/Component";
import { ComponentType } from "@/Config/Base/Enums";
export default {
  name: "ContractView",
  components: {
    ProjectListView,
    AddLink
},
  props: {
    iconsHidden: {
      type: Boolean,
      required: true,
    },
    contract: {
      type: Component,
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
      projectData: "",
      //deleteModalMessage: "la experiencia",
      modalTitle: "Experiencia",
    };
  },
  methods: {
    save(project: string): void {
      let data = new Component(crypto.randomUUID(), this.getChildrensType(), project);
      this.contract.childrens.push(data);
      this.$emit("reload");
      this.projectData = "";
      this.add = false;
    },
    getChildrensType(): ComponentType {
      switch (this.contract.childrensDataType) {
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
    }
  },
  computed: {
    getModalTitle(): any {
      return this.modalTitle;
    },
  },
  created(): void {
    this.$nextTick(() => {
      switch (this.contract.childrensDataType) {
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
