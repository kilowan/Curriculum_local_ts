<template>
  <b-modal
    :id="`add-${guid}`"
    :title="getTitle()"
    ok-title="Guardar"
    @ok="save"
    @cancel="cancel"
  >
    <!--Skills Fields-->
    <skills-view
      v-if="childrensDataType === 3"
      :name="name"
      :childrensTitle="childrensTitle"
      :iconsHidden="false"
      :edit="true"
    />
    <!--social media Fields-->
    <social-media-view
      v-else-if="childrensDataType === 13"
      :name="name"
      :type="type"
      :edit="true"
      :add="true"
    />
    <!--Language Fields-->
    <language-view
      v-else-if="childrensDataType === 4"
      :name="name"
      :level="level"
      :iconsHidden="false"
      :edit="true"
    />
    <!--Experience Fields-->
    <experience-view
      v-else-if="childrensDataType === 1"
      :name="name"
      :place="place"
      :initDate="initDate"
      :finishDate="finishDate"
      :childrensTitle="childrensTitle"
      :iconsHidden="false"
      :edit="true"
    />
    <!--Training Fields-->
    <training-view
      v-else-if="childrensDataType === 2"
      :name="name"
      :place="place"
      :graduationDate="graduationDate"
      :childrensTitle="childrensTitle"
      :iconsHidden="false"
      :edit="true"
    />
    <!--Other Fields-->
    <other-view
      v-else-if="childrensDataType === 5"
      :name="name"
      :iconsHidden="false"
      :edit="true"
    />
    <b-form-textarea v-else v-model="name.value" rows="6" max-rows="16" />
  </b-modal>
</template>

<script lang="ts">
import { Component } from "@/Config/Base/Component/Component";
import { ComponentType } from "@/Config/Base/Enums";
import { FieldValue } from "@/Config/Base/FieldValue/FieldValue";
import { Experience } from "@/Config/Experience/Experience";
import { Language } from "@/Config/Language/Language";
import { Training } from "@/Config/Training/Training";
import LanguageView from "../LanguageView.vue";
import ExperienceView from "../ExperienceView.vue";
import TrainingView from "../TrainingView.vue";
import OtherView from "../OtherView.vue";
import SocialMediaView from "../SocialMedia/SocialMediaView.vue";
import SkillsView from "../SkillsView.vue";

export default {
  name: "AddNewModal",
  components: {
    LanguageView,
    ExperienceView,
    TrainingView,
    OtherView,
    SocialMediaView,
    SkillsView,
  },
  props: {
    guid: {
      type: String,
      required: true,
    },
    childrensDataType: {
      type: Number,
      required: true,
    },
    parentComponent: {
      type: Component,
      required: false,
    },
  },
  data(): any {
    return {
      name: { field: "", value: "" } as FieldValue<string>,
      childrensTitle: { field: "", value: "" } as FieldValue<string>,
      place: { field: "", value: "" } as FieldValue<string>,
      initDate: { field: "", value: "" } as FieldValue<string>,
      finishDate: { field: "", value: "" } as FieldValue<string>,
      graduationDate: { field: "", value: "" } as FieldValue<string>,
      childrens: [] as Array<Component>,
      level: { field: "", value: "" } as FieldValue<string>,
      type: { field: undefined, value: 0 } as FieldValue<number>,
    };
  },
  methods: {
    cancel(): void {
      this.childrensTitle = { field: "", value: "" } as FieldValue<string>;
      this.name = { field: "", value: "" } as FieldValue<string>;
      this.place = { field: "", value: "" } as FieldValue<string>;
      this.initDate = { field: "", value: "" } as FieldValue<string>;
      this.finishDate = { field: "", value: "" } as FieldValue<string>;
      this.graduationDate = { field: "", value: "" } as FieldValue<string>;
      this.level = { field: "", value: "" } as FieldValue<string>;
      this.childrens = [] as Array<Component>;
      this.type = { field: undefined, value: 0 } as FieldValue<number>;
    },
    save(): void {
      this.$nextTick(() => {
        let component = {} as Component;
        switch (this.childrensDataType) {
          case ComponentType.Experience:
            component = this.createExperience();
            break;

          case ComponentType.Academic:
            component = this.createTraining();
            break;

          case ComponentType.Languages:
            component = this.createLanguage();
            break;

          case ComponentType.SocialMedia:
            component = this.createMedia();
            break;

          case ComponentType.Skills:
            component = this.createSkill();
            break;

          default:
            component = this.createComponent();
            break;
        }

        if (this.parentComponent)
          this.parentComponent.childrens.push(component);
        this.cancel();
        this.$emit("save", component);
      });
    },
    createExperience(): Experience {
      let exp = new Experience(
        crypto.randomUUID(),
        new FieldValue<string>(this.name.value),
        this.getChildrensType()
      );
      exp.childrensTitle = this.childrensTitle;
      exp.place = this.place;
      exp.initDate = this.initDate;
      exp.finishDate = this.finishDate;
      return exp;
    },
    createTraining(): Training {
      let exp = new Training(
        crypto.randomUUID(),
        new FieldValue<string>(this.name.value),
        this.getChildrensType()
      );
      exp.place = this.place;
      exp.childrensTitle = this.childrensTitle;
      exp.graduationDate = this.graduationDate;
      return exp;
    },
    createSkill(): Component {
      let skill = new Component(
        crypto.randomUUID(),
        this.getChildrensType(),
        this.name
      );
      skill.childrensTitle = this.childrensTitle;
      return skill;
    },
    createLanguage(): Language {
      return new Language(crypto.randomUUID(), this.name, this.level);
    },
    createMedia(): Component {
      let media = new Component(
        crypto.randomUUID(),
        this.getChildrensType(),
        new FieldValue<string>(this.name.value)
      );
      media.type = new FieldValue<number>(this.type.value);
      return media;
    },
    createComponent(): Component {
      return new Component(
        crypto.randomUUID(),
        this.getChildrensType(),
        this.name
      );
    },
    getTitle(): string {
      switch (this.childrensDataType) {
        case ComponentType.Experience:
          return "Añadir Experiencia";

        case ComponentType.Contract:
          return "Añadir Contrato";

        case ComponentType.Project:
          return "Añadir Proyecto";

        case ComponentType.Academic:
          return "Añadir Formación";

        case ComponentType.Content:
          return "Añadir Contenido";

        case ComponentType.SubContent:
          return "Añadir Subcontenido";

        case ComponentType.Other:
          return "Añadir Otros Datos";

        case ComponentType.Skills:
          return "Añadir skill";

        case ComponentType.SocialMedia:
          return "Añadir red social";

        case ComponentType.Value:
          return "Añadir Valor";
        default:
          return "Añadir";
      }
    },
    getChildrensType(): ComponentType {
      switch (this.childrensDataType) {
        case ComponentType.Experience:
          return ComponentType.Contract;

        case ComponentType.Contract:
          return ComponentType.Project;

        case ComponentType.Project:
          return ComponentType.Description;

        case ComponentType.Academic:
        case ComponentType.Skills:
          return ComponentType.Content;

        case ComponentType.Content:
        case ComponentType.Other:
          return ComponentType.SubContent;

        default:
          return ComponentType.Value;
      }
    },
  },
};
</script>
