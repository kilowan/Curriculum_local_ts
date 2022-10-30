<template>
  <div>
    <ul>
      <div
        v-for="description in projectData.childrens"
        v-bind:key="description.id"
      >
        <li>
          {{ description.name }}
          <b-link
            v-if="!iconsHidden"
            @click="$bvModal.show(`edit-description-${description.id}`)"
          >
            <b-icon icon="pencil-square" aria-hidden="true" />
          </b-link>
          <b-link
            v-if="!iconsHidden"
            @click="$bvModal.show(`delete-description-${description.id}`)"
          >
            <b-icon icon="x-circle-fill" aria-hidden="true" />
          </b-link>
        </li>
        <EditModal 
          :modal-id="'description'"
          :modal-title="'descripción'"
          :component-data="description"
          :component-datatype="'Description'"
          @cancel="cancel"
        />
        <DeleteModal 
          :modal-id="'description'"
          :modal-title="'Descripción'"
          :component-data="description"
          :message="'la descripción'"
          @remove="splice(description.id)"
        />
      </div>
    </ul>
    <div v-if="add">
      <input type="text" v-model="desc" />
      <b-button @click="save(desc)">Guardar</b-button>
      <b-button @click="cancel">Cancelar</b-button>
    </div>
    <b-link v-if="!add && !iconsHidden" @click="add = true">
      <b-icon icon="plus-circle-fill" aria-hidden="true" /> Añadir descripción
    </b-link>
  </div>
</template>

<script lang="ts">
import { Component } from "../../Config/types";
import EditModal from "../Modal/EditModal.vue";
import DeleteModal from "../Modal/DeleteModal.vue";

export default {
  name: "ProjectView",
  components: {
    EditModal,
    DeleteModal
  },
  props: {
    project: {
      type: Object,
      required: true,
    },
    iconsHidden: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      index: 0,
      add: false,
      description: "",
      desc: "",
      descriptions: new Array<Component>(),
      projectData: {} as Component,
    };
  },
  methods: {
    cancel() {
      this.add = false;
    },
    save(description: string) {
      this.$nextTick(() => {
        this.descriptions.push({
          id: this.index,
          name: description,
        });
        this.projectData.childrens.push({
          id: this.index,
          name: description,
        });
        this.index++;
        this.add = false;
        this.desc = "";
        this.$emit("update", this.projectData);
      });
    },
    splice(index: number) {
      this.projectData.childrens =
        this.projectData.childrens.filter(
          (data: any) => data.id !== index
        );
      this.descriptions = this.descriptions.filter(
        (data: any) => data.id !== index
      );
      this.$emit("update", this.projectData);
    },
  },
  mounted() {
    this.projectData = this.project;
  },
};
</script>
