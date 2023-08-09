<template>
  <div>
    <project-list-view
      :ref="'projects'"
      :projects="contractData.childrens"
      :iconsHidden="iconsHidden"
      @update="update($event)"
    />
    <div v-if="add">
      <input class="m-2" type="text" v-model="projectData" />
      <b-button class="m-2" @click="save(projectData)">Guardar</b-button>
      <b-button class="m-2">Cancelar</b-button>
    </div>
    <div>
      <b-link v-if="!add && !iconsHidden" @click="add = true">
        <b-icon icon="plus-circle-fill" aria-hidden="true" /> Añadir proyecto
      </b-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "../../Config/types";
import ProjectListView from "./ProjectListView.vue";
export default {
  name: "ContractView",
  components: {
    ProjectListView,
  },
  props: {
    iconsHidden: {
      type: Boolean,
      required: true,
    },
    contract: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      index: 0,
      add: false,
      contractData: {} as Component,
      projectData: "",
      projects: new Array<Component>(),
    };
  },
  methods: {
    save(project: string) {
      this.projects.push({
        id: this.index,
        guid: crypto.randomUUID(),
        name: project,
        childrens: new Array<Component>(),
      });
      this.contractData.childrens.push({
        id: this.index,
        guid: crypto.randomUUID(),
        name: project,
        childrens: new Array<Component>(),
      });
      this.index++;
      this.$emit("update", this.contractData);
      this.projectData = "";
      this.add = false;
    },
    splice(index: string) {
      this.contractData.childrens = this.contractData.childrens.filter(
        (data: any) => data.guid !== index
      );
      this.projects = this.projects.filter((data: any) => data.guid !== index);
      this.$emit("update", this.contractData);
    },
    update(projects: Array<Component>) {
      this.contractData.childrens = projects;
      this.$emit("update", this.contractData);
    },
  },
  mounted() {
    this.contractData = this.contract;
    this.$refs.projects._data.projectsData = this.contract.childrens;
    this.index = this.contract.childrens.length === 0 || this.contract.childrens === undefined || this.contract.childrens === null? 0 : this.contract.childrens.length-1;
  },
};
</script>
