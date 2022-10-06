<template>
	<div>
		<div v-if="!active" id="page-wrap" class="main">
			<div id="contact-info" class="vcard">
				<h1 class="fn">
					<input type="text" v-model="ddata.fullName" placeholder="Nombre completo" />
				</h1>
				<div>
					<b-icon icon="telephone-fill" aria-hidden="true"/> 
					<input type="text" v-model="ddata.phoneNumber.number" placeholder="Teléfono"/><br />
				</div>
				<b-icon icon="envelope" aria-hidden="true"/><input type="text" v-model="ddata.email.fullEmail" placeholder="Email"/> 
			</div>
				<social-media-list-view :iconsHidden="iconsHidden"/>
			<div id="objective">
				<textarea v-model="ddata.description" placeholder="Descripción"/>
			</div>
			<div class="clear">{{EditMode('')}}</div>	
			<dl>
			</dl>
			<dd class="clear"></dd>
			<dl>
			<professional-experience-list-view 	:iconsHidden="active" @refresh="exp" :experienceList="$result.experienceList"/>
			<academic-training-list-view :iconsHidden="active"/>
			<skill-list-view :iconsHidden="active"	@refresh="EditMode" />
			<language-list-view :languageList="ddata.languageList" :iconsHidden="active" @refresh="EditMode"/>			
			<other-list-view :other="ddata.otherData" :iconsHidden="active" @sizeChange="EditMode"/>
		</dl>
		<dd class="clear"></dd>
			<b-button @click="downloadPDF">Guardar</b-button>
		</div>
		<div  v-else id="page-wrap">
			<div id="contact-info" class="vcard">
				<h1 class="fn">{{ ddata.fullName }}</h1>
				<div>
					<b-icon icon="telephone-fill" aria-hidden="true"/> <span>{{ ddata.phoneNumber.number }}</span><br />
				</div>
				<div>
					<b-icon icon="envelope" aria-hidden="true"/> <a :href="'mailto:'+ ddata.email.fullEmail">{{ ddata.email.fullEmail }}</a><br />
				</div>
			</div>
			<social-media-list-view :iconsHidden="true"/>
			<div id="objective">
				<p>{{ ddata.description }}</p>
			</div>
			<div class="clear">{{EditMode('')}}</div>	
			<dl>
			</dl>
			<dd class="clear"></dd>
			<dl>
			<professional-experience-list-view 	:iconsHidden="active" :experienceList="$result.experienceList" @refresh="EditMode"/>
			<academic-training-list-view  :iconsHidden="active" @refresh="EditMode" />
			<skill-list-view :iconsHidden="active"	@refresh="EditMode" />
			<language-list-view :languageList="ddata.languageList" :iconsHidden="active" @refresh="EditMode"/>			
			<other-list-view :other="ddata.otherData" :iconsHidden="active" @refresh="EditMode"/>
		</dl>
			<b-button @click="active=false">Desacer</b-button>
		</div>
	</div>
</template>


<script lang="ts">
import { SocialMedia, SocialMediaType } from '../Config/types';
import  AcademicTrainingListView from './AcademicTrainingListView.vue';
import  OtherListView from './OtherListView.vue';
import ProfessionalExperienceListView from './ProfessionalExperienceListView.vue';
import SkillListView from './SkillListView.vue';
import LanguageListView from './LanguageListView.vue';
import SocialMediaListView from './SocialMediaListView.vue';
import { jsPDF } from "jspdf";

export default {
  name: 'CurriculumView',
  components: {
	AcademicTrainingListView,
	OtherListView,
	ProfessionalExperienceListView,
	SkillListView,
	LanguageListView,
	SocialMediaListView
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
			ddata: {
				experience:[],
				otherTraining:[],
				languageList:[],
				email: {
					fullEmail:''
				},
				phoneNumber:{
					number:''
				},
				fullName:'',
				description:'',
				academicTraining:[],
				otherData:[],
				socialMedia:[],
				userId: 0,
				token:''
			},
			curriculum:{},
			SocialMediaType: SocialMediaType,
			iconsHidden: false
		}
	},
  methods: {
	EditMode(data:string){
        this.$nextTick(() => {
			this.exp();
			this.comp();
			this.academic();
			this.lang();
			this.other();
			return data;
        });
	},
	addLanguage: function(data: any){
		this.$nextTick(() => {
			this.ddata.languageList.push(data);
		});
	},
	addSocialMedia: function(data: SocialMedia){
		this.$nextTick(() => {
			this.ddata.socialMedia.push(data);
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
	createMedia(media: any){
		this.curriculum.SocialMedia = media;
	},
	downloadPDF() {
	console.log(this.$result);
	this.active = true;
	//const doc = new jsPDF();
	const contentHtml = document.querySelector('#app');

	var doc = new jsPDF({
    //orientation: 'landscape'
	});
	doc.setFont("courier");
	//doc.setFontType("normal");
	doc.setFontSize(24);
	doc.setTextColor(100);
	doc.addPage(contentHtml?.outerHTML);
	
	//doc. = contentHtml?.outerHTML;
	/*doc.fromHTML(contentHtml, 15, 15, { // error: fromHTML is not a function
		width: 170,
	});*/
	doc.save("sample.pdf");
	}
	/*save: function() {
		const data = JSON.stringify(this.inputData)
		const blob = new Blob([data], {type: 'text/plain'})
		const e = document.createEvent('MouseEvents'),
		a = document.createElement('a');
		a.download = "CurriculumData.json";
		a.href = window.URL.createObjectURL(blob);
		a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
		e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		a.dispatchEvent(e);
	},*/
  },
  mounted() {
	
	this.$result.experienceList = [];  	
	//if(this.$route.params.token) {
			//this.curriculumId = this.$route.params.curriculumId;
			//this.token = this.$route.params.token;
			//this.ddata = this.getCurriculum(this.$route.params.curriculumId);
		//}
  	}
}
</script>

