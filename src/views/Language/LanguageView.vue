<template>
  <div v-if="!hide">
    <dt :id="input.dtId" class="idiomas">
      {{ input.name }}
      <HideLink v-if="!iconsHidden" @click="(hide = true), $emit('hide')"/>
    </dt>
    <dd :id="input.ddId">
      <ul>
        <div v-for="language in input.childrens" v-bind:key="language.guid">
          <li>
            <strong>{{ language.name }}:</strong> {{ language.level }}
            <EditLink v-if="!iconsHidden" @click="$bvModal.show(`edit-${language.guid}`)"/>
            <DeleteLink v-if="!iconsHidden" @click="$bvModal.show(`delete-${language.guid}`)"/>
          </li>
          <EditModal
            :modalTitle="getModalTitle"
            :componentData="language"
            :componentDataType="4"
          />
          <DeleteModal
            :modalTitle="getModalTitle"
            :message="deleteModalMessage"
            :componentData="language"
            @remove="splice(language)"
          />
        </div>
      </ul>
      <AddLink v-if="!iconsHidden" :text="getModalTitle" @click="$bvModal.show(`add-${guid}`)"/>
    </dd>
    <dd class="clear"></dd>
    <AddNewModal
      :guid="guid"
      :componentDataType="4"
      @save="save($event)"
    />
  </div>
</template>

<script lang="ts">
import AddNewModal from "../Modal/AddNewModal.vue";
import EditModal from "../Modal/EditModal.vue";
import DeleteModal from "../Modal/DeleteModal.vue";
import AddLink from "@/components/AddLink.vue";
import DeleteLink from "@/components/DeleteLink.vue";
import HideLink from "@/components/HideLink.vue";
import EditLink from "@/components/EditLink.vue";
import { Component } from "@/Config/Base/Component/Component";
import { LanguageModule } from "@/Config/Language/Module/LanguageModule";
import { ComponentType } from "@/Config/Base/Enums";

export default {
  name: "LanguagesView",
  components: {
    AddNewModal,
    EditModal,
    DeleteModal,
    AddLink,
    DeleteLink,
    HideLink,
    EditLink
},
  props: {
    iconsHidden: {
      type: Boolean,
      required: true,
    },
    input: {
      type: LanguageModule,
      required: true
    }
  },
  data(): any {
    return {
      hide: false,
      add: false,
      languageLevelList: [],
      language: {} as Component,
      guid: crypto.randomUUID(),
      deleteModalMessage: "la experiencia",
      modalTitle: "Experiencia"
    };
  },
  methods: {
    splice(element: Component): void {
      this.input.childrens.splice(this.input.childrens.indexOf(element), 1);
      this.$emit("update", this.input);
    },
    cancel(): void {
      this.add = false;
      this.language.name = "";
      this.language.level = "";
    },
    save(language: Component): void {
      this.$nextTick(() => {
        let lang = new Component(crypto.randomUUID(), language.childrensDataType, language.name);
        lang.level = language.level;
        this.input.childrens.push(lang);
        this.$emit("update", this.input);
        this.language = {} as Component;
      });
    },
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
          this.deleteModalMessage = "la formación";
          this.modalTitle = "Formación";
          break;

        case ComponentType.Experience:
          this.deleteModalMessage = "la experiencia";
          this.modalTitle = "Experiencia";
          break;

        case ComponentType.Languages:
          this.deleteModalMessage = "el idioma";
          this.modalTitle = "Idioma";
          break;

        case ComponentType.Other:
          this.deleteModalMessage = "el elemento";
          this.modalTitle = "Elemento";
          break;

        case ComponentType.Skills:
          this.deleteModalMessage = "la skill";
          this.modalTitle = "Skill";
          break;

        case ComponentType.Description:
          this.deleteModalMessage = "la descripción";
          this.modalTitle = "Descripcion";
          break;

        case ComponentType.Content:
          this.deleteModalMessage = "el contenido";
          this.modalTitle = "Contenido";
          break;

        case ComponentType.Contract:
          this.deleteModalMessage = "el contrato";
          this.modalTitle = "Contrato";
          break;

        case ComponentType.SubContent:
          this.deleteModalMessage = "el subcontenido";
          this.modalTitle = "SubContenido";
          break;

        case ComponentType.Project:
          this.deleteModalMessage = "el proyecto";
          this.modalTitle = "Proyecto";
          break;

        default:
          break;
      }
    });
  },
};
</script>
