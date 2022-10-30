<template>
  <div>
    <div v-if="componentData.length >0">
        <ul>
          <div v-for="data in componentData" v-bind:key="data.identifier">
                <li>
                  {{ data.name }}
              <b-link
                v-if="!iconsHidden"
                @click="$bvModal.show(`edit-${modalId}-${data.identifier}`)"
              >
                <b-icon icon="pencil-square" aria-hidden="true" />
              </b-link>
              <b-link
                v-if="!iconsHidden"
                @click="$bvModal.show(`delete-${modalId}-${data.identifier}`)"
              >
                <b-icon icon="x-circle-fill" aria-hidden="true" />
              </b-link>
              <ul>
                <li v-if="componentDatatype === 'Academic' || componentDatatype === 'Experience'">Centro/Lugar: {{ data.place }}</li>
                <li v-if="componentDatatype === 'Experience'">
                  Fecha inicio: {{ formatDate(data.initDate) }}
                </li>
                <li v-if="data.finishDate">
                  Fecha Fin: {{ formatDate(data.finishDate) }}
                </li>
                <li v-if="childrensTitle !== undefined">{{ childrensTitle }}:</li>
                <div>
                  <component-view
                    :name="data.componentDataType"
                    :ref="modalId"
                    :iconsHidden="iconsHidden"
                    :component-data="data.childrens"
                    :childrens-title="data.childrensTitle"
                    :component-datatype="data.componentDataType"
                    @update="refresh($event)"
                  />
                </div>
              </ul>
            </li>

            <delete-modal 
              :modal-id="modalId"
              :modal-title="modalTitle"
              :message="deleteModalMessage"
              :component-data="data"
              @remove="splice(data.identifier)"
            />
            <edit-modal
              :modal-id="modalId"
              :modal-title="modalTitle"
              :component-data="data"
              :component-datatype="componentDatatype"
            />
          </div>
          <add-modal
            :modal-id="modalId"
            :modal-title="modalTitle"
            :component-datatype="componentDatatype"
            @save="save($event)"
          />
        </ul>
      </div>
    <b-link v-if="!iconsHidden" @click="$bvModal.show(`add-${modalId}`)">
      <b-icon icon="plus-circle-fill" aria-hidden="true" /> Añadir {{ modalTitle }}
    </b-link>
  </div>
</template>

<script lang="ts">
import { Component } from "../../Config/types";
import AddModal from "../Modal/AddModal.vue";
import EditModal from "../Modal/EditModal.vue";
import DeleteModal from "../Modal/DeleteModal.vue";
import Vue from "vue";

export default {
  name: "ComponentView",
  components: {
    AddModal,
    EditModal,
    DeleteModal
  },
  props: {
    componentData: {
      type: Array,
      required: true,
    },
    componentDatatype: {
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
      modalId: "experience",
      index: '1'
    };
  },
  methods: {
    refresh(data: Component) {
      this.$nextTick(() => {
        var filtered = this.componentData.filter(
          (data: any) => data.id !== data.id
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
    splice(index: number) {
      this.$emit("update", this.componentData.filter(
        (data: any) => data.id !== index
      ));
    },
    save (data: Component){
      this.componentData.push(data);
      var identifier :number = parseInt(this.index);
      identifier++;
      this.index = identifier.toString();
    },
    formatDate(date: any) {
      return new Date(date).toLocaleDateString();
    }
  },
  created() {
    switch (this.componentDatatype) {
      case 'Academic':
        this.deleteModalMessage = "la formación";
        this.modalTitle = "Formación";
        this.modalId = "training";
        break;

      case 'Experience':
        this.deleteModalMessage = "la experiencia";
        this.modalTitle = "Experiencia";
        this.modalId = "experience";
        break;

      case 'Languages':
        this.deleteModalMessage = "el idioma";
        this.modalTitle = "Idioma";
        this.modalId = "language";
        break;

      case 'Other':
        this.deleteModalMessage = "el elemento";
        this.modalTitle = "Elemento";
        this.modalId = "other";
        break;

      case 'Skills':
        this.deleteModalMessage = "la skill";
        this.modalTitle = "Skill";
        this.modalId = "skill";
        break;

      case 'Description':
        this.deleteModalMessage = "la descripción";
        this.modalTitle = "Descripcion";
        this.modalId = "description";
        break;

      case 'Content':
        this.deleteModalMessage = "el contenido";
        this.modalTitle = "Contenido";
        this.modalId = "content";
        break;

      case 'Contract':
        this.deleteModalMessage = "el contrato";
        this.modalTitle = "Contrato";
        this.modalId = "contract";
        break;

      case 'SubContent':
        this.deleteModalMessage = "el subcontenido";
        this.modalTitle = "SubContenido";
        this.modalId = "subContent";
        break;

      default:
        break;
    }
    this.$forceUpdate();
  },
  mounted() {
    this.$nextTick(() => {
      if(this.componentData.length > 0)this.$refs[this.modalId]._data.componentData = this.componentData;
      if(this.componentData.length === 0 || this.componentData === undefined || this.componentData === null) {
        this.index = '1'
      } else {
        var sorted = this.componentData.sort((a: any, b: any) => {
            return a.id - b.id;
        });
        var last: Component = sorted[sorted.length - 1];
        this.index = last.identifier;
      }
    });
  },
};
</script>
