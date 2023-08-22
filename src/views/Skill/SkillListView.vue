<template>
  <div v-if="!hide">
    <dt id="complementaria" v-if="input.childrens">
      Skills
      <HideLink v-if="!iconsHidden" @click="hide = true"/>
    </dt>
    <dd id="complementary" v-if="input.childrens">
      <ul>
        <div v-for="skill in input.childrens" v-bind:key="skill.guid">
          <li>
            <strong>{{ skill.name }}</strong>
            <EditLink v-if="!iconsHidden" @click="$bvModal.show(`edit-${skill.guid}`)"/>
            <DeleteLink v-if="!iconsHidden" @click="$bvModal.show(`delete-${skill.guid}`)"/>
            <skill-view
              :input="skill"
              :iconsHidden="iconsHidden"
              @update="refresh($event, skill)"
              @reload="$emit('update', input)"
            />
          </li>
          <edit-modal
            :modalTitle="'skill'"
            :componentData="skill"
            :componentDataType="3"
            @update="update(input.childrens)"
          />
          <delete-modal
            :modalTitle="'Skill'"
            :message="'la skill'"
            :componentData="skill"
            @remove="splice(skill)"
          />
        </div>
      </ul>
      <div v-if="add">
        <input type="text" v-model="trainingNew" />
        <b-button class="m-2" @click="save(trainingNew)">Guardar</b-button>
        <b-button class="m-2" @click="cancel">Cancelar</b-button>
      </div>
      <AddLink v-if="!iconsHidden && !add" :text="'Skill'" @click="add = true"/>
    </dd>
    <dd class="clear"></dd>
  </div>
</template>

<script lang="ts">
import SkillView from "./SkillView.vue";
import { Component, Module, ComponentType } from "../../Config/types";
import EditModal from "../Modal/EditModal.vue";
import DeleteModal from "../Modal/DeleteModal.vue";
import AddLink from "@/components/AddLink.vue";
import DeleteLink from "@/components/DeleteLink.vue";
import HideLink from "@/components/HideLink.vue";
import EditLink from "@/components/EditLink.vue";

export default {
  name: "SkillListView",
  components: {
    SkillView,
    EditModal,
    DeleteModal,
    AddLink,
    DeleteLink,
    HideLink,
    EditLink
},
  props: {
    iconsHidden: {
      type: Boolean,
      required: true,
    },
    input: {
      type: Module,
      required: true
    }
  },
  data(): any {
    return {
      hide: false,
      trainingNew: "",
      add: false,
      guid: crypto.randomUUID(),
    };
  },
  methods: {
    cancel(): void {
      this.trainingNew = "";
      this.add = false;
    },
    refresh(skills: Array<Component>, comp: Component): void {
      this.$nextTick(() => {
        var filtered = this.input.childrens.filter(
          (data: any) => data.guid !== comp.guid
        );
        var training = this.input.childrens.find(
          (data: any) => data.guid === comp.guid
        );
        training.childrens = skills;
        filtered.push(training);
        this.input.childrens = filtered;
        this.$emit("update", this.input);
      });
    },
    splice(element: Component): void {
      this.input.childrens.splice(this.input.childrens.indexOf(element), 1);
      this.$emit("update", this.input);
    },
    update(skills: Array<Component>): void {
      this.$nextTick(() => {
        this.input.childrens = skills;
        this.$emit("update", this.input);
      });
    },
    save(training: string): void {
      this.$nextTick(() => {
        this.input.childrens.push(new Component(crypto.randomUUID(), this.getChildrensType(), training));
        this.cancel();
        this.$emit("update", this.input);
      });
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
