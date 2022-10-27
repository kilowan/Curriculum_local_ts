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
        <b-modal
          :id="`edit-project-${project.id}`"
          title="Editar proyecto"
          ok-title="Guardar"
          @ok="update(projectsData)"
        >
          <textarea v-model="project.name" /> <br />
        </b-modal>
        <b-modal
          :id="`delete-project-${project.id}`"
          title="Eliminar Proyecto"
          ok-title="Eliminar"
          @ok="deleteProject(project.id)"
        >
          <div style="text-align: center; margin: 0 auto; width: 380px">
            <h1>
              ¿Seguro que quieres eliminar el proyecto '{{ project.name }}'?
            </h1>
          </div>
        </b-modal>
      </div>
    </ul>
  </div>
</template>

<script lang="ts">
import { Project } from "../../Config/types";
import ProjectView from "./ProjectView.vue";

export default {
  name: "ProjectListView",
  components: {
    ProjectView,
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
      projectsData: new Array<Project>(),
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
    refresh(project: Project) {
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
