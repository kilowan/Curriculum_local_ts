<template>
  <div v-if="mounted" id="page-wrap" class="main">
    <personal-data-view
      :fullName="curriculum.fullName"
      :phoneNumber="curriculum.phoneNumber"
      :email="curriculum.email"
      :socialMedia="curriculum.socialMedia"
      :description="curriculum.description"
      :photo="curriculum.photo"
      :active="active"
      @update="updateSocialMedia($event)"
      @loaded="loaded($event)"
    />
    <br />
    <dd class="clear"></dd>
    <br />
    <dl>
      <module-view
        v-if="curriculum.experience"
        :iconsHidden="active"
        :input="curriculum.experience"
        @update="updateExperience($event)"
      />
      <module-view
        :input="curriculum.academicTraining"
        :iconsHidden="active"
        @update="updateAcademic($event)"
      />
      <module-view
        :input="curriculum.skillList"
        :iconsHidden="active"
        @update="updateSkills($event)"
      />
      <module-view
        v-if="curriculum.languageList"
        :iconsHidden="active"
        :input="curriculum.languageList"
        @update="updateLanguage($event)"
      />
      <module-view
        v-if="curriculum.otherData"
        :iconsHidden="active"
        :input="curriculum.otherData"
        @update="updateOther($event)"
      />
    </dl>
    <div v-if="!isRead" id="buttons">
      <b-button class="m-2" v-if="!active && exportable" @click="doPrint"
        >Imprimir</b-button
      >
      <b-button class="m-2" v-else-if="active" @click="cancel"
        >Desacer</b-button
      >
      <b-button
        v-if="!active && exportable"
        class="m-2"
        @click="getFile(curriculum)"
        >Exportar</b-button
      >
      <file-reader-data accept=".json" type="text" @output="file($event)" />
    </div>
  </div>
</template>

<script lang="ts">
//import jsPDF from 'jspdf';
//declare const html2canvas: (element: HTMLElement, options?: Partial<Options>) => Promise<HTMLCanvasElement>;
import FileReaderData from "../components/FileReaderData.vue";
import ModuleView from "./ModuleView.vue";
import { CurriculumDetail } from "@/Config/CurriculumDetail/CurriculumDetail";
import { Component } from "@/Config/Base/Component/Component";
import { Module } from "@/Config/Base/Module/Module";
import { ComponentType } from "@/Config/Base/Enums";
import { FieldValue } from "@/Config/Base/FieldValue/FieldValue";
import { Training } from "@/Config/Training/Training";
import { Language } from "@/Config/Language/Language";
import { Experience } from "@/Config/Experience/Experience";
import PersonalDataView from "./PersonalDataView.vue";
import { SocialMedia } from "@/Config/SocialMedia/SocialMedia";
import { Image } from "@/Config/Base/Image";

export default {
  name: "CurriculumView",
  components: {
    FileReaderData,
    ModuleView,
    PersonalDataView,
  },
  data(): any {
    return {
      active: false,
      add: false,
      description: "",
      mounted: false,
      curriculum: new CurriculumDetail(
        crypto.randomUUID(),
        new FieldValue<string>("", "Nombre completo"), //fullName
        new FieldValue<string>("", "Descripción"), //description
        new FieldValue<string>("", "Teléfono"), //phoneNumber
        new FieldValue<string>("", "Email"), //email
        new Module<Experience>(
          crypto.randomUUID(),
          "experience",
          "experiencia",
          ComponentType.Experience,
          "Experiencia"
        ),
        new Module<Language>(
          crypto.randomUUID(),
          "languages",
          "idiomas",
          ComponentType.Languages,
          "Idiomas"
        ),
        new Module<Training>(
          crypto.randomUUID(),
          "academic",
          "academica",
          ComponentType.Academic,
          "Formación"
        ),
        [
          new Module<Component>(
            crypto.randomUUID(),
            "complementary",
            "complementaria",
            ComponentType.Skills,
            "Skills"
          ),
          new Module<Component>(
            crypto.randomUUID(),
            "other",
            "otros",
            ComponentType.Other,
            "Otros datos"
          ),
        ]
      ),
      iconsHidden: false,
      reader: {} as FileReader,
      isRead: false,
      exportable: false,
      imp: false,
    };
  },
  methods: {
    loaded(input: Image) {
      this.curriculum.photo = input;
    },
    file(input: string): void {
      this.$nextTick(() => {
        var json = JSON.parse(input);
        this.curriculum = json;
        this.ParseLegacy(this.curriculum);
        if(json.photo) this.curriculum.photo = json.photo;
        this.curriculum.description = json.description;
        this.curriculum.phoneNumber = json.phoneNumber;
        this.curriculum.email = json.email;
        this.curriculum.fullName = json.fullName;
        this.curriculum.otherData = json.otherData;
        this.curriculum.academicTraining = json.academicTraining;
        this.curriculum.skillList = json.skillList;
        this.curriculum.experience = json.experience;
        this.curriculum.socialMedia = json.socialMedia;
        this.curriculum.languageList = json.languageList;
        this.exportable = true;
        this.EditMode();
      });
    },
    ParseLegacy(input: CurriculumDetail): void {
      if (input.guid == undefined) input.setGuid(crypto.randomUUID());
      if (input.academicTraining != null)
        this.ParseModule(input.academicTraining);
      if (input.experience != null) this.ParseModule(input.experience);
      if (input.languageList != null) this.ParseModule(input.languageList);
      if (input.otherData != null) this.ParseModule(input.otherData);
      if (input.skillList != null) this.ParseModule(input.skillList);
      if (input.socialMedia != null)
        input.socialMedia.forEach((element: SocialMedia) => {
          if (element.guid == undefined) element.setGuid(crypto.randomUUID());
        });
    },
    ParseComponent(input: Component): void {
      if (input.guid == undefined) input.setGuid(crypto.randomUUID());
      input.childrens?.forEach((element: Component) =>
        this.ParseComponent(element)
      );
    },
    ParseModule(input: Module<Component>): void {
      if (input.guid == undefined) input.setGuid(crypto.randomUUID());
      input.childrens?.forEach((element: Component) =>
        this.ParseComponent(element)
      );
    },
    EditMode(): void {
      this.$nextTick(() => {
        this.exp();
        this.comp();
        this.academic();
        this.lang();
        this.other();
      });
    },
    cancel(): void {
      this.active = false;
      this.$nextTick(() => {
        this.imp = false;
        this.EditMode();
      });
    },
    doPrint(): void {
      this.active = true;
      this.$nextTick(() => {
        this.EditMode();
        this.$nextTick(() => {
          let mywindow = window.open("", "_blank");
          mywindow!.document.head.innerHTML = document.head.innerHTML;
          mywindow!.document.body.innerHTML = document.body.innerHTML;
          //document.getElementById('page-wrap')!.innerHTML;
          let noPrintableContent: any =
            mywindow!.document.getElementById("buttons");
          noPrintableContent.parentNode.removeChild(noPrintableContent);
          mywindow!.print();
          mywindow!.close();
        });
      });
    },
    descargarArchivo(contenidoEnBlob: Blob, nombreArchivo: string): void {
      let reader = new FileReader();
      reader.onload = function (event) {
        let save = document.createElement("a");
        if (event.target && event.target.result) {
          save.href = event.target.result.toString();
        }
        save.target = "_blank";
        save.download = nombreArchivo || "archivo.dat";
        let clicEvent = new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: true,
        });
        save.dispatchEvent(clicEvent);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
      };
      reader.readAsDataURL(contenidoEnBlob);
    },
    updateSkills(skills: Module<Component>): void {
      this.curriculum.skillList = skills;
      this.exportable = true;
      this.EditMode();
    },
    updateAcademic(media: Module<Training>): void {
      this.curriculum.academicTraining = media;
      this.exportable = true;
      this.EditMode();
    },
    updateLanguage(language: Module<Language>): void {
      this.curriculum.languageList = language;
      this.exportable = true;
      this.EditMode();
    },
    updateOther(media: Module<Component>): void {
      this.curriculum.otherData = media;
      this.exportable = true;
      this.EditMode();
    },
    updateExperience(experience: Module<Experience>): void {
      this.$nextTick(() => {
        this.curriculum.experience = experience;
        this.exportable = true;
        this.EditMode();
      });
    },
    updateSocialMedia(data: Array<Component>): void {
      this.$nextTick(() => {
        this.curriculum.socialMedia = data;
        this.exportable = true;
        this.EditMode();
      });
    },
    exp(): void {
      let experiencia: HTMLElement | null =
        document.querySelector("#experiencia");
      let experience: HTMLElement | null =
        document.querySelector("#experience");
      if (experiencia && experience)
        experiencia.style.height = experience.clientHeight + "px";
    },
    comp(): void {
      let complementaria: HTMLElement | null =
        document.querySelector("#complementaria");
      let complementary: HTMLElement | null =
        document.querySelector("#complementary");
      if (complementaria && complementary)
        complementaria.style.height = complementary.clientHeight + "px";
    },
    academic(): void {
      let academica: HTMLElement | null = document.querySelector("#academica");
      let academic: HTMLElement | null = document.querySelector("#academic");
      if (academica && academic)
        academica.style.height = academic.clientHeight + "px";
    },
    lang(): void {
      let idiomas: HTMLElement | null = document.querySelector("#idiomas");
      let languages: HTMLElement | null = document.querySelector("#languages");
      if (idiomas && languages)
        idiomas.style.height = languages.clientHeight + "px";
    },
    other(): void {
      let otros: HTMLElement | null = document.querySelector("#otros");
      let other: HTMLElement | null = document.querySelector("#other");
      if (otros && other) otros.style.height = other.clientHeight + "px";
    },

    getFile(contenido: string): void {
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
  mounted(): void {
    this.mounted = true;
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
