<template>
  <div v-if="!hide">
    <dt id="experiencia">
      Experiencia
      <b-link v-if="!iconsHidden" @click="(hide = true)">
        <b-icon icon="eye-slash-fill" />
      </b-link>
    </dt>
    <dd id="experience">
      <!--<component-view 
        :name="'Experience'"
        :component-data="experienceList"
        :component-datatype="'Experience'"
        :icons-hidden="iconsHidden"
        @update="refresh($event)"
      />-->
      <ul>
        <div v-for="company in experienceList" v-bind:key="company.guid">
          <li>
            {{ company.name }}
            <b-link
              v-if="!iconsHidden"
              @click="$bvModal.show(`edit-experience-${company.guid}`)"
            >
              <b-icon icon="pencil-square" aria-hidden="true" />
            </b-link>
            <b-link
              v-if="!iconsHidden"
              @click="$bvModal.show(`delete-experience-${company.guid}`)"
            >
              <b-icon icon="x-circle-fill" aria-hidden="true" />
            </b-link>
            <professional-experience-view
              :company="company"
              :iconsHidden="iconsHidden"
              @update="refresh($event)"
            />
          </li>
          <EditModal 
            :modal-id="'experience'"
            :modal-title="'Experiencia'"
            :component-data="company"
            :component-datatype="'Experience'"
            @update="update($event)"
          />
          <DeleteModal
            :modal-id="'experience'"
            :modal-title="'Experiencia'"
            :message="'la experiencia'"
            :component-data="company"
            @remove="deleteExperience($event)"
          />
        </div>
      </ul>
      <b-link v-if="!iconsHidden" @click="$bvModal.show('add-experience')">
        <b-icon icon="plus-circle-fill" aria-hidden="true" /> Añadir experiencia
      </b-link>
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
import ProfessionalExperienceView from "./ProfessionalExperienceView.vue";
//import ComponentView from "../Component/ComponentView.vue";
import AddModal from "../Modal/AddModal.vue";
import EditModal from "../Modal/EditModal.vue";
import DeleteModal from "../Modal/DeleteModal.vue";

export default {
  name: "ProfessionalExperienceListView",
  components: {
    ProfessionalExperienceView,
    //ComponentView,
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
          guid: crypto.randomUUID(),
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
    refresh(experience: Component) {
      var exp = this.experienceList.filter(
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
