<template>
  <div id="page-wrap" class="main">
    <div v-if="!active" id="contact-info" class="vcard">
      <h1 class="fn">
        <input
          type="text"
          v-model="curriculum.fullName"
          placeholder="Nombre completo"
        />
      </h1>
      <div>
        <b-icon icon="telephone-fill" aria-hidden="true" />
        <input
          type="text"
          v-model="curriculum.phoneNumber"
          placeholder="Teléfono"
        /><br />
      </div>
      <b-icon icon="envelope" aria-hidden="true" /><input
        type="text"
        v-model="curriculum.email"
        placeholder="Email"
      />
    </div>
    <div v-else id="contact-info" class="vcard">
      <h1 class="fn">{{ curriculum.fullName }}</h1>
      <div>
        <b-icon icon="telephone-fill" aria-hidden="true" />
        <span>{{ curriculum.phoneNumber }}</span><br />
      </div>
      <div>
        <b-icon icon="envelope" aria-hidden="true" />
        <a :href="'mailto:' + curriculum.email">{{ curriculum.email }}</a
        ><br />
      </div>
    </div>
    <social-media-list-view
      :ref="'socialMedia'"
      :media="curriculum.socialMedia"
      :iconsHidden="iconsHidden"
      @update="updateSocialMedia($event)"
    />
    <div id="objective">
      <textarea v-if="!active" v-model="curriculum.description" placeholder="Descripción" />
      <p v-else>{{ curriculum.description }}</p>
    </div>
    <div class="clear"></div>
    <dl></dl>
    <dd class="clear"></dd>
    <dl>
      <professional-experience-list-view
        :ref="'experience'"
        :iconsHidden="active"
        @update="updateExperience($event)"
      />
      <academic-training-list-view
        :ref="'academic'"
        :iconsHidden="active"
        @update="updateAcademic($event)"
      />
      <skill-list-view 
        :iconsHidden="active" 
        @update="updateSkills($event)" />
      <language-list-view
        :ref="'lang'"
        :iconsHidden="active"
        @update="updateLanguage($event)"
      />
      <other-list-view :iconsHidden="active" @update="updateOther($event)" />
    </dl>
    <div v-if="!isRead" id="buttons">
      <b-button class="m-2" v-if="!active" @click="doPrint">Imprimir</b-button>
      <b-button class="m-2" v-else @click="cancel">Desacer</b-button>
      <b-button class="m-2" @click="getFile(curriculum)">Exportar</b-button>
      <b-button class="m-2" @click="EditMode">Recargar</b-button>
      <input type="file" @change="readFile($event)"/>
    </div>
  </div>
</template>

<script lang="ts">
//import jsPDF from 'jspdf';
//declare const html2canvas: (element: HTMLElement, options?: Partial<Options>) => Promise<HTMLCanvasElement>;
import { CurriculumDetail } from "../Config/types";
import AcademicTrainingListView from "./AcademicTraining/AcademicTrainingListView.vue";
import OtherListView from "./Other/OtherListView.vue";
import ProfessionalExperienceListView from "./Experience/ProfessionalExperienceListView.vue";
import SkillListView from "./Skill/SkillListView.vue";
import LanguageListView from "./Language/LanguageView.vue";
import SocialMediaListView from "./SocialMedia/SocialMediaListView.vue";

export default {
  name: "CurriculumView",
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
      active: false,
      add: false,
      curriculum: {} as CurriculumDetail,
      iconsHidden: false,
      reader: {} as FileReader,
      isRead: false
      //: (element: HTMLElement, options?: Partial<Options>) => Promise<HTMLCanvasElement>
    };
  },
  watch: {
    curriculum() {
      if(this.reader.result != null) {
        var json = JSON.parse(this.reader.result);
        console.log(json);
        console.log(this.reader.result);
        this.curriculum.description = json.description;
        this.curriculum.phoneNumber = json.phoneNumber;
        this.curriculum.academicTraining = json.academicTraining;
        this.curriculum.email = json.email;
        this.curriculum.fullName = json.fullName;
        this.$refs.socialMedia._data.socialMediaList = json.socialMedia
        this.$refs.experience._data.experienceList = json.experience;
        this.$refs.academic._data.academicTrainingList = json.academicTraining;
        this.$refs.lang._data.languageList = json.languageList;

        //return //JSON.parse(this.reader.result);
      }
        return this.curriculum;
      //var data = new File(file.target.files[0], file.name);
      //return data.stream;
      //var reader = new FileReader(data);
      //reader.readAsBinaryString(file.target.files[0]);
      //return await reader.onload(() => );
    },
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
    cancel() {
      this.active = false;
      this.$nextTick(() => {
        this.EditMode();
      });
    },
    doPrint() {
      this.active=true;
      this.$nextTick(() => {
        this.EditMode();
        this.$nextTick(() => {
          let mywindow = window.open('', '_blank');
          mywindow!.document.head.innerHTML = document.head.innerHTML;
          mywindow!.document.body.innerHTML = document.body.innerHTML;
          //document.getElementById('page-wrap')!.innerHTML;
          let noPrintableContent: any = mywindow!.document.getElementById('buttons');
          noPrintableContent.parentNode.removeChild(noPrintableContent);
          mywindow!.print();
          mywindow!.close();
        });
      });
    },
    readFile(file: any) {
      this.reader = new FileReader();
      this.reader.readAsBinaryString(file.target.files[0])
      //var data = this.getBinary(file);//.then((data: any) => {
        //var data = this.getBinary(file);
        //this.$nextTick(() => {
          //var json = JSON.parse(data.);
          //console.log(json);
        //});

      //});
    },
    /*pullFile(data: any) {
      this.curriculum = data;
    }*/
   /*previewFiles(event: any) {
      console.log(event.target.files);
   },*/
    /*createPDF() {
      let el = document.querySelector('#results');
      if (el) {
        html2canvas(el as HTMLElement).then((canvas: any) => {
          let img = canvas.toDataURL('image/png');
          var doc = new jsPDF('p', 'pt', 'a4');
          let date = new Date();

          doc.text(this.$t('sarlaftsearch_pdf_header'), 30, 50);
          let formattedDate = date.toLocaleDateString(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' });
          doc.text(formattedDate, 500, 30);
          doc.addImage(img, 'JPEG', 50, 100, 500, 160, 'SarlaftReport.pdf');
          let blob = doc.output('blob');
          let name = this.formatName(this.companyName, this.$t('lite_sarlaft_modal_title'));
          this.descargarArchivo(blob, name);
        });
      }
    },*/
    descargarArchivo(contenidoEnBlob: Blob, nombreArchivo: string) {
      var reader = new FileReader();
      reader.onload = function (event) {
        var save = document.createElement('a');
        if (event.target && event.target.result) {
          save.href = event.target.result.toString();
        }
        save.target = '_blank';
        save.download = nombreArchivo || 'archivo.dat';
        var clicEvent = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true,
        });
        save.dispatchEvent(clicEvent);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
      };
      reader.readAsDataURL(contenidoEnBlob);
    },
    updateSkills(skills: any) {
      this.curriculum.otherTraining = skills;
      console.log(this.curriculum);
      this.EditMode();
    },
    updateAcademic(media: any) {
      this.curriculum.academicTraining = media;
      console.log(this.curriculum);
      this.EditMode();
    },
    updateLanguage(language: any) {
      this.curriculum.languageList = language;
      console.log(this.curriculum);
      this.EditMode();
    },
    updateOther(media: any) {
      this.curriculum.otherData = media;
      console.log(this.curriculum);
      this.EditMode();
    },
    updateExperience(experience: any) {
      this.$nextTick(() => {
        this.curriculum.experience = experience;
        console.log(this.curriculum);
        this.EditMode();
      });
    },
    updateSocialMedia(data: any) {
      this.$nextTick(() => {
        this.curriculum.socialMedia = data;
        console.log(this.curriculum);
        this.EditMode();
      });
    },
    exp: function () {
      let experiencia: HTMLElement | null =
        document.querySelector("#experiencia");
      let experience: HTMLElement | null =
        document.querySelector("#experience");
      if (experiencia && experience)
        experiencia.style.height = experience.clientHeight + "px";
    },
    comp: function () {
      let complementaria: HTMLElement | null =
        document.querySelector("#complementaria");
      let complementary: HTMLElement | null =
        document.querySelector("#complementary");
      if (complementaria && complementary)
        complementaria.style.height = complementary.clientHeight + "px";
    },
    academic: function () {
      let academica: HTMLElement | null = document.querySelector("#academica");
      let academic: HTMLElement | null = document.querySelector("#academic");
      if (academica && academic)
        academica.style.height = academic.clientHeight + "px";
    },
    lang: function () {
      let idiomas: HTMLElement | null = document.querySelector("#idiomas");
      let languages: HTMLElement | null = document.querySelector("#languages");
      if (idiomas && languages)
        idiomas.style.height = languages.clientHeight + "px";
    },
    other: function () {
      let otros: HTMLElement | null = document.querySelector("#otros");
      let other: HTMLElement | null = document.querySelector("#other");
      if (otros && other) otros.style.height = other.clientHeight + "px";
    },

    getFile(contenido: any) {
      const a = document.createElement("a");
      const archivo = new Blob([JSON.stringify(contenido)], { type: "" });
      //new Blob([contenido], { type: 'text/plain' });
      const url = URL.createObjectURL(archivo);
      a.href = url;
      var date = new Date();
      a.download = "descarga" + date.toISOString() + ".json";
      a.click();
      URL.revokeObjectURL(url);
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
  font: 16px Helvetica, Sans-Serif;
  line-height: 24px;
  background: url(../images/noise.jpg);
}
.clear {
  clear: both;
}
.idiomas {
  border-right: 1px solid #999;
}
.otros {
  border-right: 1px solid #999;
}
#page-wrap {
  width: 1000px;
  margin: 40px auto 60px;
}
#pic {
  float: right;
  margin: -30px 0 0 0;
  height: 100px;
}
h1 {
  margin: 0 0 16px 0;
  padding: 0 0 16px 0;
  font-size: 34px;
  font-weight: bold;
  letter-spacing: -2px;
  border-bottom: 1px solid #999;
}
h2 {
  font-size: 20px;
  margin: 0 0 6px 0;
  position: relative;
}
h2 span {
  position: absolute;
  bottom: 0;
  right: 0;
  font-style: italic;
  font-family: Georgia, Serif;
  font-size: 16px;
  color: #999;
  font-weight: normal;
}
p {
  margin: 0 0 16px 0;
}
a {
  color: #999;
  text-decoration: none;
  border-bottom: 1px dotted #999;
}
a:hover {
  border-bottom-style: solid;
  color: black;
}
ul {
  margin: 0 0 32px 17px;
}
li {
  font-size: 20px;
}
#objective {
  width: 100%;
  float: left;
}
#objective p {
  font-family: Georgia, Serif;
  font-style: italic;
  color: #666;
}
dt {
  font-style: italic;
  font-weight: bold;
  font-size: 18px;
  text-align: right;
  padding: 0 26px 0 0;
  width: 150px;
  float: left;
  border-right: 1px solid #999;
}
dd {
  width: 800px;
  float: right;
}
dd.clear {
  float: none;
  margin: 0;
  height: 15px;
}
.formacion {
  border-right: 1px solid #999;
}
.formacion2 {
  border-right: 1px solid #999;
}
.marco {
  margin: 2%;
  border-style: groove;
  border-width: 1px;
}
</style>
