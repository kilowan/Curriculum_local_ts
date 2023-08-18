<template>
  <div v-if="!hide">
    <dt id="academica">
      Formación
      <b-link v-if="!iconsHidden" @click="hide = true">
        <b-icon icon="eye-slash-fill" />
      </b-link>
    </dt>
    <dd id="academic">
      <ul>
        <div
          v-for="academic in academicTrainingList"
          v-bind:key="academic.guid"
        >
          <li>
            <academic-training-view
              :guid="academic.guid"
              :academic="academic"
              :iconsHidden="iconsHidden"
              :academicIndex="academic.guid"
              @update="refresh($event)"
              @delete="$bvModal.show(`delete-${$event}`)"
            />
          </li>
          <b-modal
            :id="`delete-${academic.guid}`"
            :title="'Eliminar formación'"
            ok-title="Eliminar"
            @ok="splice(academic.guid)"
          >
            <div style="text-align: center; margin: 0 auto; width: 380px">
              <h1>
                ¿Seguro que quieres eliminar la formación {{ academic.name }}?
              </h1>
            </div>
          </b-modal>
        </div>
      </ul>
      <b-link
        :id="guid"
        v-if="!iconsHidden"
        @click="$bvModal.show('add-academic-modal')"
      >
        <b-icon icon="plus-circle-fill" aria-hidden="true" /> Añadir formación
      </b-link>
    </dd>
    <dd class="clear"></dd>
    <b-modal
      :id="'add-academic-modal'"
      :title="`Añadir Formación`"
      ok-title="Guardar"
      @ok="save"
      @cancel="cancel"
    >
      <label>Nombre</label> <input type="text" v-model="newComponent.name" />
      <br />
      <label>Centro/Lugar:</label>
      <input type="text" v-model="newComponent.place" /> <br />
      <label>Graduación</label>
      <input
        type="date"
        v-model="newComponent.graduationDate"
        min="2015-01-01"
        max="2030-12-31"
      />
      <br />
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component } from "../../Config/types";
import AcademicTrainingView from "./AcademicTrainingView.vue";

export default {
  name: "AcademicTrainingListView",
  components: {
    AcademicTrainingView,
  },
  props: {
    iconsHidden: {
      type: Boolean,
      required: true,
    },
  },
  data(): any {
    return {
      hide: false,
      training: {} as Component,
      add: false,
      academicTrainingList: new Array<Component>(),
      guid: crypto.randomUUID(),
      newComponent: {} as Component,
    };
  },
  methods: {
    refresh(academic: Component): void {
      this.$nextTick(() => {
        let filtered = this.academicTrainingList.filter(
          (data: any) => data.guid !== academic.guid
        );
        let training = this.academicTrainingList.find(
          (data: any) => data.guid === academic.guid
        );
        training = academic;
        filtered.push(training);
        this.academicTrainingList = filtered;
        this.$emit("update", this.academicTrainingList);
      });
    },
    splice(index: string): void {
      this.$nextTick(() => {
        this.academicTrainingList = this.academicTrainingList.filter(
          (data: any) => data.guid !== index
        );
        this.$emit("update", this.academicTrainingList);
      });
    },
    cancel(): void {
      this.training = {} as Component;
      this.add = false;
    },
    update(trainings: Array<Component>): void {
      this.$nextTick(() => {
        this.$emit("update", trainings);
      });
    },
    save(): void {
      this.$nextTick(() => {
        let component = new Component(
          crypto.randomUUID(),
          this.newComponent.name
        );
        component.componentDataType = "Academic";
        component.place = this.newComponent?.place;
        component.initDate = this.newComponent?.initDate;
        component.finishDate = this.newComponent?.finishDate;
        component.graduationDate = this.newComponent?.graduationDate;
        this.academicTrainingList.push(component);
        this.cancel();
        this.$emit("update", this.academicTrainingList);
      });
    },
  },
};
</script>
