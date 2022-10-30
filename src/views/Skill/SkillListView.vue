<template>
  <div v-if="!hide">
    <dt id="complementaria" v-if="skillList">
      Skills
      <b-link v-if="!iconsHidden" @click="(hide = true)">
        <b-icon icon="eye-slash-fill" />
      </b-link>
    </dt>
    <dd id="complementary" v-if="skillList">
      <ul>
        <div v-for="skill in skillList" v-bind:key="skill.id">
          <li>
            <strong>{{ skill.name }}</strong>
            <b-link
              v-if="!iconsHidden"
              @click="$bvModal.show(`edit-skill-${skill.id}`)"
            >
              <b-icon icon="pencil-square" aria-hidden="true" />
            </b-link>
            <b-link
              v-if="!iconsHidden"
              @click="$bvModal.show(`delete-skill-${skill.id}`)"
            >
              <b-icon icon="x-circle-fill" aria-hidden="true" />
            </b-link>
            <skill-view
              :skill="skill"
              :iconsHidden="iconsHidden"
              @update="refresh($event)"
            />
          </li>
          <edit-modal 
            :modal-id="'skill'"
            :modal-title="'skill'"
            :component-data="skill"
            :component-datatype="'Skill'"
            @update="update(skillList)"
          />
          <delete-modal 
            :modal-id="'skill'"
            :modal-title="'Skill'"
            :message="'la skill'"
            :component-data="skill"
            @remove="splice(skill.id)"
          />
        </div>
      </ul>
      <div v-if="add">
        <input type="text" v-model="trainingNew" />
        <b-button class="m-2" @click="save(trainingNew)">Guardar</b-button>
        <b-button class="m-2" @click="cancel">Cancelar</b-button>
      </div>
      <b-link v-if="!iconsHidden && !add" @click="add = true">
        <b-icon icon="plus-circle-fill" aria-hidden="true" /> Añadir Skill
      </b-link>
    </dd>
    <dd class="clear"></dd>
  </div>
</template>

<script lang="ts">
import SkillView from "./SkillView.vue";
import { Component } from "../../Config/types";
import EditModal from "../Modal/EditModal.vue";
import DeleteModal from "../Modal/DeleteModal.vue";

export default {
  name: "SkillListView",
  components: {
    SkillView,
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
      hide: false,
      counter: 0,
      trainingNew: "",
      add: false,
      skillList: new Array<Component>(),
      index: 0,
    };
  },
  methods: {
    cancel() {
      this.trainingNew = "";
      this.add = false;
    },
    refresh(skill: Component) {
      this.$nextTick(() => {
        var filtered = this.skillList.filter(
          (data: any) => data.id !== skill.id
        );
        var training = this.skillList.find(
          (data: any) => data.id === skill.id
        );
        training = skill;
        filtered.push(training);
        this.skillList = filtered;
        this.$emit("update", this.skillList);
      });
    },
    splice(index: number) {
      this.$nextTick(() => {
        this.skillList = this.skillList.filter(
          (data: any) => data.id !== index
        );
        this.$emit("update", this.skillList);
      });
    },
    update(skills: any) {
      this.$nextTick(() => {
        this.$emit('update', skills);
      });
    },
    save(training: string) {
      this.$nextTick(() => {
        this.skillList.push({
          id: this.index,
          name: training,
          childrens: new Array<Component>(),
        });
        this.index++;
        this.cancel();
        this.$emit("update", this.skillList);
      });
    },
  },
};
</script>
