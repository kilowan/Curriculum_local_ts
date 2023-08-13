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
      <b-link v-if="!add && !iconsHidden" :id="guid" @click="add = true">
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
    guid: {
      type: String,
      required: true,
    },
  },
  data(): any {
    return {
      add: false,
      contractData: {} as Component,
      projectData: "",
      projects: new Array<Component>(),
    };
  },
  methods: {
    save(project: string): void {
      let data = new Component(crypto.randomUUID(), project);
      this.projects.push(data);
      this.contractData.childrens.push(data);
      this.$emit("update", this.contractData);
      this.projectData = "";
      this.add = false;
    },
    splice(guid: string): void {
      this.contractData.childrens = this.contractData.childrens.filter(
        (data: Component) => data.guid !== guid
      );
      this.projects = this.projects.filter((data: any) => data.guid !== guid);
      this.$emit("update", this.contractData);
    },
    update(projects: Array<Component>): void {
      this.contractData.childrens = projects;
      this.$emit("update", this.contractData);
    },
  },
  mounted(): void {
    this.contractData = this.contract;
    this.$refs.projects._data.projectsData = this.contract.childrens;
  },
};
</script>
