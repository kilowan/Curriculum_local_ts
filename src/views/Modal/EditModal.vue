<template>
  <b-modal
    :id="`edit-${modalId}-${componentData.identifier !== undefined? componentData.identifier: componentData.id}`"
    :title="`Editar ${modalTitle}`"
    ok-title="Guardar"
    @ok="$emit('update', componentData)"
  >
    <label>Nombre:</label>
    <input type="text" v-model="componentData.name" /> <br />
    <label v-if="componentDatatype === 'Academic' || componentDatatype === 'Experience'">Centro/Lugar:</label>
    <input v-if="componentDatatype === 'Academic' || componentDatatype === 'Experience'" type="text" v-model="componentData.place" /> <br />
    <label v-if="componentDatatype === 'Experience'">Fecha de inicio</label>
    <input v-if="componentDatatype === 'Experience'" type="date" v-model="componentData.initDate" min="2015-01-01" max="2030-12-31" />
    <br />
    <label v-if="componentDatatype === 'Experience'">Fecha de fin</label>
    <input
      v-if="componentDatatype === 'Experience'"
      type="date"
      v-model="componentData.finishDate"
      min="2015-01-01"
      max="2030-12-31"
    />
    <div v-if="componentDatatype === 'Academic'">
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

export default {
  name: "EditModal",
  props: {
    componentData: {
      type: Object,
      required: true,
    },
    modalId: {
      type: String,
      required: true
    },
    modalTitle: {
      type: String,
      required: true
    },
    componentDatatype: {
      type: String,
      required: true,
    }
  },
  data() {
    return {};
  },
};
</script>
