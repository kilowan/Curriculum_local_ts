<template>
  <b-modal
    :id="`add-${guid}`"
    :title="getTitle()"
    ok-title="Guardar"
    @ok="save"
    @cancel="cancel"
  >
    <label>Name</label><input type="text" v-model="name" placeholder="value" />
    <br />
    <input
      v-if="componentDataType === 4"
      type="text"
      placeholder="level"
      v-model="level.field"
    />
    <input
      v-if="componentDataType === 4"
      type="text"
      placeholder="level"
      v-model="level.value"
    />
    <br />
    <input
      v-if="componentDataType === 2 || componentDataType === 1"
      type="text"
      placeholder="place"
      v-model="place.field"
    />
    <input
      v-if="componentDataType === 2 || componentDataType === 1"
      type="text"
      placeholder="place"
      v-model="place.value"
    />
    <br />
    <input
      v-if="componentDataType === 1"
      type="text"
      placeholder="initDate"
      v-model="initDate.field"
    />
    <input
      v-if="componentDataType === 1"
      type="date"
      v-model="initDate.value"
      min="2015-01-01"
      max="2030-12-31"
    />
    <br />
    <input
      v-if="componentDataType === 1"
      type="text"
      placeholder="finishDate"
      v-model="finishDate.field"
    />
    <input
      v-if="componentDataType === 1"
      type="date"
      v-model="finishDate.value"
      min="2015-01-01"
      max="2030-12-31"
    />
    <input
      v-if="componentDataType === 2"
      type="text"
      placeholder="graduationDate"
      v-model="graduationDate.field"
    />
    <input
      v-if="componentDataType === 2"
      type="date"
      v-model="graduationDate.value"
      min="2015-01-01"
      max="2030-12-31"
    />
    <br />
    <label
      v-if="
        componentDataType === 2 ||
        componentDataType === 8 ||
        componentDataType === 1
      "
      >Título</label
    >
    <input
      v-if="
        componentDataType === 2 ||
        componentDataType === 8 ||
        componentDataType === 1
      "
      type="text"
      placeholder="childrensTitle"
      v-model="childrensTitle"
    />
    <br />
  </b-modal>
</template>

<script lang="ts">
import { Component } from "@/Config/Base/Component/Component";
import { ComponentType } from "@/Config/Base/Enums";
import { FieldValue } from "@/Config/Base/FieldValue/FieldValue";
import { Experience } from "@/Config/Experience/Experience";
import { Language } from "@/Config/Language/Language";
import { Training } from "@/Config/Training/Training";

export default {
  name: "AddNewModal",
  props: {
    guid: {
      type: String,
      required: true,
    },
    componentDataType: {
      type: Number,
      required: true,
    },
  },
  data(): any {
    return {
      childrensDataType: ComponentType,
      name: "",
      childrensTitle: "",
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
      this.childrensDataType = {} as ComponentType;
      (this.name = ""), (this.childrensTitle = "");
      this.place = { field: "", value: "" } as FieldValue;
      this.initDate = { field: "", value: "" } as FieldValue;
      this.finishDate = { field: "", value: "" } as FieldValue;
      this.graduationDate = { field: "", value: "" } as FieldValue;
      this.level = { field: "", value: "" } as FieldValue;
      this.childrens = [] as Array<Component>;
    },
    save(): void {
      this.$nextTick(() => {
        let component = new Component(
          crypto.randomUUID(),
          this.getChildrensType(),
          this.name
        );
        switch (this.componentDataType) {
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
            break;
        }
        this.cancel();
        this.$emit("save", component);
      });
    },
    createExperience(): Experience {
      let exp = new Experience(
        crypto.randomUUID(),
        this.name,
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
        this.name,
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
    getTitle(): string {
      switch (this.componentDataType) {
        case ComponentType.Experience:
          return "Añadir Experiencia";

        case ComponentType.Academic:
          return "Añadir Formación";

        case ComponentType.Languages:
          return "Añadir Idioma";
        default:
          return "Añadir";
      }
    },
    getChildrensType(): ComponentType {
      switch (this.componentDataType) {
        case ComponentType.Experience:
          return ComponentType.Contract;

        case ComponentType.Academic:
        case ComponentType.Skills:
          return ComponentType.Content;

        default:
          return ComponentType.Value;
      }
    },
  },
};
</script>
