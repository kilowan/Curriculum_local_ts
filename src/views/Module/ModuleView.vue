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
            {{ element.name }}
            <EditLink v-if="!iconsHidden" @click="$bvModal.show(`edit-${element.guid}`)"/>
            <DeleteLink v-if="!iconsHidden" @click="$bvModal.show(`delete-${element.guid}`)"/>
            <professional-experience-view
              v-if="element != undefined"
              :guid="element.guid"
              :company="element"
              :iconsHidden="iconsHidden"
              @reload="$emit('update', input)"
            />
          </li>
          <EditModal
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
    <AddModal
      :guid="input.guid"
      :modalTitle="input.name"
      :componentDataType="input.childrensDataType"
      @save="save($event)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Module, ComponentType } from "../../Config/types";
import AddModal from "../Modal/AddModal.vue";
import EditModal from "../Modal/EditModal.vue";
import DeleteModal from "../Modal/DeleteModal.vue";
import AddLink from "../../components/AddLink.vue";
import DeleteLink from "../../components/DeleteLink.vue";
import EditLink from "../../components/EditLink.vue";
import HideLink from "../../components/HideLink.vue";
import ProfessionalExperienceView from "../Experience/ProfessionalExperienceView.vue";

export default {
  name: "ModuleView",
  components: {
    AddModal,
    EditModal,
    DeleteModal,
    AddLink,
    DeleteLink,
    EditLink,
    HideLink,
    ProfessionalExperienceView,
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
        let data = new Component(experience.guid, experience.childrensDataType, experience.name);
        data.initDate = experience.initDate;
        data.finishDate = experience.finishDate;
        data.graduationDate = experience.graduationDate;
        data.place = experience.place;
        this.input.childrens.push(data);
        this.$emit("update", this.input);
        this.experience = {} as Component;
      });
    },
    splice(element: Component): void {
      this.input.childrens.splice(this.input.childrens.indexOf(element), 1);
      this.$emit("update", this.input);
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
