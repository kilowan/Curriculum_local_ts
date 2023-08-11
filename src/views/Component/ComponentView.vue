<template>
  <div>
    <li v-if="childrensTitle !== undefined">{{ childrensTitle }}:</li>
    <div v-if="componentData.length >0">
        <ul>
          <div v-for="data in componentData" v-bind:key="data.guid">
                <li>
                  {{ data.name }}
              <b-link
                v-if="!iconsHidden"
                @click="$bvModal.show(`edit-${data.guid}`)"
              >
                <b-icon icon="pencil-square" aria-hidden="true" />
              </b-link>
              <b-link
                v-if="!iconsHidden"
                @click="$bvModal.show(`delete-${data.guid}`)"
              >
                <b-icon icon="x-circle-fill" aria-hidden="true" />
              </b-link>
              <ul>
                <li v-if="componentDataType === 'Academic' || componentDataType === 'Experience'">Centro/Lugar: {{ data.place }}</li>
                <li v-if="componentDataType === 'Experience'">
                  Fecha inicio: {{ formatDate(data.initDate) }}
                </li>
                <li v-if="data.finishDate">
                  Fecha Fin: {{ formatDate(data.finishDate) }}
                </li>
                <div>
                  <component-view
                    :ref="data.guid"
                    :iconsHidden="iconsHidden"
                    :component-data="data.childrens"
                    :childrens-title="data.childrensTitle"
                    :component-data-type="data.componentDataType"
                    :component-data-id="data.guid"
                    @update="refresh($event)"
                  />
                </div>
              </ul>
            </li>

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
    <b-link v-if="!iconsHidden" @click="$bvModal.show(`add-${getGUID()}`)">
      <b-icon icon="plus-circle-fill" aria-hidden="true" /> Añadir {{ getModalTitle }}
    </b-link>
  </div>
</template>

<script lang="ts">
import { Component, ComponentType } from "../../Config/types";
import AddModal from "../Modal/AddModal.vue";
import EditModal from "../Modal/EditModal.vue";
import DeleteModal from "../Modal/DeleteModal.vue";

export default {
  name: "ComponentView",
  components: {
    AddModal,
    EditModal,
    DeleteModal
  },
  props: {
    componentData: {
      type: Array<Component>,
      required: true,
    },
    guid: {
      type: String,
      required: true
    },
    componentDataType: {
      type: String,
      required: true
    },
    childrensTitle: {
      type: String,
      required: false
    },
    iconsHidden: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      element: "",
      deleteModalMessage: "la experiencia",
      modalTitle: "Experiencia",
      guid: crypto.randomUUID()
    };
  },
  methods: {
    refresh(data: Component) {
      this.$nextTick(() => {
        var filtered = this.componentData.filter(
          (data: any) => data.guid !== data.guid
        );

        filtered.push(data);
        this.$emit("update", filtered);
      });
    },
    update(data: any) {
      this.$nextTick(() => {
        this.$emit('update', data);
      });
    },
    splice(index: string) {
      this.$emit("update", this.componentData.filter(
        (data: any) => data.guid !== index
      ));
    },
    save (data: Component){
      this.componentData.push(data);
    },
    formatDate(date: any) {
      return new Date(date).toLocaleDateString();
    },
    getGUID() {
      return crypto.randomUUID();
    },
  },
  computed: {
    getModalTitle() {
      return this.modalTitle;
    },

  },
  created() {
    this.$nextTick(() => {
    switch (this.componentDataType) {
      case 'Academic':
        this.deleteModalMessage = "la formación";
        this.modalTitle = "Formación";
        this.guid = crypto.randomUUID()
        break;

      case 'Experience':
        this.deleteModalMessage = "la experiencia";
        this.modalTitle = "Experiencia";
        this.guid = crypto.randomUUID()
        break;

      case 'Languages':
        this.deleteModalMessage = "el idioma";
        this.modalTitle = "Idioma";
        this.guid = crypto.randomUUID()
        break;

      case 'Other':
        this.deleteModalMessage = "el elemento";
        this.modalTitle = "Elemento";
        this.guid = crypto.randomUUID()
        break;

      case 'Skills':
        this.deleteModalMessage = "la skill";
        this.modalTitle = "Skill";
        this.guid = crypto.randomUUID()
        break;

      case 'Description':
        this.deleteModalMessage = "la descripción";
        this.modalTitle = "Descripcion";
        this.guid = crypto.randomUUID()
        break;

      case 'Content':
        this.deleteModalMessage = "el contenido";
        this.modalTitle = "Contenido";
        this.guid = crypto.randomUUID()
        break;

      case 'Contract':
        this.deleteModalMessage = "el contrato";
        this.modalTitle = "Contrato";
        this.guid = crypto.randomUUID()
        break;

      case 'SubContent':
        this.deleteModalMessage = "el subcontenido";
        this.modalTitle = "SubContenido";
        this.guid = crypto.randomUUID()
        break;

      case 'Project':
        this.deleteModalMessage = "el proyecto";
        this.modalTitle = "Proyecto";
        this.guid = crypto.randomUUID()
        break;

      default:
        break;
    }
  });
    this.$forceUpdate();
  },
};
</script>
