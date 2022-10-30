<template>
  <div>
    <div v-if="componentData.length >0">
        <div v-if="childrensTitle !== undefined">{{ childrensTitle }}:</div>
        <ul>
          <div v-for="data in componentData" v-bind:key="data.id">
            <li>
              {{ data.name }}
              <b-link
                v-if="!iconsHidden"
                @click="$bvModal.show(`edit-${modalId}-${data.id}`)"
              >
                <b-icon icon="pencil-square" aria-hidden="true" />
              </b-link>
              <b-link
                v-if="!iconsHidden"
                @click="$bvModal.show(`delete-${modalId}-${data.id}`)"
              >
                <b-icon icon="x-circle-fill" aria-hidden="true" />
              </b-link>
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
              <ul>
                <li>Centro/Lugar: {{ data.place }}</li>
                <li>
                  Fecha inicio: {{ formatDate(data.initDate) }}
                </li>
                <li v-if="data.finishDate">
                  Fecha Fin: {{ formatDate(data.finishDate) }}
                </li>
              </ul>
            </li>

            <delete-modal 
              :modal-id="`delete-${modalId}-${data.id}`"
              :modal-title="`Eliminar ${modalTitle}`"
              :message="`¿Seguro que quieres eliminar ${deleteModalMessage} ${data.name}?`"
              :component-data="data.id"
              @remove="splice(data.id)"
            />
            <edit-modal
              :modal-id="'experience'"
              :modal-title="modalTitle"
              :component-data="data"
              @update="refresh($event)"
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
      index: 0
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
      var pushed = this.componentData;
      this.index++;
      pushed.push(data);
      this.$emit("update", pushed);
    },
    formatDate(date: any) {
      return new Date(date).toLocaleDateString();
    }
  },
  mounted() {  
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
        this.modalTitle = "Description";
        this.modalId = "description";
        break;

      case 'Content':
        this.deleteModalMessage = "el contenido";
        this.modalTitle = "Content";
        this.modalId = "content";
        break;

      case 'Contract':
        this.deleteModalMessage = "el contrato";
        this.modalTitle = "Contract";
        this.modalId = "contract";
        break;

      case 'SubContent':
        this.deleteModalMessage = "el subcontenido";
        this.modalTitle = "SubContent";
        this.modalId = "subContent";
        break;

      default:
        break;
    }
    this.$nextTick(() => {
      if(this.componentData.length > 0)this.$refs[this.modalId]._data.componentData = this.componentData;
      this.index = this.componentData.length === 0 || this.componentData === undefined || this.componentData === null? 0 : this.componentData.length-1;
      this.$forceUpdate();
    });
  },
};
</script>
