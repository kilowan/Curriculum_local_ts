<template>
  <div>
    <div v-if="edit && !iconsHidden">
      <input type="text" v-model="academicData.name" />
      <SaveLink v-if="!iconsHidden" @click="edit = false"/>
      <DeleteLink @click="$emit('delete', academicData.guid)"/>
    </div>
    <div v-else>
      {{ academic.name }}
      <EditLink v-if="!iconsHidden" @click="edit = true"/>
      <DeleteLink @click="$emit('delete', academicData.guid)"/>
    </div>
    <ul>
      <li v-if="edit">
        <label>Centro/ Lugar:</label>
        <input type="text" v-model="academicData.place" />
      </li>
      <li v-else>Centro/ Lugar: {{ academicData.place }}</li>
      <div v-if="academicData.graduationDate">
        <li v-if="edit">
          <label>Graduación:</label>
          <input
            type="date"
            v-model="academicData.graduationDate"
            min="2015-01-01"
            max="2030-12-31"
          />
        </li>
        <li v-else>
          Graduación: {{ formatDate(academicData.graduationDate) }}
        </li>
      </div>
      <strong v-if="contents.length > 0" class="m-2">Contenido:</strong>
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
      <AddLink v-if="!iconsHidden && !add" :text="'contenido'" @click="add = true"/>
    </ul>
  </div>
</template>

<script lang="ts">
import ContentsView from "../Content/ContentListView.vue";
import { Component } from "../../Config/types";
import ELink from "@/components/ELink.vue";
import AddLink from "@/components/AddLink.vue";
import DeleteLink from "@/components/DeleteLink.vue";
import EditLink from "@/components/EditLink.vue";
import SaveLink from "@/components/SaveLink.vue";

export default {
  name: "AcademicTrainingView",
  components: {
    ContentsView,
    ELink,
    AddLink,
    DeleteLink,
    EditLink,
    SaveLink
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
    guid: {
      type: String,
      required: true,
    },
  },
  data(): any {
    return {
      academicData: {} as Component,
      contents: new Array<Component>(),
      add: false,
      element: "",
      edit: false,
    };
  },
  methods: {
    refresh(contents: Array<Component>): void {
      this.$nextTick(() => {
        this.academicData.childrens = contents;
        this.$emit("update", this.academicData);
      });
    },
    cancel(): void {
      this.element = "";
      this.add = false;
      this.edit = false;
    },
    save(content: string): void {
      this.$nextTick(() => {
        if (content !== "") {
          let data = new Component(crypto.randomUUID(), content);
          this.academicData.childrens.push(data);
          this.contents.push(data);
        }

        this.element = "";
        this.add = false;
        this.edit = false;
        this.$emit("update", this.academicData);
      });
    },
    formatDate(date: string): number {
      return new Date(date).getFullYear();
    },
  },
  mounted(): void {
    this.academicData = this.academic;
    this.$refs.contents._data.contentsData = this.academicData.childrens;
  },
};
</script>
