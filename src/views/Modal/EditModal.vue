<template>
  <b-modal
    v-if="componentData != undefined"
    :id="`edit-${componentData.guid}`"
    :title="`Editar ${modalTitle}`"
    ok-title="Guardar"
  >
    <label>Nombre:</label>
    <input type="text" v-model="componentData.name" /> <br />
    <label v-if="componentData.level != undefined">Nivel:</label>
    <input v-if="componentData.level != undefined" type="text" v-model="componentData.level"/>
    <label v-if="componentData.place != undefined">Centro/Lugar:</label>
    <input v-if="componentData.place != undefined" type="text" v-model="componentData.place"/>
    <br />
    <label v-if="componentData.initDate != undefined">Fecha de inicio</label>
    <input
      v-if="componentData.initDate != undefined"
      type="date"
      v-model="componentData.initDate"
      min="2015-01-01"
      max="2030-12-31"
    />
    <br />
    <label v-if="componentData.finishDate != undefined">Fecha de fin</label>
    <input
      v-if="componentData.finishDate != undefined"
      type="date"
      v-model="componentData.finishDate"
      min="2015-01-01"
      max="2030-12-31"
    />
    <div v-if="componentData.graduationDate != undefined">
      <label>Graduación:</label>
      <b-form-datepicker
        v-model="componentData.graduationDate"
        min="2015-01-01"
        max="2030-12-31"
      ></b-form-datepicker>
      <br />
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component } from "../../Config/types";
export default {
  name: "EditModal",
  props: {
    componentData: {
      type: Component,
      required: true,
    },
    modalTitle: {
      type: String,
      required: true,
    }
  },
  data(): any {
    return {};
  },
};
</script>
