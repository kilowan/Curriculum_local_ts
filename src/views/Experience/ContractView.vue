<template>
  <div>
    <project-list-view
      v-if="projects.length > 0"
      :projects="projects"
      :iconsHidden="iconsHidden"
      @refresh="$emit('refresh')"
    />
    <div v-if="add">
      <input class="m-2" type="text" v-model="projectData" />
      <b-button class="m-2" @click="save(projectData)">Guardar</b-button>
      <b-button class="m-2">Cancelar</b-button>
    </div>
    <div>
      <b-link v-if="!add && !iconsHidden" @click="add = true">
        <b-icon icon="plus-circle-fill" aria-hidden="true"/> Añadir proyecto
      </b-link>
    </div>
</div>
</template>


<script lang="ts">
import { Contract, Project, Description } from '../../Config/types';
import ProjectListView from './ProjectListView.vue';
export default {
  name: 'ContractView',
  components: {
	ProjectListView
  },
  props:{
    iconsHidden: {
      type: Boolean,
      required: true
    },
    contract: {
      type: Object,
      required: true
    }
  },
  data() {
		return {
      index: 0,
      add: false,
      contractData: {} as Contract,
      projectData: '',
      projects: new Array<Project>()
    }
	},
  methods: {
    save(project: string) {
      this.projects.push({
        id: this.index,
        name: project,
        descriptionList: new Array<Description>()
      });
      this.$emit('update', this.contractData);
      this.projectData = '';
      this.add = false;
    },
    splice(index: number) {
      this.contractData.projects.splice(index, 1);
      this.projects.splice(index, 1);
      this.$emit('update', this.contractData);
    }
  },
  mounted() {
    this.contractData = this.contract;
  }

}
</script>

