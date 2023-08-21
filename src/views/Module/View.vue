<template>
  <ul>
    <li v-if="company.place">Centro/Lugar: {{ companyData.place }}</li>
    <li v-if="company.initDate">Fecha inicio: {{ formatDate(companyData.initDate) }}</li>
    <li v-if="company.finishDate">Fecha Fin: {{ formatDate(companyData.finishDate) }}</li>
    <li v-if="company.graduationDate">Graduación: {{ formatDate(companyData.finishDate) }}</li>
    <!--list-->
    <List
      :elements="company.childrens"
    />
    <!--<contract-list-view
      :ref="'contract'"
      :contracts="company.childrens"
      :iconsHidden="iconsHidden"
      @update="update($event)"
    />-->
    <div v-if="add">
      <input class="m-2" type="text" v-model="contractData" />
      <b-button class="m-2" @click="save(contractData)">Guardar</b-button>
      <b-button class="m-2" @click="cancel">Cancelar</b-button>
    </div>
    <AddLink v-if="!iconsHidden" :text="'contrato'" @click="add = true"/>
  </ul>
</template>

<script lang="ts">
import { Component, ComponentType } from "../../Config/types";
import List from "../Module/List.vue";
import AddModal from "../Modal/AddModal.vue";
import EditModal from "../Modal/EditModal.vue";
import DeleteModal from "../Modal/DeleteModal.vue";
import AddLink from "../../components/AddLink.vue";
import DeleteLink from "../../components/DeleteLink.vue";
import EditLink from "../../components/EditLink.vue";
import HideLink from "../../components/HideLink.vue";

export default {
  name: "ModuleView",
  components: {
    List,
    AddModal,
    EditModal,
    DeleteModal,
    AddLink,
    DeleteLink,
    EditLink,
    HideLink
},
  props: {
    iconsHidden: {
      type: Boolean,
      required: true
    },
    input: {
      type: Component,
      required: true
    }
  },
  data(): any {
    return {
      add: false,
      hide: false
    };
  },
  methods: {
    cancel(): void {
      this.add = false;
    },
    options(): any {
      return [
        { value: 1, text: "personal" },
        { value: 2, text: "professional" },
      ];
    },
    deepChange(input: Component): void {
      this.input.childrens.find((data: Component) => {
        if (data.guid === input.guid) data = input;
        else {
          data.childrens?.forEach((data2: Component) => {
            this.deepChange(data2);
          });
        }
      });
    },
    save(experience: Component): void {
      this.$nextTick(() => {
        let data = new Component(experience.guid, experience.name);
        data.initDate = experience.initDate;
        data.finishDate = experience.finishDate;
        data.graduationDate = experience.graduationDate;
        data.place = experience.place;
        data.componentDataType = "Experience";
        this.input.childrens.push(data);
        this.$emit("update", this.input);
        this.experience = {} as Component;
      });
    },
    refresh(experience: Component): void {
      let exp = this.input.childrens.filter(
        (data: any) => data.guid !== experience.guid
      );
      exp.push(experience);
      this.input.childrens = exp;
      this.$emit("update", this.input);
    },
    deleteExperience(comp: Component): void {
      this.$nextTick(() => {
        this.input.childrens = this.input.childrens.filter(
          (data: any) => data.guid !== comp.guid
        );
        this.$emit("update", this.input);
      });
    },
  },
};
</script>
