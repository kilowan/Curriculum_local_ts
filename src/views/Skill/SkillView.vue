<template>
  <ul>
    <contents-view
      :ref="'contents'"
      :contents="skill.childrens"
      :iconsHidden="iconsHidden"
      @update="update($event)"
    />
    <input v-if="add" class="m-2" type="text" v-model="element" />
    <b-button v-if="add" class="m-2" @click="save(element)">Guardar</b-button>
    <b-button v-if="add" class="m-2" @click="cancel">Cancelar</b-button>
    <AddLink v-if="!iconsHidden && !add" :text="'contenido'" @click="add = true"/>
  </ul>
</template>

<script lang="ts">
import ContentsView from "../Content/ContentListView.vue";
import { Component } from "../../Config/types";
import AddLink from "@/components/AddLink.vue";

export default {
  name: "ComplementaryExperienceView",
  components: {
    ContentsView,
    AddLink
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
  data(): any {
    return {
      skillData: {} as Component,
      contents: new Array<Component>(),
      add: false,
      element: "",
    };
  },
  methods: {
    cancel(): void {
      this.element = "";
      this.add = false;
    },
    save(content: string): void {
      this.$nextTick(() => {
        this.$refs.contents._data.contentsData.push({
          guid: crypto.randomUUID(),
          name: content,
          childrens: new Array<Component>(),
        });
        this.cancel();
        this.$emit("update", this.$refs.contents._data.contentsData);
      });
    },
    update(contents: Array<Component>): void {
      this.$nextTick(() => {
        this.$refs.contents._data.contentsData = contents;
        this.$emit("update", this.skillData);
      });
    },
  },
  mounted() {
    this.skillData = this.skill;
    this.$refs.contents._data.contentsData = this.skill.childrens;
  },
};
</script>
