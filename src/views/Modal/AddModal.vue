<template>
  <b-modal
    :id="`add-${getModalId}`"
    :title="`Añadir ${modalTitle}`"
    ok-title="Guardar"
    @ok="save"
    @cancel="cancel"
  >
    <label>Nombre</label> <input type="text" v-model="newComponent.name" />
    <br />
    <label v-if="componentDatatype === 'Language'">Nivel</label>
    <input
      v-if="componentDatatype === 'Language'"
      type="text"
      v-model="newComponent.level"
    />
    <br />
    <label
      v-if="
        componentDatatype === 'Academic' || componentDatatype === 'Experience'
      "
      >Centro/Lugar:</label
    >
    <input
      v-if="
        componentDatatype === 'Academic' || componentDatatype === 'Experience'
      "
      type="text"
      v-model="newComponent.place"
    />
    <br />
    <label v-if="componentDatatype === 'Experience'">Fecha de inicio</label>
    <input
      v-if="componentDatatype === 'Experience'"
      type="date"
      v-model="newComponent.initDate"
      min="2015-01-01"
      max="2030-12-31"
    />
    <br />
    <label v-if="componentDatatype === 'Experience'">Fecha de fin</label>
    <input
      v-if="componentDatatype === 'Experience'"
      type="date"
      v-model="newComponent.finishDate"
      min="2015-01-01"
      max="2030-12-31"
    />
    <label v-if="componentDatatype === 'Academic'">Graduación</label>
    <input
      v-if="componentDatatype === 'Academic'"
      type="date"
      v-model="newComponent.graduationDate"
      min="2015-01-01"
      max="2030-12-31"
    />
    <br />
  </b-modal>
</template>

<script lang="ts">
import { Component, ComponentType } from "@/Config/types";

export default {
  name: "AddModal",
  props: {
    modalTitle: {
      type: String,
      required: true,
    },
    modalId: {
      type: String,
      required: true,
    },
    componentDatatype: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      newComponent: {} as Component,
    };
  },
  computed: {
    getModalId() {
      return this.modalId;
    },
  },
  methods: {
    cancel() {
      this.newComponent = {} as Component;
    },
    save() {
      //this.$nextTick(() => {
        this.newComponent.componentDataType = this.componentDatatype;
        //this.newComponent.id = this.getIdentifier();
        this.newComponent.childrens = new Array<Component>();
        this.$emit("save", this.newComponent);
      //this.newComponent = {} as Component;
      //});
    },
    /*getIdentifier() {
      let id = parseInt(this.$store.state.identifier.toString());
      this.$store.state.identifier++;
      return id;
    },*/
  },
};
</script>
