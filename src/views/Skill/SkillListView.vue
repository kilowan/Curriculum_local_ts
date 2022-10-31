<template>
  <div v-if="!hide">
    <dt id="complementaria" v-if="skillList">
      Skills
      <b-link v-if="!iconsHidden" @click="(hide = true)">
        <b-icon icon="eye-slash-fill" />
      </b-link>
    </dt>
    <dd id="complementary" v-if="skillList">
      <ul>
        <component-view 
          :name="'Skill'"
          :component-data="skillList"
          :component-datatype="'Skill'"
          :icons-hidden="iconsHidden"
          :component-data-id="'2'"
          @update="$emit('update', $event)"
        />
      </ul>
    </dd>
    <dd class="clear"></dd>
  </div>
</template>

<script lang="ts">
import { Component } from "../../Config/types";
import ComponentView from "../Component/ComponentView.vue";

export default {
  name: "SkillListView",
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
      skillList: new Array<Component>(),
    };
  },
};
</script>
