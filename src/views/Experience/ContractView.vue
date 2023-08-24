<template>
  <div>
    <project-list-view
      v-if="contract.childrens != undefined"
      :projects="contract.childrens"
      :iconsHidden="iconsHidden"
      @reload="$emit('reload')"
    />
    <div v-if="add">
      <input class="m-2" type="text" v-model="projectData" />
      <b-button class="m-2" @click="save(projectData)">Guardar</b-button>
      <b-button class="m-2">Cancelar</b-button>
    </div>
    <div>
      <AddLink v-if="!add && !iconsHidden" :text="'proyecto'" @click="add = true"/>
    </div>
  </div>
</template>

<script lang="ts">
import AddLink from "@/components/AddLink.vue";
import ProjectListView from "./ProjectListView.vue";
import { Component } from "@/Config/Base/Component/Component";
import { ComponentType } from "@/Config/Base/Enums";
export default {
  name: "ContractView",
  components: {
    ProjectListView,
    AddLink
},
  props: {
    iconsHidden: {
      type: Boolean,
      required: true,
    },
    contract: {
      type: Component,
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
      projectData: ""
    };
  },
  methods: {
    save(project: string): void {
      let data = new Component(crypto.randomUUID(), ComponentType.Description, project);
      this.contract.childrens.push(data);
      this.$emit("reload");
      this.projectData = "";
      this.add = false;
    }
  }
};
</script>
