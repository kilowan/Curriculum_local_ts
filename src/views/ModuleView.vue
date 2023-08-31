<template>
  <div v-if="!hide">
    <dt :id="input.dtId" :class="input.dtId">
      {{ input.name }}
      <HideLink v-if="!iconsHidden" @click="hide = true" />
    </dt>
    <dd :id="input.ddId">
      <ul>
        <div v-for="element in input.childrens" v-bind:key="element.guid">
          <!--Language Fields-->
          <Language-view
            v-if="element != undefined && input.childrensDataType == 4"
            :name="element.name"
            :level="element.level"
            :iconsHidden="iconsHidden"
            @edit="$bvModal.show(`edit-${element.guid}`)"
            @delete="$bvModal.show(`delete-${element.guid}`)"
          />
          <!--Experience Fields-->
          <experience-view
            v-if="element != undefined && input.childrensDataType == 1"
            :name="element.name"
            :place="element.place"
            :initDate="element.initDate"
            :finishDate="element.finishDate"
            :childrensTitle="element.childrensTitle"
            :iconsHidden="iconsHidden"
            @edit="$bvModal.show(`edit-${element.guid}`)"
            @delete="$bvModal.show(`delete-${element.guid}`)"
          />
          <!--Training Fields-->
          <training-view
            v-if="element != undefined && input.childrensDataType == 2"
            :name="element.name"
            :place="element.place"
            :graduationDate="element.graduationDate"
            :childrensTitle="element.childrensTitle"
            :iconsHidden="iconsHidden"
            @edit="$bvModal.show(`edit-${element.guid}`)"
            @delete="$bvModal.show(`delete-${element.guid}`)"
          />
          <!--Other Fields-->
          <other-view
            v-if="element != undefined && input.childrensDataType == 5"
            :name="element.name"
            :iconsHidden="iconsHidden"
            @edit="$bvModal.show(`edit-${element.guid}`)"
            @delete="$bvModal.show(`delete-${element.guid}`)"
          />
          <list-view
            v-if="
              element != undefined &&
              (input.childrensDataType == 1 ||
                input.childrensDataType == 2 ||
                input.childrensDataType == 3)
            "
            :key="element.guid"
            :childrensTitle="element.childrensTitle"
            :guid="element.guid"
            :elements="element.childrens"
            :iconsHidden="iconsHidden"
            :parentComponent="element"
            :childrensDataType="element.childrensDataType"
            @reload="$emit('update', input)"
          />
          <EditNewModal
            :modalTitle="input.name"
            :componentData="element"
            :childrensDataType="input.childrensDataType"
          />
          <DeleteModal
            :modalTitle="input.name"
            :message="deleteModalMessage"
            :componentData="element"
            @remove="splice($event)"
          />
        </div>
      </ul>
      <AddNewLink
        v-if="!iconsHidden"
        :type="input.childrensDataType"
        @click="$bvModal.show(`add-${input.guid}`)"
      />
      <AddNewModal
        :guid="input.guid"
        :modalTitle="input.name"
        :childrensDataType="input.childrensDataType"
        @save="save($event)"
      />
    </dd>
    <dd class="clear"></dd>
  </div>
</template>

<script lang="ts">
import AddNewModal from "./Modal/AddNewModal.vue";
import EditNewModal from "./Modal/EditNewModal.vue";
import DeleteModal from "./Modal/DeleteModal.vue";
import AddNewLink from "./../components/AddNewLink.vue";
import HideLink from "./../components/HideLink.vue";
import ListView from "./ListView.vue";
import ExperienceView from "./ExperienceView.vue";
import TrainingView from "./TrainingView.vue";
import LanguageView from "./LanguageView.vue";
import OtherView from "./OtherView.vue";
import { Module } from "@/Config/Base/Module/Module";
import { Component } from "@/Config/Base/Component/Component";
import { ComponentType } from "@/Config/Base/Enums";

export default {
  name: "ModuleView",
  components: {
    AddNewModal,
    EditNewModal,
    DeleteModal,
    AddNewLink,
    LanguageView,
    HideLink,
    ExperienceView,
    TrainingView,
    ListView,
    OtherView,
  },
  props: {
    iconsHidden: {
      type: Boolean,
      required: true,
    },
    input: {
      type: Module,
      required: true,
    },
  },
  data(): any {
    return {
      add: false,
      hide: false,
      deleteModalMessage: "la experiencia",
      modalTitle: "Experiencia",
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
