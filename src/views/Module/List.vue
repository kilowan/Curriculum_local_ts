<template>
  <div>
    <ul>
      <div v-for="company in elements" v-bind:key="company.guid">
        <li>
          {{ company.name }}
          <EditLink v-if="!iconsHidden" @click="$bvModal.show(`edit-${company.guid}`)"/>
          <DeleteLink v-if="!iconsHidden" @click="$bvModal.show(`delete-${company.guid}`)"/>
          <professional-experience-view
            :guid="company.guid"
            :company="company"
            :iconsHidden="iconsHidden"
            @reload="$emit('reload')"
          />
        </li>
        <EditModal
          :modal-title="input.name"
          :component-data="company"
          :component-data-type="'Experience'"
        />
        <DeleteModal
          :modal-title="input.name"
          :message="'la experiencia'"
          :component-data="company"
          @remove="splice(company)"
        />
      </div>
    </ul>
    <AddLink v-if="!iconsHidden" :text="input.name" @click="$bvModal.show(`add-${input.guid}`)"/>
  </div>
</template>

<script lang="ts">
import { Component, ComponentType } from "../../Config/types";
import ProfessionalExperienceView from "../ProfessionalExperienceView.vue";
import AddModal from "../Modal/AddModal.vue";
import EditModal from "../Modal/EditModal.vue";
import DeleteModal from "../Modal/DeleteModal.vue";
import AddLink from "../../components/AddLink.vue";
import DeleteLink from "../../components/DeleteLink.vue";
import EditLink from "../../components/EditLink.vue";
import HideLink from "../../components/HideLink.vue";

export default {
  name: "List",
  components: {
    ProfessionalExperienceView,
    EditModal,
    DeleteModal,
    AddLink,
    DeleteLink,
    EditLink
},
  props: {
    iconsHidden: {
      type: Boolean,
      required: true
    },
    elements: {
      type: Array,
      required: true
    }
  },
  data(): any {
    return {
      add: false,
      hide: false
    };
  },
  methods: {
    cancel(): void {
      this.add = false;
    },
    options(): any {
      return [
        { value: 1, text: "personal" },
        { value: 2, text: "professional" },
      ];
    },
    save(experience: Component): void {
      this.$nextTick(() => {
        let data = new Component(
          experience.guid, 
          this.getChildrensType(), 
          experience.name
        );
        data.initDate = experience.initDate;
        data.finishDate = experience.finishDate;
        data.graduationDate = experience.graduationDate;
        data.place = experience.place;
        data.componentDataType = "Experience";
        this.input.childrens.push(data);
        this.$emit("reload");
      });
    },
    splice(element: Component): void {
      this.input.childrens.splice(this.input.childrens.indexOf(element), 1);
      this.$emit("reload");
    },
    getChildrensType(): ComponentType {
      switch (this.input.childrensDataType) {
        case ComponentType.Experience:
          return ComponentType.Contract;

        case ComponentType.Contract:
          return ComponentType.Project;

        case ComponentType.Project:
          return ComponentType.Description;

        case ComponentType.Academic:
          return ComponentType.Content;

        case ComponentType.Content:
        case ComponentType.Other:
          return ComponentType.SubContent;

        default:
          return ComponentType.Value;
      }
    }
  },
};
</script>
