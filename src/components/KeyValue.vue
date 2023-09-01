<template>
  <div v-if="field != undefined">
    <label>{{ field }}: </label>
    <b-form-select
      v-if="type == 2"
      :disabled="disabled"
      :options="options"
      v-model="value.value"
    >
    </b-form-select>
    <input v-if="type == 1" type="text" v-model="value.value" />
    <input
      v-if="type == 3"
      type="date"
      v-model="value.value"
      min="2015-01-01"
      max="2030-12-31"
    />
    <b-form-datepicker
      v-if="type == 4"
      v-model="value.value"
      min="2015-01-01"
      max="2030-12-31"
    ></b-form-datepicker>
  </div>
</template>

<script lang="ts">
import { FieldValue } from '@/Config/Base/FieldValue/FieldValue';

export default {
  name: "KeyValue",
  data(): any {
    return {};
  },
  components: {},
  props: {
    field: {
      type: String,
      required: true,
    },
    value: {
      type: FieldValue,
      required: true,
    },
    type: {
      type: Number,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      required: false,
    },
  },
};
</script>
