<template>
  <div v-if="!hide">
    <dt id="academica">
      Formación
      <b-link v-if="!iconsHidden" @click="(hide = true)">
        <b-icon icon="eye-slash-fill" />
      </b-link>
    </dt>
    <dd id="academic">
      <ul>
        <div v-for="academic in academicTrainingList" v-bind:key="academic.id">
          <li>
            {{ academic.name }}
            <b-link
              v-if="!iconsHidden"
              @click="$bvModal.show(`edit-training-${academic.id}`)"
            >
              <b-icon icon="pencil-square" aria-hidden="true" />
            </b-link>
            <b-link
              v-if="!iconsHidden"
              @click="$bvModal.show(`delete-training-${academic.id}`)"
            >
              <b-icon icon="x-circle-fill" aria-hidden="true" />
            </b-link>
            <academic-training-view
              :academic="academic"
              :iconsHidden="iconsHidden"
              :academicIndex="academic.id"
              @update="refresh($event)"
            />
          </li>
          <edit-modal 
            :modal-id="'training'"
            :modal-title="'formación'"
            :component-data="academic"
            :component-datatype="'Academic'"
            @update="update(academicTrainingList)"
          />
          <delete-modal 
            :modal-id="'training'"
            :modal-title="'Contrato'"
            :message="'la formación'"
            :component-data="academic"
            @remove="splice(academic.id)"
          />
        </div>
      </ul>
      <b-link v-if="!iconsHidden" @click="$bvModal.show('add-training')">
        <b-icon icon="plus-circle-fill" aria-hidden="true" /> Añadir formación
      </b-link>
    </dd>
    <dd class="clear"></dd>
    <add-modal 
      :component-datatype="'Academic'"
      :modal-id="'training'"
      :modal-title="'Formación'"
      @save="save($event)"
    />
  </div>
</template>

<script lang="ts">
import { Component } from "../../Config/types";
import AcademicTrainingView from "./AcademicTrainingView.vue";
import DeleteModal from "../Modal/DeleteModal.vue";
import AddModal from "../Modal/AddModal.vue";
import EditModal from "../Modal/EditModal.vue";

export default {
  name: "AcademicTrainingListView",
  components: {
    AcademicTrainingView,
    DeleteModal,
    AddModal,
    EditModal
  },
  props: {
    iconsHidden: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      hide: false,
      training: {} as Component,
      add: false,
      academicTrainingList: new Array<Component>(),
      index: 0,
    };
  },
  methods: {
    refresh(academic: Component) {
      this.$nextTick(() => {
        var filtered = this.academicTrainingList.filter(
          (data: any) => data.id !== academic.id
        );
        var training = this.academicTrainingList.find(
          (data: any) => data.id === academic.id
        );
        training = academic;
        filtered.push(training);
        this.academicTrainingList = filtered;
        this.$emit("update", this.academicTrainingList);
      });
    },
    splice(index: number) {
      this.$nextTick(() => {
        this.academicTrainingList = this.academicTrainingList.filter(
          (data: any) => data.id !== index
        );
        this.$emit("update", this.academicTrainingList);
      });
    },
    cancel() {
      this.training = {} as Component;
      this.add = false;
    },
    update(trainings: any) {
      this.$nextTick(() => {
        this.$emit('update', trainings);
      });
    },
    save(data: Component) {
      this.$nextTick(() => {
        this.academicTrainingList.push({
          id: this.index,
          name: data.name,
          place: data.place,
          graduationDate: data.graduationDate,
          childrens: new Array<Component>(),
        });
        this.index++;
        this.cancel();
        this.$emit("update", this.academicTrainingList);
      });
    },
  },
};
</script>
