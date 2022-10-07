<template>
	<ul>
		<li>Centro/ Lugar: {{academic.place}}</li>
		<li v-if="academic.graduationDate">Graduación: {{new Date(academic.graduationDate).getFullYear()}}</li>
		<div v-if="contents.length >0">
			<li v-if="contents.length > 0">	
				<strong class="m-2">Contenido:</strong>
					<contents-view
						:contents="contents"
						:iconsHidden="iconsHidden"
						@refresh="refresh($event)"
					/>
			</li>
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
import { ContentType, Contents, Content } from '../Config/types'

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
	academicIndex: {
		type: Number,
      required: true
	}
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
				var result : Contents = { 
					id: this.academicIndex, 
					contents: this.contents.map((data: any) => { return { name: data.name }})
				};
				this.element = '';
				this.add = false;
				this.$emit('refresh', result);
			});
		},
		refresh(content: Content) {
			this.$nextTick(() => {
				this.contents[content.id].suContents = content.subContents.subContents.map((data: any) => { return { name: data.name }});
				this.contents[content.id].id = content.id;
				var cont = this.contents[content.id];

				this.$emit('refresh', cont);
			});
		}
	}
}
</script>

