<template>
  <b-modal
    :id="`edit-${componentData.guid}`"
    :title="`Editar ${modalTitle}`"
    ok-title="Guardar"
    @ok="$emit('update', componentData)"
  >
    <label>Nombre:</label>
    <input type="text" v-model="componentData.name" /> <br />
    <label v-if="componentDataType === 'Academic' || componentDataType === 'Experience'">Centro/Lugar:</label>
    <input v-if="componentDataType === 'Academic' || componentDataType === 'Experience'" type="text" v-model="componentData.place" /> <br />
    <label v-if="componentDataType === 'Experience'">Fecha de inicio</label>
    <input v-if="componentDataType === 'Experience'" type="date" v-model="componentData.initDate" min="2015-01-01" max="2030-12-31" />
    <br />
    <label v-if="componentDataType === 'Experience'">Fecha de fin</label>
    <input
      v-if="componentDataType === 'Experience'"
      type="date"
      v-model="componentData.finishDate"
      min="2015-01-01"
      max="2030-12-31"
    />
    <div v-if="componentDataType === 'Academic'">
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
    modalTitle: {
      type: String,
      required: true
    },
    componentDataType: {
      type: String,
      required: true,
    }
  },
  data() {
    return {};
  },
};
</script>
