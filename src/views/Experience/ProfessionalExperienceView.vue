<template>
  <div v-if="company != undefined">
    <ul>
      <li>{{ company.place.field }}: {{ company.place.value }}</li>
      <li>{{ company.initDate.field }}: {{ formatDate(company.initDate.value) }}</li>
      <li v-if="company.finishDate">
        {{ company.finishDate.field }}: {{ formatDate(company.finishDate.value) }}
      </li>
      <contract-list-view
        :contracts="company.childrens"
        :childrensTitle="company.childrensTitle"
        :iconsHidden="iconsHidden"
        @reload="$emit('reload')"
      />
      <div v-if="add">
        <input class="m-2" type="text" v-model="contractData" />
        <b-button class="m-2" @click="save(contractData)">Guardar</b-button>
        <b-button class="m-2" @click="cancel">Cancelar</b-button>
      </div>
      <AddLink v-if="!iconsHidden" :text="getModalTitle" @click="add = true"/>
    </ul>
  </div>
</template>

<script lang="ts">
import AddLink from "@/components/AddLink.vue";
import ContractListView from "./ContractListView.vue";
import { Component } from "@/Config/Base/Component/Component";
import { ComponentType } from "@/Config/Base/Enums";

export default {
  name: "ProfessionalExperienceView",
  components: {
    ContractListView,
    AddLink
},
  props: {
    company: {
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
      contractData: "",
      //deleteModalMessage: "la experiencia",
      modalTitle: "Experiencia",
    };
  },
  methods: {
    save(contract: string): void {
      this.$nextTick(() => {
        let data = new Component(crypto.randomUUID(), ComponentType.Project, contract);
        this.company.childrens.push(data);
        this.cancel();
        this.$emit("reload");
      });
    },
    cancel(): void {
      this.contractData = "";
      this.add = false;
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
