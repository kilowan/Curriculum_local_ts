<template>
  <div v-if="!hide">
    <dt :id="input.dtId" :class="input.dtId">
      {{ input.name }}
      <HideLink v-if="!iconsHidden" @click="hide = true" />
    </dt>
    <dd :id="input.ddId">
      <ul>
        <div v-for="element in input.childrens" v-bind:key="element.guid">
          <li>
            <div v-if="input.childrensDataType == 4">
              <strong>{{ element.name }}:</strong> {{ element.level.value }}
              <EditLink
                v-if="!iconsHidden"
                @click="$bvModal.show(`edit-${element.guid}`)"
              />
              <DeleteLink
                v-if="!iconsHidden"
                @click="$bvModal.show(`delete-${element.guid}`)"
              />
            </div>
            <div v-else>
              <strong>{{ element.name }}</strong>
              <EditLink
                v-if="!iconsHidden"
                @click="$bvModal.show(`edit-${element.guid}`)"
              />
              <DeleteLink
                v-if="!iconsHidden"
                @click="$bvModal.show(`delete-${element.guid}`)"
              />
              <!--Experience Fields-->
              <experience-view
                v-if="element != undefined && input.childrensDataType == 1"
                :input="element"
              />
              <!--Training Fields-->
              <training-view
                v-if="element != undefined && input.childrensDataType == 2"
                :input="element"
              />
              <list-view
                v-if="
                  element != undefined &&
                  (input.childrensDataType == 1 || input.childrensDataType == 2)
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
              <skill-view
                v-if="element != undefined && input.childrensDataType == 3"
                :input="element"
                :iconsHidden="iconsHidden"
                @reload="$emit('update', input)"
              />
              <other-view
                v-if="element != undefined && input.childrensDataType == 5"
                :input="element"
                :iconsHidden="iconsHidden"
                @reload="$emit('reload', input)"
              />
            </div>
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
      <AddNewLink
        v-if="!iconsHidden"
        :type="input.childrensDataType"
        @click="$bvModal.show(`add-${input.guid}`)"
      />
      <AddNewModal
        :guid="input.guid"
        :modalTitle="input.name"
        :componentDataType="input.childrensDataType"
        @save="save($event)"
      />
    </dd>
    <dd class="clear"></dd>
  </div>
</template>

<script lang="ts">
import AddNewModal from "../Modal/AddNewModal.vue";
import EditNewModal from "../Modal/EditNewModal.vue";
import DeleteModal from "../Modal/DeleteModal.vue";
import AddNewLink from "../../components/AddNewLink.vue";
import DeleteLink from "../../components/DeleteLink.vue";
import EditLink from "../../components/EditLink.vue";
import HideLink from "../../components/HideLink.vue";
import ListView from "../ListView.vue";
import ExperienceView from "../Experience/ExperienceView.vue";
import TrainingView from "../AcademicTraining/TrainingView.vue";
import OtherView from "../Other/OtherView.vue";
import SkillView from "../Skill/SkillView.vue";
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
    DeleteLink,
    EditLink,
    HideLink,
    ExperienceView,
    TrainingView,
    SkillView,
    OtherView,
    ListView,
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
