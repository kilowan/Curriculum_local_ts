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
			<academic-training-list-view 
				:iconsHidden="active" 
				@update="updateAcademic($event)" 
			/>
			<skill-list-view :iconsHidden="active"	@refresh="EditMode" />
			<language-list-view :languageList="curriculum.languageList" :iconsHidden="active" @refresh="EditMode"/>			
			<other-list-view :other="curriculum.otherData" :iconsHidden="active" @update="updateOther($event)"/>
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
			<academic-training-list-view  
				:iconsHidden="active" 
				@update="updateAcademic($event)" 
			/>
			<skill-list-view :iconsHidden="active"	@refresh="EditMode" />
			<language-list-view :languageList="curriculum.languageList" :iconsHidden="active" @refresh="EditMode"/>			
			<other-list-view :other="curriculum.otherData" :iconsHidden="active" @update="updateOther($event)" />
		</dl>
			<b-button @click="active=false">Desacer</b-button>
		</div>
	</div>
</template>


<script lang="ts">
import { SocialMedia, Language } from '../Config/types';
import  AcademicTrainingListView from './AcademicTraining/AcademicTrainingListView.vue';
import  OtherListView from './Other/OtherListView.vue';
import ProfessionalExperienceListView from './Experience/ProfessionalExperienceListView.vue';
import SkillListView from './Skill/SkillListView.vue';
import LanguageListView from './Language/LanguageView.vue';
import SocialMediaListView from './SocialMedia/SocialMediaView.vue';

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
			add: false,
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
	updateOther(media: any){
		this.curriculum.otherData = media;
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

<style>
* { margin: 0; padding: 0; }
body { font: 16px Helvetica, Sans-Serif; line-height: 24px; background: url(../images/noise.jpg); }
.clear { clear: both; }
.idiomas { border-right: 1px solid #999; }
.otros { border-right: 1px solid #999; }
#page-wrap { width: 1000px; margin: 40px auto 60px; }
#pic { float: right; margin: -30px 0 0 0; height: 100px; }
h1 { margin: 0 0 16px 0; padding: 0 0 16px 0; font-size: 34px; font-weight: bold; letter-spacing: -2px; border-bottom: 1px solid #999; }
h2 { font-size: 20px; margin: 0 0 6px 0; position: relative; }
h2 span { position: absolute; bottom: 0; right: 0; font-style: italic; font-family: Georgia, Serif; font-size: 16px; color: #999; font-weight: normal; }
p { margin: 0 0 16px 0; }
a { color: #999; text-decoration: none; border-bottom: 1px dotted #999; }
a:hover { border-bottom-style: solid; color: black; }
ul { margin: 0 0 32px 17px; }
li { font-size: 20px; }
#objective { width: 100%; float: left; }
#objective p { font-family: Georgia, Serif; font-style: italic; color: #666; }
dt { font-style: italic; font-weight: bold; font-size: 18px; text-align: right; padding: 0 26px 0 0; width: 150px; float: left; border-right: 1px solid #999;  }
dd { width: 800px; float: right; }
dd.clear { float: none; margin: 0; height: 15px; }
.formacion { border-right: 1px solid #999; }
.formacion2 { border-right: 1px solid #999; }
  .marco {
    margin:2%;
	border-style: groove; border-width: 1px;
  }
</style>

