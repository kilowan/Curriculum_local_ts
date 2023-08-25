<template>
  <div v-if="!hide">
    <dt :id="input.dtId">
      {{ input.name }}
      <HideLink v-if="!iconsHidden" @click="hide = true"/>
    </dt>
    <dd :id="input.ddId">
      <ul v-if="input != undefined">
        <div
          v-for="academic in input.childrens"
          v-bind:key="academic.guid"
        >
          <li>
            <academic-training-view
              :guid="academic.guid"
              :input="academic"
              :iconsHidden="iconsHidden"
              :academicIndex="academic.guid"
              @delete="$bvModal.show(`delete-${$event}`)"
              @reload="$emit('update', input)"
            />
          </li>
          <delete-modal
            :modalTitle="getModalTitle"
            :message="deleteModalMessage"
            :componentData="academic"
            @remove="splice(academic)"
          />
        </div>
      </ul>
      <AddLink v-if="!iconsHidden" :text="getModalTitle" @click="$bvModal.show(`add-${input.guid}`)"/>
    </dd>
    <dd class="clear"></dd>
    <AddNewModal
      :guid="input.guid"
      :componentDataType="input.childrensDataType"
      @save="save($event)"
    />
  </div>
</template>

<script lang="ts">
import AcademicTrainingView from "./AcademicTrainingView.vue";
import AddLink from "@/components/AddLink.vue";
import HideLink from "@/components/HideLink.vue";
import DeleteModal from "../Modal/DeleteModal.vue";
import AddNewModal from "../Modal/AddNewModal.vue";
import { TrainingModule } from "@/Config/Training/Module/TrainingModule";
import { ComponentType } from "@/Config/Base/Enums";
import { Training } from "@/Config/Training/Training";

export default {
  name: "AcademicTrainingListView",
  components: {
    AcademicTrainingView,
    AddLink,
    HideLink,
    DeleteModal,
    AddNewModal
},
  props: {
    iconsHidden: {
      type: Boolean,
      required: true,
    },
    input: {
      type: TrainingModule,
      required: true
    }
  },
  data(): any {
    return {
      hide: false,
      deleteModalMessage: "la experiencia",
      modalTitle: "Experiencia",
      guid: crypto.randomUUID(),
    };
  },
  methods: {
    splice(element: Training): void {
      this.input.childrens.splice(this.input.childrens.indexOf(element), 1);
      this.$emit("update", this.input);
    },
    save(input: Training): void {
      this.$nextTick(() => {
        this.input.childrens.push(input);
        this.$emit("update", this.input);
      });
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
