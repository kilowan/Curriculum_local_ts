<template>
  <ul>
    <div>
      <contents-view
        :ref="'contents'"
        :contents="skill.childrens"
        :iconsHidden="iconsHidden"
        @update="update($event)"
      />
    </div>
    <div v-if="add">
      <input class="m-2" type="text" v-model="element" />
      <b-button class="m-2" @click="save(element)">Guardar</b-button>
      <b-button class="m-2" @click="cancel">Cancelar</b-button>
    </div>
    <b-link v-if="!iconsHidden" @click="add = true">
      <b-icon icon="plus-circle-fill" aria-hidden="true" /> Añadir contenido
    </b-link>
  </ul>
</template>

<script lang="ts">
import ContentsView from "../Content/ContentListView.vue";
import { Component } from "../../Config/types";

export default {
  name: "ComplementaryExperienceView",
  components: {
    ContentsView,
  },
  props: {
    skill: {
      type: Object,
      required: true,
    },
    iconsHidden: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      skillData: {} as Component,
      contents: new Array<Component>(),
      add: false,
      element: "",
      index: 0,
    };
  },
  methods: {
    cancel() {
      this.element = "";
      this.add = false;
    },
    save(content: string) {
      this.$nextTick(() => {
        this.$refs.contents._data.contentsData.push({
          id: this.index,
          name: content,
          childrens: new Array<Component>(),
        });
        this.index++;
        this.cancel();
        this.$emit("update", this.$refs.contents._data.contentsData);
      });
    },
    update(contents: Array<Component>) {
      this.$nextTick(() => {
        this.$refs.contents._data.contentsData = contents;
        this.$emit("update", this.skillData);
      });
    },
  },
  mounted() {
    this.skillData = this.skill;
    this.$refs.contents._data.contentsData = this.skill.childrens;
    this.index = this.skill.childrens.length === 0 || this.skill.childrens === undefined || this.skill.childrens === null? 0 : this.skill.childrens.length-1;
  },
};
</script>
