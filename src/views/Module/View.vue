<template>
  <ul v-if="input != undefined">
    <li v-if="input.place">Centro/Lugar: {{ input.place }}</li>
    <li v-if="input.initDate">Fecha inicio: {{ formatDate(input.initDate) }}</li>
    <li v-if="input.finishDate">Fecha Fin: {{ formatDate(input.finishDate) }}</li>
    <li v-if="input.graduationDate">Graduación: {{ formatDate(input.graduationDate) }}</li>
    <!--list-->
    <!--<List
      :elements="company.childrens"
    />-->
    <!--<contract-list-view
      :contracts="input.childrens"
      :iconsHidden="iconsHidden"
      @reload="$emit('reload')"
    />-->
  </ul>
</template>

<script lang="ts">
import { Component } from '@/Config/Base/Component/Component';


export default {
  name: "View",
  props: {
    iconsHidden: {
      type: Boolean,
      required: true
    },
    input: {
      type: Component,
      required: true
    }
  },
  data(): any {
    return {
    };
  },
};
</script>
