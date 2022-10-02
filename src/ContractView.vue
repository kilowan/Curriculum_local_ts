<template>
  <div>
    <project-list-view
      v-if="projects.length > 0"
      :projects="projects"
      :iconsHidden="iconsHidden"
      @contract="$emit('contract')"
      @refresh="$emit('refresh')"
    />
    <div v-if="add">
      <input class="m-2" type="text" v-model="projectData" />
      <b-button class="m-2" @click="projects.push({name: projectData}), projectData = '', add = false">Guardar</b-button>
      <b-button class="m-2" @click="cancel">Cancelar</b-button>
    </div>
    <div>
      <b-link v-if="!add && !iconsHidden" @click="add = true">
        <b-icon icon="plus-circle-fill" aria-hidden="true"/> Añadir proyecto
      </b-link>
    </div>
</div>
</template>


<script lang="ts">
import ProjectListView from './ProjectListView.vue';
export default {
  name: 'ContractView',
  components: {
	ProjectListView
  },
  props:{
    contract: {
      type: Object,
      required: true
    },
    iconsHidden: {
      type: Boolean,
      required: true
    },
  },
  data() {
		return {
      contracted: false,
      add: false,
      hide: false,
      projectData: '',
      projects: []
    }
	}
}
</script>

