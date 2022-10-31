<template>
  <div v-if="!hide">
    <dt id="otros" class="otros" v-if="other">
      Otros datos
      <b-link v-if="!iconsHidden" @click="(hide = true)">
        <b-icon icon="eye-slash-fill" />
      </b-link>
    </dt>
    <dd id="other" v-if="other">
      <component-view 
        :name="'Skill'"
        :component-data="other"
        :component-datatype="'Other'"
        :icons-hidden="iconsHidden"
        :component-data-id="'5'"
        @update="$emit('update', $event)"
      />
    </dd>
    <dd class="clear"></dd>
  </div>
</template>

<script lang="ts">
import { Component } from "@/Config/types";
import ComponentView from "../Component/ComponentView.vue";

export default {
  name: "OtherListView",
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
      other: new Array<Component>(),
    };
  }
};
</script>
