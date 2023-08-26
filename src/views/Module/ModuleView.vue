<template>
  <div v-if="!hide">
    <dt :id="input.dtId" :class="input.dtId">
      {{ input.name }}
      <HideLink v-if="!iconsHidden" @click="hide = true"/>
    </dt>
    <dd :id="input.ddId">
      <ul>
        <div v-for="element in input.childrens" v-bind:key="element.guid">
          <li>
            <strong>{{ element.name }}</strong>
            <EditLink v-if="!iconsHidden" @click="$bvModal.show(`edit-${element.guid}`)"/>
            <DeleteLink v-if="!iconsHidden" @click="$bvModal.show(`delete-${element.guid}`)"/>
            <professional-experience-view
              v-if="element != undefined && checkExperience(input.childrensDataType)"
              :guid="element.guid"
              :company="element"
              :iconsHidden="iconsHidden"
              @reload="$emit('update', input)"
            />
            <academic-training-view
              v-if="element != undefined && checkAcademic(input.childrensDataType)"
              :guid="element.guid"
              :input="element"
              :iconsHidden="iconsHidden"
              @reload="$emit('update', input)"
            />
            <skill-view
              v-if="element != undefined && checkSkills(input.childrensDataType)"
              :input="element"
              :iconsHidden="iconsHidden"
              @reload="$emit('update', input)"
            />
          </li>
          <EditNewModal
            :modalTitle="input.name"
            :componentData="element"
            :componentDataType="element.childrensDataType"
          />
          <DeleteModal
            :modalTitle="input.name"
            :message="deleteModalMessage"
            :componentData="element"
            @remove="splice($event)"
          />
        </div>
      </ul>
      <AddLink v-if="!iconsHidden" :text="input.name" @click="$bvModal.show(`add-${input.guid}`)"/>
    </dd>
    <dd class="clear"></dd>
    <AddNewModal
      :guid="input.guid"
      :modalTitle="input.name"
      :componentDataType="input.childrensDataType"
      @save="save($event)"
    />
  </div>
</template>

<script lang="ts">
import AddNewModal from "../Modal/AddNewModal.vue";
import EditNewModal from "../Modal/EditNewModal.vue";
import DeleteModal from "../Modal/DeleteModal.vue";
import AddLink from "../../components/AddLink.vue";
import DeleteLink from "../../components/DeleteLink.vue";
import EditLink from "../../components/EditLink.vue";
import HideLink from "../../components/HideLink.vue";
import ProfessionalExperienceView from "../Experience/ProfessionalExperienceView.vue";
import AcademicTrainingView from "../AcademicTraining/AcademicTrainingView.vue";
import { Module } from "@/Config/Base/Module/Module";
import { Component } from "@/Config/Base/Component/Component";
import { ComponentType } from "@/Config/Base/Enums";

export default {
  name: "ModuleView",
  components: {
    AddNewModal,
    EditNewModal,
    DeleteModal,
    AddLink,
    DeleteLink,
    EditLink,
    HideLink,
    ProfessionalExperienceView,
    AcademicTrainingView
},
  props: {
    iconsHidden: {
      type: Boolean,
      required: true
    },
    input: {
      type: Module,
      required: true
    }
  },
  data(): any {
    return {
      add: false,
      hide: false,
      deleteModalMessage: "la experiencia",
      modalTitle: "Experiencia"
    };
  },
  methods: {
    cancel(): void {
      this.add = false;
    },
    save(experience: Component): void {
      this.$nextTick(() => {
        this.input.childrens.push(experience);
        this.$emit("update", this.input);
      });
    },
    splice(element: Component): void {
      this.input.childrens.splice(this.input.childrens.indexOf(element), 1);
      this.$emit("update", this.input);
    },
    checkExperience(input: ComponentType): boolean {
      return input == ComponentType.Experience;
    },
    checkAcademic(input: ComponentType): boolean {
      return input == ComponentType.Academic;
    },
    checkLanguage(input: ComponentType): boolean {
      return input == ComponentType.Languages;
    },
    checkSkills(input: ComponentType): boolean {
      return input == ComponentType.Skills;
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
