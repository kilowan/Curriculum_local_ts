<template>
  <div v-if="!hide">
    <dt id="experiencia">
      Experiencia
      <b-link v-if="!iconsHidden" @click="(hide = true)">
        <b-icon icon="eye-slash-fill" />
      </b-link>
    </dt>
    <dd id="experience">
      <component-view 
        :name="'Experience'"
        :component-data="experienceList"
        :component-datatype="'Experience'"
        :icons-hidden="iconsHidden"
        :component-data-id="'1'"
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
  name: "ProfessionalExperienceListView",
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
      experienceList: new Array<Component>(),
      hide: false,
    };
  }
};
</script>
