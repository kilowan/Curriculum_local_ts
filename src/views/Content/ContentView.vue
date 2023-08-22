<template>
  <div>
    <ul>
      <div v-for="sub in input.childrens" v-bind:key="sub.guid">
        <li>
          {{ sub.name }}
          <EditLink v-if="!iconsHidden" @click="$bvModal.show(`edit-${sub.guid}`)"/>
          <DeleteLink v-if="!iconsHidden" @click="$bvModal.show(`delete-${sub.guid}`)"/>
        </li>
        <DeleteModal
          :componentData="sub"
          :modalTitle="'Contenido'"
          :message="'el elemento'"
          @remove="splice(sub)"
        />
        <EditModal
          :modalTitle="'Contenido'"
          :componentData="sub"
          :componentDataType="7"
        />
      </div>
      <AddLink v-if="!iconsHidden" :text="'SubContenido'" @click="$bvModal.show(`add-${guid}`)"/>
    </ul>
    <AddModal
      :guid="guid"
      :componentDataType="7"
      @save="push($event)"
    />
  </div>
</template>

<script lang="ts">
import { Component } from "@/Config/types";
import AddModal from "../Modal/AddModal.vue";
import EditModal from "../Modal/EditModal.vue";
import DeleteModal from "../Modal/DeleteModal.vue";
import AddLink from "@/components/AddLink.vue";
import DeleteLink from "@/components/DeleteLink.vue";
import EditLink from "@/components/EditLink.vue";

export default {
  name: "ContentView",
  components: {
    AddModal,
    EditModal,
    DeleteModal,
    AddLink,
    DeleteLink,
    EditLink
},
  props: {
    iconsHidden: {
      type: Boolean,
      required: true,
    },
    input: {
      type: Component,
      required: true,
    },
  },
  data(): any {
    return {
      subcontent: "",
      guid: crypto.randomUUID()
    };
  },
  methods: {
    splice(element: Component): void {
      this.input.childrens.splice(this.input.childrens.indexOf(element), 1);
      this.$emit("reload");
    },
    push(subContent: Component): void {
      this.input.childrens.push(new Component(crypto.randomUUID(), subContent.childrensDataType, subContent.name));
      this.$emit("update", this.input.childrens);
      this.subcontent = "";
    }
  },
};
</script>
