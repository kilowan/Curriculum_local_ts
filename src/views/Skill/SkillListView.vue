<template>
  <div v-if="!hide">
    <dt id="complementaria" v-if="skillList">
      Skills
      <HideLink v-if="!iconsHidden" @click="hide = true"/>
    </dt>
    <dd id="complementary" v-if="skillList">
      <ul>
        <div v-for="skill in skillList" v-bind:key="skill.guid">
          <li>
            <strong>{{ skill.name }}</strong>
            <EditLink v-if="!iconsHidden" @click="$bvModal.show(`edit-${skill.guid}`)"/>
            <DeleteLink v-if="!iconsHidden" @click="$bvModal.show(`delete-${skill.guid}`)"/>
            <skill-view
              :skill="skill"
              :iconsHidden="iconsHidden"
              @update="refresh($event)"
            />
          </li>
          <edit-modal
            :modal-title="'skill'"
            :component-data="skill"
            :component-data-type="'Skill'"
            @update="update(skillList)"
          />
          <delete-modal
            :modal-title="'Skill'"
            :message="'la skill'"
            :component-data="skill"
            @remove="splice(skill.guid)"
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
import { Component } from "../../Config/types";
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
  },
  data(): any {
    return {
      hide: false,
      counter: 0,
      trainingNew: "",
      add: false,
      skillList: new Array<Component>(),
      guid: crypto.randomUUID(),
    };
  },
  methods: {
    cancel(): void {
      this.trainingNew = "";
      this.add = false;
    },
    refresh(skill: Component): void {
      this.$nextTick(() => {
        var filtered = this.skillList.filter(
          (data: any) => data.guid !== skill.guid
        );
        var training = this.skillList.find(
          (data: any) => data.guid === skill.guid
        );
        training = skill;
        filtered.push(training);
        this.skillList = filtered;
        this.$emit("update", this.skillList);
      });
    },
    splice(index: string): void {
      this.$nextTick(() => {
        this.skillList = this.skillList.filter(
          (data: any) => data.guid !== index
        );
        this.$emit("update", this.skillList);
      });
    },
    update(skills: Array<Component>): void {
      this.$nextTick(() => {
        this.$emit("update", skills);
      });
    },
    save(training: string): void {
      this.$nextTick(() => {
        this.skillList.push(new Component(crypto.randomUUID(), training));
        this.cancel();
        this.$emit("update", this.skillList);
      });
    },
  },
};
</script>
