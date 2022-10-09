<template>
	<div>
		<div v-if="!active" id="page-wrap" class="main">
			<div id="contact-info" class="vcard">
				<h1 class="fn">
					<input type="text" v-model="curriculum.fullName" placeholder="Nombre completo" />
				</h1>
				<div>
					<b-icon icon="telephone-fill" aria-hidden="true"/> 
					<input type="text" v-model="curriculum.phoneNumber" placeholder="Teléfono"/><br />
				</div>
				<b-icon icon="envelope" aria-hidden="true"/><input type="text" v-model="curriculum.email" placeholder="Email"/> 
			</div>
				<social-media-list-view :iconsHidden="iconsHidden"/>
			<div id="objective">
				<textarea v-model="curriculum.description" placeholder="Descripción"/>
			</div>
			<div class="clear"></div>	
			<dl>
			</dl>
			<dd class="clear"></dd>
			<dl>
			<professional-experience-list-view 	:iconsHidden="active" @refresh="exp" :experienceList="curriculum.professionalExperience"/>
			<academic-training-list-view :iconsHidden="active" @update="updateAcademic($event)"/>
			<skill-list-view :iconsHidden="active"	@refresh="EditMode" />
			<language-list-view :languageList="curriculum.languageList" :iconsHidden="active" @refresh="EditMode"/>			
			<other-list-view :other="curriculum.otherData" :iconsHidden="active" @sizeChange="EditMode"/>
		</dl>
		<dd class="clear"></dd>
			<b-button @click="getFile(curriculum)">Guardar</b-button>
		</div>
		<div  v-else id="page-wrap">
			<div id="contact-info" class="vcard">
				<h1 class="fn">{{ curriculum.fullName }}</h1>
				<div>
					<b-icon icon="telephone-fill" aria-hidden="true"/> <span>{{ curriculum.phoneNumber }}</span><br />
				</div>
				<div>
					<b-icon icon="envelope" aria-hidden="true"/> <a :href="'mailto:'+ curriculum.email">{{ curriculum.email }}</a><br />
				</div>
			</div>
			<social-media-list-view :iconsHidden="true"/>
			<div id="objective">
				<p>{{ curriculum.description }}</p>
			</div>
			<div class="clear"></div>	
			<dl>
			</dl>
			<dd class="clear"></dd>
			<dl>
			<professional-experience-list-view 	:iconsHidden="active" :experienceList="curriculum.professionalExperience" @refresh="EditMode"/>
			<academic-training-list-view  :iconsHidden="active" @update="updateAcademic($event)" />
			<skill-list-view :iconsHidden="active"	@refresh="EditMode" />
			<language-list-view :languageList="curriculum.languageList" :iconsHidden="active" @refresh="EditMode"/>			
			<other-list-view :other="curriculum.otherData" :iconsHidden="active" @refresh="EditMode"/>
		</dl>
			<b-button @click="active=false">Desacer</b-button>
		</div>
	</div>
</template>


<script lang="ts">
import { SocialMedia, SocialMediaType, Language } from '../Config/types';
import  AcademicTrainingListView from './AcademicTrainingListView.vue';
import  OtherListView from './OtherListView.vue';
import ProfessionalExperienceListView from './ProfessionalExperienceListView.vue';
import SkillListView from './SkillListView.vue';
import LanguageListView from './LanguageListView.vue';
import SocialMediaListView from './SocialMediaListView.vue';

export default {
  name: 'CurriculumView',
  components: {
	AcademicTrainingListView,
	OtherListView,
	ProfessionalExperienceListView,
	SkillListView,
	LanguageListView,
	SocialMediaListView,
  },
  data() {
		return {
			active:false,
			edit: false,
			page: 'select',
			selected: undefined,
			name: '',
			add: false,
			message: '',
			curriculum: {
				otherTraining:[],
				languageList:[],
				professionalExperience:[],
				email: '',
				phoneNumber:'',
				fullName:'',
				description:'',
				academicTraining:[],
				otherData:[],
				socialMedia: []
			},
			SocialMediaType: SocialMediaType,
			iconsHidden: false
		}
	},
  methods: {
	EditMode() {
        this.$nextTick(() => {
			this.exp();
			this.comp();
			this.academic();
			this.lang();
			this.other();
        });
	},
	updateAcademic(media: any){
		this.curriculum.academicTraining = media;
		console.log(this.curriculum);
		this.EditMode();
	},
	addLanguage: function(data: Language){
		this.$nextTick(() => {
			this.curriculum.languageList.push(data);
		});
	},
	addSocialMedia: function(data: SocialMedia){
		this.$nextTick(() => {
			this.curriculum.socialMedia.push(data);
		});
	},
	exp: function () {
		let experiencia: HTMLElement|null = document.querySelector('#experiencia');
		let experience: HTMLElement|null = document.querySelector('#experience');
		if(experiencia && experience) experiencia.style.height = experience.clientHeight + 'px';
	},
	comp: function () {
		let complementaria: HTMLElement|null = document.querySelector('#complementaria');
		let complementary: HTMLElement|null = document.querySelector('#complementary');
		if(complementaria && complementary) complementaria.style.height = complementary.clientHeight + 'px';
	},
	academic: function () {
		let academica: HTMLElement|null = document.querySelector('#academica');
		let academic: HTMLElement|null = document.querySelector('#academic');
		if(academica && academic) academica.style.height = academic.clientHeight + 'px';
	},
	lang: function () {
		let idiomas: HTMLElement|null = document.querySelector('#idiomas');
		let languages: HTMLElement|null = document.querySelector('#languages');
		if(idiomas && languages) idiomas.style.height = languages.clientHeight + 'px';
	},
	other: function () {
		let otros: HTMLElement|null = document.querySelector('#otros');
		let other: HTMLElement|null = document.querySelector('#other');
		if(otros && other) otros.style.height = other.clientHeight + 'px';
	},

	getFile(contenido: any){
		const a = document.createElement("a");
		const archivo = new Blob([JSON.stringify(contenido)], { type: "" });
		//new Blob([contenido], { type: 'text/plain' });
		const url = URL.createObjectURL(archivo);
		a.href = url;
		var date = new Date();
		a.download = 'descarga' + date.toISOString() + '.json';
		a.click();
		URL.revokeObjectURL(url);
	}
  }
}
</script>

