<template>
  <div v-if="projects.length > 0">
    Proyectos:
    <ul>
      <div v-for="project in projects" v-bind:key="project.guid">
        <li>
          {{ project.name }}
          <EditLink v-if="!iconsHidden" @click="$bvModal.show(`edit-${project.guid}`)"/>
          <DeleteLink v-if="!iconsHidden" @click="$bvModal.show(`delete-${project.guid}`)"/>
          <project-view
            :guid="project.guid"
            :project="project"
            :iconsHidden="iconsHidden"
            @update="refresh($event)"
            @reload="$emit('reload')"
          />
        </li>
        <edit-modal
          :modalTitle="'proyecto'"
          :componentData="project"
          :componentDataType="9"
          @update="update($event)"
        />
        <delete-modal
          :modalTitle="'Proyecto'"
          :message="'el proyecto'"
          :componentData="project"
          @remove="splice($event)"
        />
      </div>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component } from "../../Config/types";
import ProjectView from "./ProjectView.vue";
import EditModal from "../Modal/EditModal.vue";
import DeleteModal from "../Modal/DeleteModal.vue";
import DeleteLink from "@/components/DeleteLink.vue";
import EditLink from "@/components/EditLink.vue";

export default {
  name: "ProjectListView",
  components: {
    ProjectView,
    EditModal,
    DeleteModal,
    DeleteLink,
    EditLink
},
  props: {
    projects: {
      type: Array,
      required: true,
    },
    iconsHidden: {
      type: Boolean,
      required: true,
    },
  },
  data(): any {
    return {
    };
  },
  methods: {
    refresh(project: Component): void {
      this.projects.find((data: any) => {
        if(data.guid == project.guid) data = project;
      });
      this.$emit("update", this.projects);
    },
    splice(element: Component): void {
      this.projects.splice(this.projects.indexOf(element), 1);
      this.$emit("reload");
    },
    update(projects: Array<Component>): void {
      this.$nextTick(() => {
        this.$emit("update", projects);
      });
    },
  }
};
</script>
