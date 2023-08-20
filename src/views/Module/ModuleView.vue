<template>
  <div v-if="!hide">
    <dt :id="input.dtId" :class="input.dtId">
      {{ input.name }}
      <HideLink v-if="!iconsHidden" @click="hide = true"/>
    </dt>
    <dd :id="input.ddId">
      <!--list-->
      <ul>
        <div v-for="company in input.childrens" v-bind:key="company.guid">
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
            :modalTitle="input.name"
            :componentData="company"
            :componentDataType="'Experience'"
          />
          <DeleteModal
            :modalTitle="input.name"
            :message="'la experiencia'"
            :componentData="company"
            @remove="deleteExperience($event)"
          />
        </div>
      </ul>
      <AddLink v-if="!iconsHidden" :text="input.name" @click="$bvModal.show(`add-${input.guid}`)"/>
    </dd>
    <dd class="clear"></dd>
    <AddModal
      :guid="input.guid"
      :modal-title="input.name"
      :component-data-type="'Experience'"
      @save="save($event)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Module } from "../../Config/types";
import List from "../Module/List.vue";
import AddModal from "../Modal/AddModal.vue";
import EditModal from "../Modal/EditModal.vue";
import DeleteModal from "../Modal/DeleteModal.vue";
import AddLink from "../../components/AddLink.vue";
import DeleteLink from "../../components/DeleteLink.vue";
import EditLink from "../../components/EditLink.vue";
import HideLink from "../../components/HideLink.vue";

export default {
  name: "ModuleView",
  components: {
    List,
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
      required: true
    },
    input: {
      type: Module,
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
    deepChange(input: Component): void {
      this.input.childrens.find((data: Component) => {
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
        this.input.childrens.push(data);
        this.$emit("update", this.input);
        this.experience = {} as Component;
      });
    },
    refresh(experience: Component): void {
      let exp = this.input.childrens.filter(
        (data: any) => data.guid !== experience.guid
      );
      exp.push(experience);
      this.input.childrens = exp;
      this.$emit("update", this.input);
    },
    deleteExperience(comp: Component): void {
      this.$nextTick(() => {
        this.input.childrens = this.input.childrens.filter(
          (data: any) => data.guid !== comp.guid
        );
        this.$emit("update", this.input);
      });
    }
  },
};
</script>
