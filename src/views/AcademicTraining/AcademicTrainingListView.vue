<template>
  <div v-if="!hide">
    <dt id="academica">
      Formación
      <HideLink v-if="!iconsHidden" @click="hide = true"/>
    </dt>
    <dd id="academic">
      <ul>
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
              @update="refresh($event)"
              @delete="$bvModal.show(`delete-${$event}`)"
              @reload="$emit('update', input)"
            />
          </li>
          <b-modal
            :id="`delete-${academic.guid}`"
            :title="'Eliminar formación'"
            ok-title="Eliminar"
            @ok="splice(academic)"
          >
            <div style="text-align: center; margin: 0 auto; width: 380px">
              <h1>
                ¿Seguro que quieres eliminar la formación {{ academic.name }}?
              </h1>
            </div>
          </b-modal>
        </div>
      </ul>
      <!--<ComponentListView
        v-if="input != undefined && input.length >0"
        :iconsHidden="iconsHidden"
        :elements="input"
        :componentDataType="'Academic'"
        @update="refresh($event)"
      />-->
      <AddLink v-if="!iconsHidden" :text="'formación'" @click="$bvModal.show(`add-${input.guid}`)"/>
    </dd>
    <dd class="clear"></dd>
    <b-modal
      :id="`add-${guid}`"
      :title="`Añadir Formación`"
      ok-title="Guardar"
      @ok="save"
      @cancel="cancel"
    >
      <label>Nombre</label> <input type="text" v-model="newComponent.name" />
      <br />
      <label>Centro/Lugar:</label>
      <input type="text" v-model="newComponent.place" /> <br />
      <label>Graduación</label>
      <input
        type="date"
        v-model="newComponent.graduationDate"
        min="2015-01-01"
        max="2030-12-31"
      />
      <br />
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, ComponentType, Module } from "../../Config/types";
//import ComponentListView from "../Component/ComponentListView.vue";
import AcademicTrainingView from "./AcademicTrainingView.vue";
import AddLink from "@/components/AddLink.vue";
import HideLink from "@/components/HideLink.vue";

export default {
  name: "AcademicTrainingListView",
  components: {
    //ComponentListView,
    AcademicTrainingView,
    AddLink,
    HideLink
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
      add: false,
      newComponent: {} as Component,
    };
  },
  methods: {
    refresh(academic: Component): void {
      this.$nextTick(() => {
        let filtered = this.input.filter(
          (data: any) => data.guid !== academic.guid
        );
        let training = this.input.find(
          (data: any) => data.guid === academic.guid
        );
        training = academic;
        filtered.push(training);
        this.input = filtered;
        this.$emit("update", this.input);
      });
    },
    splice(element: Component): void {
      this.input.splice(this.input.indexOf(element), 1);
      this.$emit("update", this.input);
    },
    cancel(): void {
      this.newComponent = {} as Component;
      this.add = false;
    },
    update(trainings: Array<Component>): void {
      this.$nextTick(() => {
        this.$emit("update", trainings);
      });
    },
    save(): void {
      this.$nextTick(() => {
        let component = new Component(
          crypto.randomUUID(),
          this.getChildrensType(),
          this.newComponent.name
        );
        component.componentDataType = "Academic";
        component.place = this.newComponent?.place;
        component.initDate = this.newComponent?.initDate;
        component.finishDate = this.newComponent?.finishDate;
        component.graduationDate = this.newComponent?.graduationDate;
        this.input.push(component);
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
