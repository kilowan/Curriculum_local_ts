<template>
  <b-modal :id="`add-${guid}`" :title="`Añadir ${modalTitle}`" ok-title="Guardar" @ok="save" @cancel="cancel">
    <label>Nombre</label> <input type="text" v-model="newComponent.name" /> <br />
    <label v-if="componentDataType === 'Language'">Nivel</label>
    <input v-if="componentDataType === 'Language'" type="text" v-model="newComponent.level" /> <br />
    <label v-if="componentDataType === 'Academic' || componentDataType === 'Experience'">Centro/Lugar:</label>
    <input v-if="componentDataType === 'Academic' || componentDataType === 'Experience'" type="text"
      v-model="newComponent.place" /> <br />
    <label v-if="componentDataType === 'Experience'">Fecha de inicio</label>
    <input v-if="componentDataType === 'Experience'" type="date" v-model="newComponent.initDate" min="2015-01-01"
      max="2030-12-31" />
    <br />
    <label v-if="componentDataType === 'Experience'">Fecha de fin</label>
    <input v-if="componentDataType === 'Experience'" type="date" v-model="newComponent.finishDate" min="2015-01-01"
      max="2030-12-31" />
    <label v-if="componentDataType === 'Academic'">Graduación</label>
    <input v-if="componentDataType === 'Academic'" type="date" v-model="newComponent.graduationDate" min="2015-01-01"
      max="2030-12-31" />
    <br />
  </b-modal>
</template>

<script lang="ts">
import { Component } from "@/Config/types";

export default {
  name: "AddModal",
  props: {
    modalTitle: {
      type: String,
      required: true,
    },
    guid: {
      type: String,
      required: true,
    },
    componentDataType: {
      type: String,
      required: true,
    },
    ComponentDataId: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      newComponent: {} as Component
    };
  },
  methods: {
    cancel() {
      this.newComponent = {} as Component;
    },
    save() {
      this.$nextTick(() => {
        let component = new Component(crypto.randomUUID(), this.newComponent.name);
        component.componentDataType = this.componentDataType;
        component.place = this.newComponent?.place;
        component.initDate = this.newComponent?.initDate;
        component.finishDate = this.newComponent?.finishDate;
        this.cancel();
        this.$emit('save', component);
      });
    }
  }
};
</script>
