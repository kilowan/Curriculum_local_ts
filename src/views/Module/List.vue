<template>
  <div>
    <ul>
      <div v-for="element in elements" v-bind:key="element.guid">
        <li>
          {{ element.name }}
          <EditLink v-if="!iconsHidden" @click="$bvModal.show(`edit-${element.guid}`)"/>
          <DeleteLink v-if="!iconsHidden" @click="$bvModal.show(`delete-${element.guid}`)"/>
          <professional-experience-view
            :guid="element.guid"
            :company="element"
            :iconsHidden="iconsHidden"
            @reload="$emit('reload')"
          />
        </li>
        <EditModal
          :modalTitle="modalTitle"
          :componentData="element"
          :componentDataType="childrensDataType"
        />
        <DeleteModal
          :modalTitle="modalTitle"
          :message="deleteModalMessage"
          :componentData="element"
          @remove="splice(element)"
        />
      </div>
    </ul>
    <AddLink v-if="!iconsHidden" :text="input.name" @click="$bvModal.show(`add-${input.guid}`)"/>
    <AddModal
      :guid="guid"
      :modalTitle="modalTitle"
      :componentDataType="childrensDataType"
      @save="save($event)"
    />
  </div>
</template>

<script lang="ts">
import ProfessionalExperienceView from "../ProfessionalExperienceView.vue";
import AddModal from "../Modal/AddModal.vue";
import EditModal from "../Modal/EditModal.vue";
import DeleteModal from "../Modal/DeleteModal.vue";
import AddLink from "../../components/AddLink.vue";
import DeleteLink from "../../components/DeleteLink.vue";
import EditLink from "../../components/EditLink.vue";
import { Component } from "@/Config/Base/Component/Component";
import { ComponentType } from "@/Config/Base/Enums";

export default {
  name: "List",
  components: {
    ProfessionalExperienceView,
    EditModal,
    DeleteModal,
    AddLink,
    DeleteLink,
    EditLink,
    AddModal
},
  props: {
    iconsHidden: {
      type: Boolean,
      required: true
    },
    elements: {
      type: Array,
      required: true
    },
    childrensDataType: {
      type: Number,
      required: true
    }
  },
  data(): any {
    return {
      deleteModalMessage: "la experiencia",
      modalTitle: "Experiencia",
      guid: crypto.randomUUID()
    };
  },
  methods: {
    getModalTitle(): any {
      return this.modalTitle;
    },
    save(element: Component): void {
      this.$nextTick(() => {
        let data = new Component(
          element.guid, 
          this.getChildrensType(), 
          element.name
        );
        data.initDate = element.initDate;
        data.finishDate = element.finishDate;
        data.graduationDate = element.graduationDate;
        data.place = element.place;
        this.input.childrens.push(data);
        this.$emit("reload");
      });
    },
    splice(element: Component): void {
      this.input.childrens.splice(this.input.childrens.indexOf(element), 1);
      this.$emit("reload");
    },
    getChildrensType(): ComponentType {
      switch (this.input.childrensDataType) {
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
