<template>
  <ul>
    <li>Centro/ Lugar: {{ academicData.place }}</li>
    <li v-if="academicData.graduationDate">
      Graduación: {{ formatDate(academicData.graduationDate) }}
    </li>
      <strong  v-if="contents.length > 0" class="m-2">Contenido:</strong>
      <contents-view
        :ref="'contents'"
        :contents="contents"
        :iconsHidden="iconsHidden"
        @update="refresh($event)"
      />
    <div v-if="add">
      <input class="m-2" type="text" v-model="element" />
      <b-button class="m-2" @click="save(element)">Guardar</b-button>
      <b-button class="m-2" @click="cancel">Cancelar</b-button>
    </div>
    <b-link v-if="!iconsHidden && !add" @click="add = true">
      <b-icon icon="plus-circle-fill" aria-hidden="true" /> Añadir contenido
    </b-link>
  </ul>
</template>

<script lang="ts">
import ContentsView from "../Content/ContentListView.vue";
import { Component } from "../../Config/types";

export default {
  name: "AcademicTrainingView",
  components: {
    ContentsView,
  },
  props: {
    academic: {
      type: Object,
      required: true,
    },
    iconsHidden: {
      type: Boolean,
      required: true,
    },
    academicIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      academicData: {} as Component,
      contents: new Array<Component>(),
      add: false,
      element: "",
      index: 0,
    };
  },
  methods: {
    refresh(contents: Array<Component>) {
      this.$nextTick(() => {
        this.academicData.childrens = contents;
        this.$emit("update", this.academicData);
      });
    },
    cancel() {
      this.element = "";
      this.add = false;
    },
    save(content: any) {
      this.$nextTick(() => {
        if (content !== "") {
          var cont: Component = {
            id: this.index,
            name: content,
            childrens: new Array<Component>(),
          };
          this.academicData.childrens.push(cont);
          this.contents.push(cont);
        }

        this.element = "";
        this.add = false;
        this.index++;
        this.$emit("update", this.academicData);
      });
    },
    formatDate(date: any) {
      return new Date(date).getFullYear();
    }
  },
  mounted() {
    this.academicData = this.academic;
    this.$refs.contents._data.contentsData = this.academicData.childrens;
    this.index = this.academicData.childrens.length === 0 || this.academicData.childrens === undefined || this.academicData.childrens === null? 0 : this.academicData.childrens.length-1;
  },
};
</script>
