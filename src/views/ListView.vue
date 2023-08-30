<template>
  <div v-if="childrensTitle">
    <strong v-if="elements.length > 0" class="m-2">{{ childrensTitle }}:</strong>
    <ul>
      <div v-for="element in elements" v-bind:key="element.guid">
        <li>
          <div v-if="element.childrensDataType == 4">
            <strong>{{ element.name }}:</strong> {{ element.level.value }}
            <EditLink
              v-if="!iconsHidden"
              @click="$bvModal.show(`edit-${element.guid}`)"
            />
            <DeleteLink
              v-if="!iconsHidden"
              @click="$bvModal.show(`delete-${element.guid}`)"
            />
          </div>
          <div v-else>
            <label @click="(hide = !hide), $emit('reload')">{{
              element.name
            }}</label>
            <EditLink
              v-show="!iconsHidden"
              @click="$bvModal.show(`edit-${element.guid}`)"
            />
            <DeleteLink
              v-if="!iconsHidden"
              @click="$bvModal.show(`delete-${element.guid}`)"
            />
            <ul>
              <li v-if="element.place">
                {{ element.place.field }}: {{ element.place.value }}
              </li>
              <li v-if="element.initDate">
                {{ element.initDate.field }}:
                {{ formatDate(element.initDate.value) }}
              </li>
              <li v-if="element.finishDate">
                {{ element.finishDate.field }}:
                {{ formatDate(element.finishDate.value) }}
              </li>
              <list-view
                v-show="!hide"
                v-if="element.childrens.length > 0"
                :guid="element.guid"
                :key="element.guid"
                :elements="element.childrens"
                :childrensTitle="element.childrensTitle"
                :childrensDataType="element.childrensDataType"
                :parentComponent="parentComponent"
                :iconsHidden="iconsHidden"
                @reload="$emit('reload')"
              />
            </ul>
          </div>
          <AddNewLink
            v-if="!iconsHidden && element.childrensDataType != 12"
            :type="element.childrensDataType"
            @click="$bvModal.show(`add-${element.guid}`)"
          />
          <AddModal
            :guid="element.guid"
            :modalTitle="getModalTitle"
            :componentDataType="element.childrensDataType"
            :parentComponent="element"
            @save="save($event)"
          />
        </li>
        <edit-modal :modalTitle="getModalTitle" :componentData="element" />
        <delete-modal
          :modalTitle="getModalTitle"
          :message="deleteModalMessage"
          :componentData="element"
          @remove="splice(element)"
        />
      </div>
    </ul>
  </div>
  <div v-else>
    <div v-for="element in elements" v-bind:key="element.guid">
      <div v-if="element.childrensDataType == 4">
        <strong>{{ element.name }}:</strong> {{ element.level.value }}
        <EditLink
          v-if="!iconsHidden"
          @click="$bvModal.show(`edit-${element.guid}`)"
        />
        <DeleteLink
          v-if="!iconsHidden"
          @click="$bvModal.show(`delete-${element.guid}`)"
        />
      </div>
      <div v-else>
        <label @click="(hide = !hide), $emit('reload')">{{
          element.name
        }}</label>
        <EditLink
          v-if="!iconsHidden"
          @click="$bvModal.show(`edit-${element.guid}`)"
        />
        <DeleteLink
          v-if="!iconsHidden"
          @click="$bvModal.show(`delete-${element.guid}`)"
        />
        <ul>
          <li v-if="element.place">
            {{ element.place.field }}: {{ element.place.value }}
          </li>
          <li v-if="element.initDate">
            {{ element.initDate.field }}:
            {{ formatDate(element.initDate.value) }}
          </li>
          <!--<li v-if="element.finishDate">
            {{ element.finishDate.field }}:
            {{ formatDate(element.finishDate.value) }}
          </li>-->
          <list-view
            v-show="!hide"
            v-if="element.childrens.length > 0"
            :guid="element.guid"
            :key="element.guid"
            :elements="element.childrens"
            :childrensTitle="element.childrensTitle"
            :childrensDataType="element.childrensDataType"
            :parentComponent="element"
            :iconsHidden="iconsHidden"
            @reload="$emit('reload')"
          />
        </ul>
      </div>
      <AddNewLink
        v-if="
          !iconsHidden &&
          element.childrensDataType != undefined &&
          element.childrensDataType != 11
        "
        :type="element.childrensDataType"
        @click="$bvModal.show(`add-${element.guid}`)"
      />
      <AddModal
        :guid="element.guid"
        :modalTitle="getModalTitle"
        :componentDataType="element.childrensDataType"
        :parentComponent="element"
        @save="save($event)"
      />
      <edit-modal :modalTitle="getModalTitle" :componentData="element" />
      <delete-modal
        :modalTitle="getModalTitle"
        :message="deleteModalMessage"
        :componentData="element"
        @remove="splice(element)"
      />
    </div>
  </div>
</template>

<script lang="ts">
//import ContractView from "./Experience/ContractView.vue";
import DeleteModal from "./Modal/DeleteModal.vue";
import DeleteLink from "@/components/DeleteLink.vue";
import EditLink from "@/components/EditLink.vue";
import EditModal from "./Modal/EditModal.vue";
import AddModal from "./Modal/AddModal.vue";
import AddNewLink from "@/components/AddNewLink.vue";
import { Component } from "@/Config/Base/Component/Component";
import { ComponentType } from "@/Config/Base/Enums";

export default {
  name: "ListView",
  components: {
    //ContractView,
    DeleteModal,
    DeleteLink,
    EditLink,
    EditModal,
    AddNewLink,
    AddModal,
  },
  props: {
    guid: {
      type: String,
      required: true,
    },
    elements: {
      type: Array,
      required: true,
    },
    parentComponent: {
      type: Component,
      required: true,
    },
    childrensTitle: {
      type: String,
      required: true,
    },
    childrensDataType: {
      type: Number,
      required: true,
    },
    iconsHidden: {
      type: Boolean,
      required: true,
    },
  },
  data(): any {
    return {
      deleteModalMessage: "la experiencia",
      modalTitle: "Experiencia",
      hide: false,
    };
  },
  methods: {
    splice(element: Component): void {
      this.elements.splice(this.elements.indexOf(element), 1);
      this.$emit("reload");
    },
    save(contract: string): void {
      this.$nextTick(() => {
        let data = new Component(
          crypto.randomUUID(),
          this.getChildrensType(),
          contract
        );
        data.childrensTitle = this.title;
        this.company.childrens.push(data);
        this.cancel();
        this.$emit("reload");
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
      switch (this.childrensDataType) {
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
