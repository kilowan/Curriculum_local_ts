<template>
	<ul>
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
		<b-link v-if="!iconsHidden" @click="add = true">
			<b-icon icon="plus-circle-fill" aria-hidden="true"/> Añadir contenido
		</b-link>
	</ul>
</template>


<script lang="ts">
import ContentsView from './ContentsView.vue';
import { ContentType } from './Config/types'
import axios from 'axios';

export default {
  name: 'ComplementaryExperienceView',
  components: {
    ContentsView
  },
  props:{
    skill: {
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
			ContentType: ContentType,
			contents: [],
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
				this.contents.push({ name: content });
				this.cancel();
				this.$emit('refresh');
			});
		},
		async update() {
			await axios({
			method: 'put',
			headers: { Authorization: `Bearer ${this.token}` },
			url: `http://localhost:8080/api/Training/${this.skill.id}`,
			data: {
				name: this.skill.name
			}
			}).then((data: any) =>{
			this.element = '';
			this.add = false;
			this.$emit('refresh');
			});
		},
		async deleteSkill() {
			await axios({
				method: 'delete',
				headers: { Authorization: `Bearer ${this.token}` },
				url: `http://localhost:8080/api/Training/${this.skill.id}`,
			}).then((data: any) =>{
				this.$emit('refresh');
			});
		}
	}
}
</script>

