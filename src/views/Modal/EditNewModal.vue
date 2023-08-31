<template>
  <b-modal
    v-if="componentData != undefined"
    :id="`edit-${componentData.guid}`"
    :title="`Editar ${modalTitle}`"
    ok-title="Guardar"
  >
    <!--Language Fields-->
    <Language-view
      v-if="childrensDataType === 4"
      :input="componentData"
      :iconsHidden="false"
      :edit="true"
    />
    <!--Experience Fields-->
    <experience-view
      v-if="childrensDataType === 1"
      :input="componentData"
      :iconsHidden="false"
      :edit="true"
    />
    <!--Training Fields-->
    <training-view
      v-if="childrensDataType === 2"
      :input="componentData"
      :iconsHidden="false"
      :edit="true"
    />
    <!--Other Fields-->
    <other-view
      v-if="childrensDataType === 5"
      :input="componentData"
      :iconsHidden="false"
      :edit="true"
    />
  </b-modal>
</template>

<script lang="ts">
import { Component } from "@/Config/Base/Component/Component";
import LanguageView from "../LanguageView.vue";
import ExperienceView from "../ExperienceView.vue";
import TrainingView from "../TrainingView.vue";
import OtherView from "../OtherView.vue";
export default {
  name: "EditNewModal",
  components: {
    LanguageView,
    ExperienceView,
    TrainingView,
    OtherView,
  },
  props: {
    componentData: {
      type: Component,
      required: true,
    },
    modalTitle: {
      type: String,
      required: true,
    },
    childrensDataType: {
      type: Number,
      required: true,
    },
  },
  data(): any {
    return {};
  },
};
</script>
