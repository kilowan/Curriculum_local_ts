<template>
  <div>
      <ul>
        <div v-for="description in projectData.descriptionList" v-bind:key="description.id">
          <li>
            {{ description.name }}
            <b-link v-if="!iconsHidden" @click="$bvModal.show(`edit-description-${description.id}`)">
              <b-icon icon="pencil-square" aria-hidden="true"/>
            </b-link>
            <b-link v-if="!iconsHidden" @click="$bvModal.show(`delete-description-${description.id}`)">
              <b-icon icon="x-circle-fill" aria-hidden="true"/>
            </b-link>
          </li>
          <b-modal 
			      :id="`edit-description-${description.id}`"
			      title="Editar descripción"
			      ok-title="Guardar"
			      @cancel="cancel"
		      >
			      <input type="text" v-model="description.name" /> <br />
		      </b-modal>
          <b-modal 
            :id="`delete-description-${description.id}`" 
            title="Eliminar Proyecto"
            ok-title="Eliminar"
            @ok="splice(description.id)"
          >
            <div style="text-align: center; margin: 0 auto; width:380px;">
              <h1>¿Seguro que quieres eliminar la descripción '{{ description.name }}'?</h1>
            </div>
          </b-modal>
        </div>
      </ul>
      <div v-if="add">
        <input  type="text" v-model="desc" />
        <b-button @click="save(desc)">Guardar</b-button>
        <b-button @click="cancel">Cancelar</b-button>
      </div>
      <b-link v-if="!add && !iconsHidden" @click="add = true">
        <b-icon icon="plus-circle-fill" aria-hidden="true"/> Añadir descripción
      </b-link>
  </div>
</template>


<script lang="ts">

import { Description, Project } from '../../Config/types';

export default {
  name: 'ProjectView',
  props:{
    project: {
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
      index: 0,
      add: false,
      description: '',
      desc: '',
      descriptions: new Array<Description>(),
      projectData: {} as Project
		}
	},
  methods: {
    cancel() {
      this.add = false;
    },
    save(description: string) {
      this.$nextTick(() => {
        this.descriptions.push({
          id: this.index,
          name: description
        });
        this.projectData.descriptionList.push({
          id: this.index,
          name: description
        });
        this.index++;
        this.add = false;
        this.desc = '';
        this.$emit('update', this.projectData);
      });
    },
    splice(index: number){
      this.descriptions.splice(index, 1);
      this.projectData.descriptionList.splice(index, 1);
      this.$emit('update', this.projectData);
    }
  },
  mounted() {
		this.projectData = this.project;
	}
}
</script>

