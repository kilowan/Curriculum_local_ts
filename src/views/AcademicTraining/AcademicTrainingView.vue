<template>
	<ul>
		<li>Centro/ Lugar: {{ academicData.place }}</li>
		<li v-if="academicData.graduationDate">Graduación: {{new Date(academicData.graduationDate).getFullYear()}}</li>
		<div v-if="contents.length >0">
			<li v-if="contents.length > 0">	
				<strong class="m-2">Contenido:</strong>
					<contents-view
						:contents="contents"
						:iconsHidden="iconsHidden"
						@update="refresh($event)"
						@sizeChange="$emit('sizeChange')"
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
import ContentsView from '../Content/ContentsView.vue'
import { ContentType, Content, SubContent, Academic } from '../../Config/types'

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
			academicData: {} as Academic,
			contents: new Array<Content>(),
			ContentType: ContentType,
			add: false,
			element: '',
			index: 0
		}
	},
	methods: {
		refresh(contents: Array<Content>) {
			this.$nextTick(() => {
				this.academicData.contents = contents;
				this.$emit('update', this.academicData);
			});
		},
		cancel() {
			this.element = '';
			this.add = false;
		},
		save(content: any) {
			this.$nextTick(() => {
				
				if(content !== '') {
					var cont: Content = {
						id: this.index,
						name: content,
						subContents: new Array<SubContent>()
					}
					this.academicData.contents.push(cont);
					this.contents.push(cont);
				}

				this.element = '';
				this.add = false;
				this.index++;
				this.$emit('update', this.academicData);
			});
		}
	},
	mounted(){
    this.academicData = this.academic;
	this.academicData.contents = new Array<Content>();
  },
}
</script>

