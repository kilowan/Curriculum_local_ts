<template>
    <b-modal
    :id="`add-${guid}`"
    :title="`Añadir ${modalTitle}`"
    ok-title="Guardar"
    @ok="save"
    @cancel="cancel"
  >
    <label>Nombre</label> <input type="text" v-model="newComponent.name" /> <br />
    <label v-if="componentDatatype === 'Language'">Nivel</label> 
    <input v-if="componentDatatype === 'Language'" type="text" v-model="newComponent.level" /> <br />
    <label v-if="componentDatatype === 'Academic' || componentDatatype === 'Experience'">Centro/Lugar:</label>
    <input v-if="componentDatatype === 'Academic' || componentDatatype === 'Experience'" type="text" v-model="newComponent.place" /> <br />
    <label v-if="componentDatatype === 'Experience'">Fecha de inicio</label>
    <input v-if="componentDatatype === 'Experience'" type="date" v-model="newComponent.initDate" min="2015-01-01" max="2030-12-31" />
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
    componentDatatype: {
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
        var component: Component = { 
          name: this.newComponent.name, 
          guid: crypto.randomUUID(), 
          componentDataType: this.componentDatatype, 
          place: this.newComponent?.place, 
          initDate: this.newComponent?.initDate, 
          finishDate: this.newComponent?.finishDate 
        };
        this.cancel();
        this.$emit('save', component);
      });
    }
  }
};
</script>
