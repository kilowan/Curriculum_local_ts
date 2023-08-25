<template>
  <div v-if="!hide">
    <dt :id="input.dtId" class="otros" v-if="input.childrens">
      {{ input.name }}
      <HideLink v-if="!iconsHidden" @click="hide = true"/>
    </dt>
    <dd :id="input.ddId" v-if="input.childrens != undefined">
      <ul>
        <div v-for="otherData in input.childrens" v-bind:key="otherData.guid">
          <li>
            {{ otherData.name }}
            <EditLink v-if="!iconsHidden" @click="$bvModal.show(`edit-${otherData.guid}`)"/>
            <DeleteLink v-if="!iconsHidden" @click="$bvModal.show(`delete-${otherData.guid}`)"/>
            <other-view
              :input="otherData"
              :iconsHidden="iconsHidden"
              @reload="$emit('reload', input)"
            />
          </li>
          <edit-modal
            :modalTitle="getModalTitle"
            :componentData="otherData"
          />
          <delete-modal
            :modalTitle="getModalTitle"
            :message="deleteModalMessage"
            :componentData="otherData"
            @remove="splice(otherData.guid)"
          />
        </div>
      </ul>
      <div v-if="add">
        <input type="text" v-model="otherNew" />
        <b-button class="m-2" @click="save(otherNew)">Guardar</b-button>
        <b-button class="m-2" @click="cancel">Cancelar</b-button>
      </div>
      <AddLink v-if="!iconsHidden && !add" :text="getModalTitle" @click="add = true"/>
    </dd>
    <dd class="clear"></dd>
  </div>
</template>

<script lang="ts">
import otherView from "./OtherView.vue";
import DeleteModal from "../Modal/DeleteModal.vue";
import EditModal from "../Modal/EditModal.vue";
import AddLink from "@/components/AddLink.vue";
import DeleteLink from "@/components/DeleteLink.vue";
import HideLink from "@/components/HideLink.vue";
import EditLink from "@/components/EditLink.vue";
import { Module } from "@/Config/Base/Module/Module";
import { ComponentType } from "@/Config/Base/Enums";
import { Component } from "@/Config/Base/Component/Component";

export default {
  name: "OtherListView",
  components: {
    otherView,
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
      type: Module,
      required: true
    }
  },
  data(): any {
    return {
      hide: false,
      add: false,
      otherNew: "",
      deleteModalMessage: "la experiencia",
      modalTitle: "Experiencia",
    };
  },
  methods: {
    cancel(): void {
      this.otherNew = "";
      this.add = false;
    },
    save(otherNew: string): void {
      this.$nextTick(() => {
        this.input.childrens.push(
          new Component(crypto.randomUUID(), 
          ComponentType.SubContent, 
          otherNew
        ));
        this.$emit("update", this.input);
        this.cancel();
      });
    },
    splice(guid: string): void {
      this.input.childrens = this.input.childrens.filter((data: any) => data.guid !== guid);
      this.$emit("update", this.input);
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
