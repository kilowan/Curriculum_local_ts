<template>
  <div v-if="!hide">
    <dt id="experiencia">
      Experiencia
      <HideLink v-if="!iconsHidden" @click="hide = true"/>
    </dt>
    <dd id="experience">
      <ul>
        <div v-for="company in experienceList" v-bind:key="company.guid">
          <li>
            {{ company.name }}
            <EditLink v-if="!iconsHidden" @click="$bvModal.show(`edit-${company.guid}`)"/>
            <DeleteLink v-if="!iconsHidden" @click="$bvModal.show(`delete-${company.guid}`)"/>
            <professional-experience-view
              :guid="company.guid"
              :company="company"
              :iconsHidden="iconsHidden"
              @update="refresh($event)"
            />
          </li>
          <EditModal
            :modal-title="'Experiencia'"
            :component-data="company"
            :component-data-type="'Experience'"
            @update="update($event)"
          />
          <DeleteModal
            :modal-title="'Experiencia'"
            :message="'la experiencia'"
            :component-data="company"
            @remove="deleteExperience($event)"
          />
        </div>
      </ul>
      <AddLink v-if="!iconsHidden" :text="'experiencia'" @click="$bvModal.show(`add-${guid}`)"/>
    </dd>
    <dd class="clear"></dd>
    <AddModal
      :guid="guid"
      :modal-title="'Experiencia'"
      :component-data-type="'Experience'"
      @save="save($event)"
    />
  </div>
</template>

<script lang="ts">
import { Component } from "../../Config/types";
import ProfessionalExperienceView from "./ProfessionalExperienceView.vue";
import AddModal from "../Modal/AddModal.vue";
import EditModal from "../Modal/EditModal.vue";
import DeleteModal from "../Modal/DeleteModal.vue";
import AddLink from "@/components/AddLink.vue";
import DeleteLink from "@/components/DeleteLink.vue";
import EditLink from "@/components/EditLink.vue";
import HideLink from "@/components/HideLink.vue";

export default {
  name: "ProfessionalExperienceListView",
  components: {
    ProfessionalExperienceView,
    AddModal,
    EditModal,
    DeleteModal,
    AddLink,
    DeleteLink,
    EditLink,
    HideLink
},
  props: {
    iconsHidden: {
      type: Boolean,
      required: true,
    },
  },
  data(): any {
    return {
      experienceList: new Array<Component>(),
      experience: {} as Component,
      add: false,
      hide: false,
      guid: crypto.randomUUID(),
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
    deepChange(input: Component): void {
      this.experienceList.find((data: Component) => {
        if (data.guid === input.guid) data = input;
        else {
          data.childrens?.forEach((data2: Component) => {
            this.deepChange(data2);
          });
        }
      });
    },
    save(experience: Component): void {
      this.$nextTick(() => {
        let data = new Component(experience.guid, experience.name);
        data.initDate = experience.initDate;
        data.finishDate = experience.finishDate;
        data.graduationDate = experience.graduationDate;
        data.place = experience.place;
        data.componentDataType = "Experience";
        this.experienceList.push(data);
        this.$emit("update", this.experienceList);
        this.experience = {} as Component;
      });
    },
    refresh(experience: Component): void {
      let exp = this.experienceList.filter(
        (data: any) => data.guid !== experience.guid
      );
      exp.push(experience);
      this.experienceList = exp;
      this.$emit("update", this.experienceList);
    },
    update(experiences: Array<Component>): void {
      this.$nextTick(() => {
        this.$emit("update", experiences);
      });
    },
    deleteExperience(comp: Component): void {
      this.$nextTick(() => {
        this.experienceList = this.experienceList.filter(
          (data: any) => data.guid !== comp.guid
        );
        this.$emit("update", this.experienceList);
      });
    },
  },
};
</script>
