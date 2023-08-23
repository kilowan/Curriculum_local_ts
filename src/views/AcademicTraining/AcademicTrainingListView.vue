<template>
  <div v-if="!hide">
    <dt id="academica">
      Formación
      <HideLink v-if="!iconsHidden" @click="hide = true"/>
    </dt>
    <dd id="academic">
      <ul v-if="input != undefined">
        <div
          v-for="academic in input.childrens"
          v-bind:key="academic.guid"
        >
          <li>
            <academic-training-view
              :guid="academic.guid"
              :academic="academic"
              :iconsHidden="iconsHidden"
              :academicIndex="academic.guid"
              @delete="$bvModal.show(`delete-${$event}`)"
              @reload="$emit('update', input)"
            />
          </li>
          <delete-modal
            :modalTitle="getModalTitle"
            :message="deleteModalMessage"
            :componentData="academic"
            @remove="splice(academic)"
          />
        </div>
      </ul>
      <AddLink v-if="!iconsHidden" :text="'formación'" @click="$bvModal.show(`add-${input.guid}`)"/>
    </dd>
    <dd class="clear"></dd>
    <AddModal
      :guid="input.guid"
      :componentDataType="input.childrensDataType"
      @save="save($event)"
    />
  </div>
</template>

<script lang="ts">
import { Component, ComponentType, Module } from "../../Config/types";
import AcademicTrainingView from "./AcademicTrainingView.vue";
import AddLink from "@/components/AddLink.vue";
import HideLink from "@/components/HideLink.vue";
import DeleteModal from "../Modal/DeleteModal.vue";
import AddModal from "../Modal/AddModal.vue";

export default {
  name: "AcademicTrainingListView",
  components: {
    AcademicTrainingView,
    AddLink,
    HideLink,
    DeleteModal,
    AddModal
},
  props: {
    iconsHidden: {
      type: Boolean,
      required: true,
    },
    input: {
      type: Module,
      required: true
    }
  },
  data(): any {
    return {
      hide: false,
      add: false
    };
  },
  methods: {
    splice(element: Component): void {
      this.input.splice(this.input.indexOf(element), 1);
      this.$emit("update", this.input);
    },
    cancel(): void {
      this.add = false;
    },
    save(input: Component): void {
      this.$nextTick(() => {
        this.input.push(input);
        this.cancel();
        this.$emit("update", this.input);
      });
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
          return ComponentType.Content;

        case ComponentType.Content:
        case ComponentType.Other:
          return ComponentType.SubContent;

        default:
          return ComponentType.Value;
      }
    }
  },
};
</script>
