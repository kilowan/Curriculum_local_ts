<template>
  <b-modal
    :id="`add-${guid}`"
    :title="getTitle()"
    ok-title="Guardar"
    @ok="save"
    @cancel="cancel"
  >
    <!--Language Fields-->
    <language-view
      v-if="childrensDataType === 4"
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

export default {
  name: "AddNewModal",
  components: {
    LanguageView,
    ExperienceView,
    TrainingView,
    OtherView,
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
      name: { field: "", value: "" } as FieldValue,
      childrensTitle: { field: "", value: "" } as FieldValue,
      place: { field: "", value: "" } as FieldValue,
      initDate: { field: "", value: "" } as FieldValue,
      finishDate: { field: "", value: "" } as FieldValue,
      graduationDate: { field: "", value: "" } as FieldValue,
      childrens: [] as Array<Component>,
      level: { field: "", value: "" } as FieldValue,
    };
  },
  methods: {
    cancel(): void {
      this.childrensTitle = { field: "", value: "" } as FieldValue;
      this.name = { field: "", value: "" } as FieldValue;
      this.place = { field: "", value: "" } as FieldValue;
      this.initDate = { field: "", value: "" } as FieldValue;
      this.finishDate = { field: "", value: "" } as FieldValue;
      this.graduationDate = { field: "", value: "" } as FieldValue;
      this.level = { field: "", value: "" } as FieldValue;
      this.childrens = [] as Array<Component>;
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
        new FieldValue(this.name.value),
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
        new FieldValue(this.name.value),
        this.getChildrensType()
      );
      exp.place = this.place;
      exp.childrensTitle = this.childrensTitle;
      exp.graduationDate = this.graduationDate;
      return exp;
    },
    createLanguage(): Language {
      return new Language(crypto.randomUUID(), this.name, this.level);
    },
    createComponent(): Component {
      return new Component(
        crypto.randomUUID(), 
        this.getChildrensType(), 
        new FieldValue(this.name.value
      ));
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
