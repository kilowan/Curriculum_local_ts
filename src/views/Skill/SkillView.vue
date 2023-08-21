<template>
  <ul>
    <contents-view
      :contents="input.childrens"
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
import { Component, ComponentType } from "../../Config/types";
import AddLink from "@/components/AddLink.vue";

export default {
  name: "ComplementaryExperienceView",
  components: {
    ContentsView,
    AddLink
},
  props: {
    input: {
      type: Component,
      required: true,
    },
    iconsHidden: {
      type: Boolean,
      required: true,
    },
  },
  data(): any {
    return {
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
        this.input.childrens.push(
          new Component(
            crypto.randomUUID(), 
            ComponentType.SubContent, 
            content
          ));
        this.cancel();
        this.$emit("update", this.input.childrens);
      });
    },
    update(contents: Array<Component>): void {
      this.$nextTick(() => {
        this.input.childrens = contents;
        this.$emit("update", this.input.childrens);
      });
    },
  }
};
</script>
