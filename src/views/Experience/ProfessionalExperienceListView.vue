<template>
  <div v-if="!hide">
    <dt id="experiencia">
      Experiencia
      <b-link v-if="!iconsHidden" @click="hide = true">
        <b-icon icon="eye-slash-fill" />
      </b-link>
    </dt>
    <dd id="experience">
      <component-view
        :component-data="experienceList"
        :component-datatype="'Experience'"
        :icons-hidden="iconsHidden"
        :component-data-id="getIdentifier()"
        @update="$emit('update', $event)"
      />
    </dd>
    <dd class="clear"></dd>
  </div>
</template>

<script lang="ts">
import { Component } from "../../Config/types";
import ComponentView from "../Component/ComponentView.vue";
//import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  name: "ProfessionalExperienceListView",
  components: {
    ComponentView,
  },
  props: {
    iconsHidden: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    getIdentifier() {
      const id = this.$store.state.identifier;
      if (!this.sameInstance) {
        this.sameInstance = true;
        console.log(id);
        this.$store.state.identifier++;
      }
      return id;
    },
  },
  data() {
    return {
      experienceList: new Array<Component>(),
      hide: false,
      sameInstance: false,
    };
  },
};
</script>
