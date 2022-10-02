<template>
	<div>
		Proyectos:
		<ul>
			<div v-for="(project, thirdindex) in projects" v-bind:key="thirdindex">
				<li>
					{{ project.name }}
					<b-link v-if="!iconsHidden" @click="$bvModal.show(`edit-project-${thirdindex}`)">
						<b-icon icon="pencil-square" aria-hidden="true"/>
					</b-link>
					<b-link v-if="!iconsHidden" @click="$bvModal.show(`delete-project-${thirdindex}`)">
						<b-icon icon="x-circle-fill" aria-hidden="true"/>
					</b-link>
					<project-view 
						:project="project"
						:iconsHidden="iconsHidden"
						@refresh="$emit('refresh')"
						@hide="hidden"
					/>
				</li>
				<b-modal 
					:id="`edit-project-${thirdindex}`"
					title="Editar proyecto"
					ok-title="Guardar"
				>
					<input type="text" v-model="project.name" /> <br />
				</b-modal>
				<b-modal 
					:id="`delete-project-${thirdindex}`" 
					title="Eliminar Proyecto"
					ok-title="Eliminar"
					@ok="deleteProject(thirdindex)"
				>
					<div style="text-align: center; margin: 0 auto; width:380px;">
						<h1>¿Seguro que quieres eliminar el proyecto '{{ project.name }}'?</h1>
					</div>
				</b-modal>
			</div>
		</ul>
	</div>
</template>


<script lang="ts">
import ProjectView from './ProjectView.vue';

export default {
  name: 'ProjectListView',
  components:{
	  ProjectView,
  },
  props:{
    projects: {
      type: Array,
      required: true
    },
    iconsHidden: {
      type: Boolean,
      required: true
    },
  },
  data() {
		return {
			contract: false,
			hide: false,
			counter: 0,
			contracted: false
		}
	},
	methods: {
		hidden() {
			this.counter--;
			if (this.counter == 0) {
				this.hide = true;
			}
			this.$emit('sizeChange');
		},
		deleteProject(thirdindex: number) {
			this.$nextTick(() => {
				this.projects.splice(thirdindex, 1);
			});
		}
	},
	mounted() {
		this.counter = this.projects.length;
	}
}
</script>

