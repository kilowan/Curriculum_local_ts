<template>
	<div v-if="!hide">	
		<dt id="experiencia">Experiencia
			<b-link v-if="!iconsHidden" @click="hide = true, $emit('sizeChange')">
				<b-icon icon="eye-slash-fill"/>
			</b-link>
		</dt>
		<dd id="experience">
			<ul>
				<div v-for="(company, firstindex) in experienceList" v-bind:key="firstindex">
					<li>
						{{company.name}}
						<b-link v-if="!iconsHidden" @click="$bvModal.show(`edit-experience-${firstindex}`)">
							<b-icon icon="pencil-square" aria-hidden="true"/>
						</b-link>
						<b-link v-if="!iconsHidden" @click="$bvModal.show(`delete-experience-${firstindex}`)">
							<b-icon icon="x-circle-fill" aria-hidden="true"/>
						</b-link>
						<professional-experience-view :company="company" :iconsHidden="iconsHidden" @refresh="$emit('refresh')" />
					</li>
					<b-modal 
						:id="`edit-experience-${firstindex}`"
						title="Editar Experiencia"
						ok-title="Guardar"
						@cancel="cancel"
					>
						<label>Nombre</label> <input type="text" v-model="company.name" /> <br />
						<label>Centro/Lugar:</label> <input type="text" v-model="company.place" /> <br />
						<label>Fecha de inicio</label> <b-form-datepicker
							v-model="company.initDate"
							min="2015-01-01" max="2030-12-31"></b-form-datepicker> <br />
						<label>Fecha de fin</label> <b-form-datepicker
							v-model="company.finishDate"
							min="2015-01-01" max="2030-12-31"></b-form-datepicker> <br />
					</b-modal>
					<b-modal 
						:id="`delete-experience-${firstindex}`" 
						title="Eliminar Contrato"
						ok-title="Eliminar"
						@ok="deleteExperience"
					>
						<div style="text-align: center; margin: 0 auto; width:380px;">
							<h1>¿Seguro que quieres eliminar el contrato '{{ company.name }}'?</h1>
						</div>
					</b-modal>
				</div>
			</ul>
			<b-link v-if="!iconsHidden" @click="$bvModal.show('add-experience')">
				<b-icon icon="plus-circle-fill" aria-hidden="true"/> Añadir experiencia
			</b-link>
		</dd>
		<dd class="clear"></dd>
		<b-modal 
			:id="'add-experience'" 
			title="Añadir Experiencia"
			ok-title="Guardar"
			@ok="save(experience)"
			@cancel="cancel"
		>
			<label>Nombre</label> <input type="text" v-model="experience.name" /> <br />
			<label>Centro/Lugar:</label> <input type="text" v-model="experience.place" /> <br />
			<label>Tipo</label> <b-form-select :options="options()" v-model="typeSelected"></b-form-select> <br />
			<label>Fecha de inicio</label> <input type="date"
				v-model="initDate"
				min="2015-01-01" max="2030-12-31"> <br />
			<label>Fecha de fin</label> <input type="date"
				v-model="finishDate"
				min="2015-01-01" max="2030-12-31"> <br />
		</b-modal>	
	</div>
</template>


<script lang="ts">

//import { ExperienceType } from './Config/types';
import ProfessionalExperienceView from './ProfessionalExperienceView.vue';

export default {
  name: 'ProfessionalExperienceListView',
  components: {
	ProfessionalExperienceView
  },
  props:{
    iconsHidden: {
      type: Boolean,
      required: true
    },
  },
  data() {
		return {
			experienceList:[],
			experience: {
				initDate: '2021-12-08',
				finishDate: '2021-12-08',
				place: '',
				name: ''
			},
			add: false,
			hide: false,
			typeSelected: 1,
			initDate: '2021-12-08',
			finishDate: '2021-12-08',
			place: '',
		}
	},
	methods: {
		cancel() {
		  this.initDate = '2021-12-08';
		  this.finishDate = '2021-12-08'
		  this.place = '';
		  this.typeSelected = 1;
          this.add = false;
		},
		options: function() {
			return [
					{ value: 1, text: 'personal' },
					{ value: 2, text: 'professional' }
				];
		},
		save(experience: any){
			this.$nextTick(() => {
				this.experienceList.push({
					initDate: experience.initDate,
					finishDate: experience.finishDate,
					place: experience.place,
					name: experience.name
				});
				this.experience = {
				initDate: '2021-12-08',
				finishDate: '2021-12-08',
				place: '',
				name: ''
			};
			this.$emit('refresh');
			});
		},
		deleteExperience(index: number) {
			this.$nextTick(() => {
				this.experienceList.splice(index, 1);
				//this.$emit('refresh');
			});
		}
	},
}
</script>

