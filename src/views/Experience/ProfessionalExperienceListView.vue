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
    <AddModal
      :modal-id="'experience'"
      :modal-title="'Experiencia'"
      :component-datatype="'Experience'"
      @save="save($event)"
    />
  </div>
</template>

<script lang="ts">
import { Component } from "../../Config/types";
import ComponentView from "../Component/ComponentView.vue";
import AddModal from "../Modal/AddModal.vue";

export default {
  name: "ProfessionalExperienceListView",
  components: {
    ComponentView,
    AddModal
  },
  props: {
    iconsHidden: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      index: 0,
      experienceList: new Array<Component>(),
      experience: {} as Component,
      add: false,
      hide: false,
    };
  },
  methods: {
    cancel() {
      this.add = false;
    },
    options: function () {
      return [
        { value: 1, text: "personal" },
        { value: 2, text: "professional" },
      ];
    },
    save(experience: any) {
      this.$nextTick(() => {
        this.experienceList.push({
          id: this.index,
          initDate: experience.initDate,
          finishDate: experience.finishDate,
          graduationDate: experience.graduationDate,
          place: experience.place,
          name: experience.name,
          childrens: new Array<Component>(),
          componentDataType: 'Experience'
        });
        this.index++;
        this.$emit("update", this.experienceList);
        this.experience = {} as Component;
      });
    },
    deleteExperience(index: number) {
      this.$nextTick(() => {
        this.experienceList = this.experienceList.filter(
          (data: any) => data.id !== index
        );
        this.$emit("update", this.experienceList);
      });
    },
  },
};
</script>
