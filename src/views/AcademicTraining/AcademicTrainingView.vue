<template>
  <div v-if="input != undefined">
    <div v-if="edit && !iconsHidden">
      <input type="text" v-model="input.name" />
      <SaveLink v-if="!iconsHidden" @click="edit = false"/>
      <DeleteLink @click="$emit('delete', input.guid)"/>
    </div>
    <div v-else>
      {{ input.name }}
      <EditLink v-if="!iconsHidden" @click="edit = true"/>
      <DeleteLink @click="$emit('delete', input.guid)"/>
    </div>
    <ul>
      <li v-if="edit">
        <input type="text" v-model="input.place.field" />
        <input type="text" v-model="input.place.value" />
      </li>
      <li v-else>{{ input.place.field }}: {{ input.place.value }}</li>
      <div v-if="input.graduationDate">
        <li v-if="edit">
          <input type="text" v-model="input.graduationDate.field" />
          <input
            type="date"
            v-model="input.graduationDate.value"
            min="2015-01-01"
            max="2030-12-31"
          />
        </li>
        <li v-else>
          {{ input.graduationDate.field }}: {{ formatDate(input.graduationDate.value) }}
        </li>
      </div>
      <li  v-if="input.childrens != undefined && input.childrens.length > 0">
        <strong class="m-2">{{ input.childrensTitle }}:</strong>
        <ul>
          <contents-view
            :input="input.childrens"
            :iconsHidden="iconsHidden"
            @reload="$emit('reload')"
          />
        </ul>
      </li>
      <div v-if="add">
        <input class="m-2" type="text" v-model="element" />
        <input class="m-2" type="text" v-model="title" placeholder="title"/>
        <b-button class="m-2" @click="save(element)">Guardar</b-button>
        <b-button class="m-2" @click="cancel">Cancelar</b-button>
      </div>
      <AddLink v-if="!iconsHidden && !add" :text="getModalTitle" @click="add = true"/>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component } from "@/Config/Base/Component/Component";
import ContentsView from "../Content/ContentListView.vue";
import AddLink from "@/components/AddLink.vue";
import DeleteLink from "@/components/DeleteLink.vue";
import EditLink from "@/components/EditLink.vue";
import SaveLink from "@/components/SaveLink.vue";
import { ComponentType } from "@/Config/Base/Enums";
import { Training } from "@/Config/Training/Training";

export default {
  name: "AcademicTrainingView",
  components: {
    ContentsView,
    AddLink,
    DeleteLink,
    EditLink,
    SaveLink
},
  props: {
    input: {
      type: Training,
      required: true,
    },
    iconsHidden: {
      type: Boolean,
      required: true,
    },
    guid: {
      type: String,
      required: true,
    },
  },
  data(): any {
    return {
      add: false,
      element: '',
      title: '',
      edit: false,
      //deleteModalMessage: "la experiencia",
      modalTitle: ''
    };
  },
  methods: {
    cancel(): void {
      this.element = '';
      this.title = ''
      this.add = false;
      this.edit = false;
    },
    save(): void {
      this.$nextTick(() => {
        if (this.element !== "") {
          let data = new Component(crypto.randomUUID(), this.getChildrensType(), this.element);
          data.childrensTitle = this.title;
          this.input.childrens.push(data);
        }
        
        this.cancel();
        this.$emit("reload");
      });
    },
    formatDate(date: string): number {
      return new Date(date).getFullYear();
    },
    getChildrensType(): ComponentType {
      switch (this.input.childrensDataType) {
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
    }
  },
  computed: {
    getModalTitle(): any {
      return this.modalTitle;
    },
  },
  created(): void {
    this.$nextTick(() => {
      switch (this.input.childrensDataType) {
        case ComponentType.Academic:
          //this.deleteModalMessage = "la formación";
          this.modalTitle = "Formación";
          break;

        case ComponentType.Experience:
          //this.deleteModalMessage = "la experiencia";
          this.modalTitle = "Experiencia";
          break;

        case ComponentType.Languages:
          //this.deleteModalMessage = "el idioma";
          this.modalTitle = "Idioma";
          break;

        case ComponentType.Other:
          this.deleteModalMessage = "el elemento";
          this.modalTitle = "Elemento";
          break;

        case ComponentType.Skills:
          //this.deleteModalMessage = "la skill";
          this.modalTitle = "Skill";
          break;

        case ComponentType.Description:
          //this.deleteModalMessage = "la descripción";
          this.modalTitle = "Descripcion";
          break;

        case ComponentType.Content:
          //this.deleteModalMessage = "el contenido";
          this.modalTitle = "Contenido";
          break;

        case ComponentType.Contract:
          //this.deleteModalMessage = "el contrato";
          this.modalTitle = "Contrato";
          break;

        case ComponentType.SubContent:
          //this.deleteModalMessage = "el subcontenido";
          this.modalTitle = "SubContenido";
          break;

        case ComponentType.Project:
          //this.deleteModalMessage = "el proyecto";
          this.modalTitle = "Proyecto";
          break;

        default:
          break;
      }
    });
  },
};
</script>
