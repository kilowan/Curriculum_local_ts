<template>
	<ul>
		<li>Centro/ Lugar: {{academic.place}}</li>
		<li v-if="academic.graduationDate">Graduación: {{new Date(academic.graduationDate).getFullYear()}}</li>
		<div v-if="contents.length >0">
			<contents-view
				:contents="contents"
				:iconsHidden="iconsHidden"
				@refresh="$emit('refresh')"
			/>
		</div>
		<div v-if="add">
			<input class="m-2" type="text" v-model="element" />
			<b-button class="m-2" @click="save(element)">Guardar</b-button>
			<b-button class="m-2" @click="cancel">Cancelar</b-button>
		</div>
		<b-link v-if="!iconsHidden && !add" @click="add = true">
			<b-icon icon="plus-circle-fill" aria-hidden="true"/> Añadir contenido
		</b-link>
	</ul>
</template>


<script lang="ts">
import ContentsView from './ContentsView.vue'
import { ContentType } from '../Config/types'
import axios from 'axios';

export default {
  name: 'AcademicTrainingView',
  components: {
    ContentsView
  },
  props:{
    academic: {
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
			contents:[],
			ContentType: ContentType,
			contract: false,
			hide: false,
			add: false,
			element: '',
		}
	},
	methods: {
		cancel() {
			this.element = '';
			this.add = false;
		},
		save(content: string) {
			this.$nextTick(() => {
				if(content !== '') this.contents.push({ name: content });
				this.element = '';
				this.add = false;
				this.$emit('refresh');
			});
		},
		async update() {
			await axios({
			method: 'put',
			headers: { Authorization: `Bearer ${this.token}` },
			url: `http://localhost:8080/api/Training/${this.academic.id}`,
			data: {
					name: this.academic.name,
					place: this.academic.place,
					graduationDate: this.academic.initDate
				}
			}).then((data: any) =>{
				this.$emit('refresh');
			});
		},
		async deleteTraining() {
			await axios({
				method: 'delete',
				headers: { Authorization: `Bearer ${this.token}` },
				url: `http://localhost:8080/api/Training/${this.academic.id}`,
			}).then((data: any) =>{
				this.$emit('refresh');
			});
		}
	}
}
</script>

