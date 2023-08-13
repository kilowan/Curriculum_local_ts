<template>
  <div>
    <div v-if="elements.length > 0">
      <ul>
        <div v-for="data in elements" v-bind:key="data.guid">
          {{ data.name }}
          <b-link
            v-if="!iconsHidden"
            :id="data.guid"
            @click="
              $bvModal.show(`edit-${data.componentDataType}-${data.guid}`)
            "
          >
            <b-icon icon="pencil-square" aria-hidden="true" />
          </b-link>
          <b-link
            v-if="!iconsHidden"
            :id="data.guid"
            @click="
              $bvModal.show(`delete-${data.componentDataType}-${data.guid}`)
            "
          >
            <b-icon icon="x-circle-fill" aria-hidden="true" />
          </b-link>
          <component-list-view
            :ref="data.guid"
            :iconsHidden="iconsHidden"
            :component-data="data.childrens"
            :childrens-title="data.childrensTitle"
            :component-data-type="data.componentDataType"
            :component-data-id="data.guid"
            @update="refresh($event)"
          />
          <delete-modal
            :modal-title="getModalTitle"
            :message="deleteModalMessage"
            :component-data="data"
            @remove="splice(data.guid)"
          />
          <edit-modal
            :modal-title="getModalTitle"
            :component-data="data"
            :component-data-type="data.componentDataType"
          />
        </div>
        <add-modal
          :guid="guid"
          :modal-title="getModalTitle"
          :component-data-type="componentDataType"
          @save="save($event)"
        />
      </ul>
    </div>
    <b-link
      v-if="!iconsHidden"
      :id="getGUID()"
      @click="$bvModal.show('add-modal')"
    >
      <b-icon icon="plus-circle-fill" aria-hidden="true" /> Añadir
      {{ getModalTitle }}
    </b-link>
  </div>
</template>

<script lang="ts">
import { Component } from "../../Config/types";
import EditModal from "../Modal/EditModal.vue";
import DeleteModal from "../Modal/DeleteModal.vue";

export default {
  name: "ComponentListView",
  components: {
    EditModal,
    DeleteModal,
  },
  props: {
    elements: {
      type: Array,
      required: true,
    },
    componentDataType: {
      type: String,
      required: true,
    },
    childrensTitle: {
      type: String,
      required: false,
    },
    iconsHidden: {
      type: Boolean,
      required: true,
    },
  },
  data(): any {
    return {
      element: "",
      deleteModalMessage: "la experiencia",
      modalTitle: "Experiencia",
      guid: crypto.randomUUID(),
    };
  },
  methods: {
    refresh(data: Component): void {
      this.$nextTick(() => {
        let filtered = this.elements.filter(
          (data: any) => data.guid !== data.guid
        );

        filtered.push(data);
        this.$emit("update", filtered);
      });
    },
    update(data: any): void {
      this.$nextTick(() => {
        this.$emit("update", data);
      });
    },
    splice(index: string): void {
      this.$emit(
        "update",
        this.elements.filter((data: any) => data.guid !== index)
      );
    },
    save(data: Component): void {
      this.elements.push(data);
    },
    formatDate(date: string): string {
      return new Date(date).toLocaleDateString();
    },
    getGUID(): void {
      this.$nextTick(() => {
        return this.guid;
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
      switch (this.componentDataType) {
        case "Academic":
          this.deleteModalMessage = "la formación";
          this.modalTitle = "Formación";
          break;

        case "Experience":
          this.deleteModalMessage = "la experiencia";
          this.modalTitle = "Experiencia";
          break;

        case "Languages":
          this.deleteModalMessage = "el idioma";
          this.modalTitle = "Idioma";
          break;

        case "Other":
          this.deleteModalMessage = "el elemento";
          this.modalTitle = "Elemento";
          break;

        case "Skills":
          this.deleteModalMessage = "la skill";
          this.modalTitle = "Skill";
          break;

        case "Description":
          this.deleteModalMessage = "la descripción";
          this.modalTitle = "Descripcion";
          break;

        case "Content":
          this.deleteModalMessage = "el contenido";
          this.modalTitle = "Contenido";
          break;

        case "Contract":
          this.deleteModalMessage = "el contrato";
          this.modalTitle = "Contrato";
          break;

        case "SubContent":
          this.deleteModalMessage = "el subcontenido";
          this.modalTitle = "SubContenido";
          break;

        case "Project":
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
