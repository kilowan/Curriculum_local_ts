<template>
  <b-modal
    v-if="componentData != undefined"
    :id="`edit-${componentData.guid}`"
    :title="`Editar ${modalTitle}`"
    ok-title="Guardar"
  >
    <!--Skills Fields-->
    <skills-view
      v-if="childrensDataType === 3"
      :name="componentData.name"
      :childrensTitle="componentData.childrensTitle"
      :iconsHidden="false"
      :edit="true"
    />
    <!--social media Fields-->
    <social-media-view
      v-else-if="childrensDataType === 13"
      :name="componentData.name"
      :type="componentData.type"
      :edit="true"
    />
    <!--Language Fields-->
    <Language-view
      v-else-if="childrensDataType === 4"
      :name="componentData.name"
      :level="componentData.level"
      :iconsHidden="false"
      :edit="true"
    />
    <!--Experience Fields-->
    <experience-view
      v-else-if="childrensDataType === 1"
      :name="componentData.name"
      :place="componentData.place"
      :initDate="componentData.initDate"
      :finishDate="componentData.finishDate"
      :childrensTitle="componentData.childrensTitle"
      :iconsHidden="false"
      :edit="true"
    />
    <!--Training Fields-->
    <training-view
      v-else-if="childrensDataType === 2"
      :name="componentData.name"
      :place="componentData.place"
      :graduationDate="componentData.graduationDate"
      :childrensTitle="componentData.childrensTitle"
      :iconsHidden="false"
      :edit="true"
    />
    <!--Other Fields-->
    <other-view
      v-else-if="childrensDataType === 5"
      :name="componentData.name"
      :iconsHidden="false"
      :edit="true"
    />
    <project-view
      v-else-if="childrensDataType === 9"
      :name="componentData.name"
      :childrensTitle="componentData.childrensTitle"
      :iconsHidden="false"
      :edit="true"
    />
    <b-form-textarea
      v-else
      v-model="componentData.name.value"
      rows="6"
      max-rows="16"
    />
  </b-modal>
</template>

<script lang="ts">
import { Component } from "@/Config/Base/Component/Component";
import LanguageView from "../LanguageView.vue";
import ExperienceView from "../ExperienceView.vue";
import TrainingView from "../TrainingView.vue";
import OtherView from "../OtherView.vue";
import ProjectView from "../ProjectView.vue";
import SocialMediaView from "../SocialMedia/SocialMediaView.vue";
import SkillsView from "../SkillsView.vue";
export default {
  name: "EditNewModal",
  components: {
    LanguageView,
    ExperienceView,
    TrainingView,
    OtherView,
    ProjectView,
    SocialMediaView,
    SkillsView,
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
