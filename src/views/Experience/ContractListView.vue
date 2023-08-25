<template>
  <li v-if="contracts != undefined">
    {{ childrensTitle }}:
    <ul>
      <div v-for="contract in contracts" v-bind:key="contract.guid">
        <li>
          {{ contract.name }}
          <EditLink v-if="!iconsHidden" @click="$bvModal.show(`edit-${contract.guid}`)"/>
          <DeleteLink v-if="!iconsHidden" @click="$bvModal.show(`delete-${contract.guid}`)"/>
          <contract-view
            :guid="contract.guid"
            :iconsHidden="iconsHidden"
            :contract="contract"
            @reload="$emit('reload')"
          />
        </li>
        <edit-modal
          :modalTitle="getModalTitle"
          :componentData="contract"
        />
        <delete-modal
          :modalTitle="getModalTitle"
          :message="deleteModalMessage"
          :componentData="contract"
          @remove="splice(contract)"
        />
      </div>
    </ul>
  </li>
</template>

<script lang="ts">
import ContractView from "./ContractView.vue";
import DeleteModal from "../Modal/DeleteModal.vue";
import DeleteLink from "@/components/DeleteLink.vue";
import EditLink from "@/components/EditLink.vue";
import EditModal from "../Modal/EditModal.vue";
import { Component } from "@/Config/Base/Component/Component";
import { ComponentType } from "@/Config/Base/Enums";

export default {
  name: "ContractsView",
  components: {
    ContractView,
    DeleteModal,
    DeleteLink,
    EditLink,
    EditModal
},
  props: {
    contracts: {
      type: Array,
      required: true,
    },
    childrensTitle: {
      type: String,
      required: true,
    },
    iconsHidden: {
      type: Boolean,
      required: true,
    },
  },
  data(): any {
    return {
      projectData: "",
      deleteModalMessage: "la experiencia",
      modalTitle: "Experiencia",
    };
  },
  methods: {
    splice(element: Component): void {
      this.contracts.splice(this.contracts.indexOf(element), 1);
      this.$emit("reload");
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
