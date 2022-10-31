<template>
  <div v-if="!hide">
    <dt id="academica">
      Formación
      <b-link v-if="!iconsHidden" @click="(hide = true)">
        <b-icon icon="eye-slash-fill" />
      </b-link>
    </dt>
    <dd id="academic">
      <component-view 
        :name="'Academic'"
        :component-data="academicTrainingList"
        :component-datatype="'Academic'"
        :icons-hidden="iconsHidden"
        :component-data-id="'2'"
        @update="$emit('update', $event)"
      />
    </dd>
    <dd class="clear"></dd>
  </div>
</template>

<script lang="ts">
import { Component } from "../../Config/types";
import ComponentView from "../Component/ComponentView.vue";

export default {
  name: "AcademicTrainingListView",
  components: {
    ComponentView
  },
  props: {
    iconsHidden: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      hide: false,
      academicTrainingList: new Array<Component>(),
    };
  }
};
</script>
