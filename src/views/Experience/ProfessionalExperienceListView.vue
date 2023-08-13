<template>
  <div v-if="!hide">
    <dt id="experiencia">
      Experiencia
      <b-link v-if="!iconsHidden" @click="(hide = true)">
        <b-icon icon="eye-slash-fill" />
      </b-link>
    </dt>
    <dd id="experience">
      <ul>
        <div v-for="company in experienceList" v-bind:key="company.guid">
          <li>
            {{ company.name }}
            <b-link v-if="!iconsHidden" :id="company.guid" @click="$bvModal.show('edit-modal')">
              <b-icon icon="pencil-square" aria-hidden="true" />
            </b-link>
            <b-link v-if="!iconsHidden" :id="company.guid" @click="$bvModal.show('delete-modal')">
              <b-icon icon="x-circle-fill" aria-hidden="true" />
            </b-link>
            <professional-experience-view :guid="company.guid" :company="company" :iconsHidden="iconsHidden"
              @update="refresh($event)" />
          </li>
          <EditModal :modal-title="'Experiencia'" :component-data="company" :component-data-type="'Experience'"
            @update="update($event)" />
          <DeleteModal :modal-title="'Experiencia'" :message="'la experiencia'" :component-data="company"
            @remove="deleteExperience($event)" />
        </div>
      </ul>
      <b-link v-if="!iconsHidden" :id="guid" @click="$bvModal.show('add-modal')">
        <b-icon icon="plus-circle-fill" aria-hidden="true" /> Añadir experiencia
      </b-link>
    </dd>
    <dd class="clear"></dd>
    <AddModal :guid="guid" :modal-title="'Experiencia'" :component-data-type="'Experience'" @save="save($event)" />
  </div>
</template>

<script lang="ts">
import { Component } from "../../Config/types";
import ProfessionalExperienceView from "./ProfessionalExperienceView.vue";
import AddModal from "../Modal/AddModal.vue";
import EditModal from "../Modal/EditModal.vue";
import DeleteModal from "../Modal/DeleteModal.vue";

export default {
  name: "ProfessionalExperienceListView",
  components: {
    ProfessionalExperienceView,
    AddModal,
    EditModal,
    DeleteModal
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
      experience: {} as Component,
      add: false,
      hide: false,
      guid: crypto.randomUUID()
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
    deepChange(input: Component) {
      this.experienceList.find((data: Component) => {
        if (data.guid === input.guid) data = input; else {
          data.childrens?.forEach((data2: Component) => {
            this.deepChange(data2);
          });
        }
      });
    },
    save(experience: any) {
      this.$nextTick(() => {
        let data = new Component(experience.guid, experience.name);
        data.initDate = experience.initDate;
        data.finishDate = experience.finishDate;
        data.graduationDate = experience.graduationDate;
        data.place = experience.place;
        data.componentDataType = 'Experience';
        this.experienceList.push(data);
        this.$emit("update", this.experienceList);
        this.experience = {} as Component;
      });
    },
    refresh(experience: Component) {
      let exp = this.experienceList.filter(
        (data: any) => data.guid !== experience.guid
      );
      exp.push(experience);
      this.experienceList = exp;
      this.$emit("update", this.experienceList);
    },
    update(experiences: any) {
      this.$nextTick(() => {
        this.$emit('update', experiences);
      });
    },
    deleteExperience(comp: Component) {
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
