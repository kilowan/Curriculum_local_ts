<template>
  <div v-if="projectsData.length > 0">
    Proyectos:
    <ul>
      <div v-for="project in projectsData" v-bind:key="project.guid">
        <li>
          {{ project.name }}
          <b-link
            v-if="!iconsHidden"
            :id="project.guid"
            @click="$bvModal.show(`edit-${project.guid}`)"
          >
            <b-icon icon="pencil-square" aria-hidden="true" />
          </b-link>
          <b-link
            v-if="!iconsHidden"
            :id="project.guid"
            @click="$bvModal.show(`delete-${project.guid}`)"
          >
            <b-icon icon="x-circle-fill" aria-hidden="true" />
          </b-link>
          <project-view
            :guid="project.guid"
            :project="project"
            :iconsHidden="iconsHidden"
            @update="refresh($event)"
          />
        </li>
        <edit-modal
          :modal-title="'proyecto'"
          :component-data="project"
          :component-data-type="'Project'"
          @update="update($event)"
        />
        <delete-modal
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
    DeleteModal,
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
      projectsData: new Array<Component>(),
    };
  },
  methods: {
    deleteProject(proj: Component): void {
      this.$nextTick(() => {
        this.projectsData = this.projectsData.filter(
          (data: any) => data.guid !== proj.guid
        );
        this.$emit("update", this.projectsData);
      });
    },
    refresh(project: Component): void {
      var projects = this.projectsData.filter(
        (data: any) => data.guid !== project.guid
      );
      projects.push(project);
      this.projectsData = projects;
      this.$emit("update", this.projectsData);
    },
    update(projects: Array<Component>): void {
      this.$nextTick(() => {
        this.$emit("update", projects);
      });
    },
  },
  mounted(): void {
    this.projectsData = this.projects;
  },
};
</script>
