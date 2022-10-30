<template>
  <div v-if="projectsData.length > 0">
    Proyectos:
    <ul>
      <div v-for="project in projectsData" v-bind:key="project.id">
        <li>
          {{ project.name }}
          <b-link
            v-if="!iconsHidden"
            @click="$bvModal.show(`edit-project-${project.id}`)"
          >
            <b-icon icon="pencil-square" aria-hidden="true" />
          </b-link>
          <b-link
            v-if="!iconsHidden"
            @click="$bvModal.show(`delete-project-${project.id}`)"
          >
            <b-icon icon="x-circle-fill" aria-hidden="true" />
          </b-link>
          <project-view
            :project="project"
            :iconsHidden="iconsHidden"
            @update="refresh($event)"
          />
        </li>
        <edit-modal 
          :modal-id="'project'"
          :modal-title="'proyecto'"
          :component-data="project"
          :component-datatype="'Project'"
          @update="update($event)"
        />
        <delete-modal 
        :modal-id="'project'"
        :modalTitle="'Proyecto'"
        :message="'el proyecto'"
        :component-data="project"
        @remove="deleteProject($event)"
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

export default {
  name: "ProjectListView",
  components: {
    ProjectView,
    EditModal,
    DeleteModal
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
  data() {
    return {
      projectsData: new Array<Component>(),
    };
  },
  methods: {
    deleteProject(index: number) {
      this.$nextTick(() => {
        this.projectsData = this.projectsData.filter(
          (data: any) => data.id !== index
        );
        this.$emit("update", this.projectsData);
      });
    },
    refresh(project: Component) {
      var projects = this.projectsData.filter(
        (data: any) => data.id !== project.id
      );
      projects.push(project);
      this.projectsData = projects;
      this.$emit("update", this.projectsData);
    },
    update(projects: any) {
      this.$nextTick(() => {
        this.$emit('update', projects);
      });
    },
  },
  mounted() {
    this.projectsData = this.projects;
  },
};
</script>
