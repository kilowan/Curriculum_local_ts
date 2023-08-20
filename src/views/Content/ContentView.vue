<template>
  <div v-if="content != undefined">
    <ul>
      <div v-for="sub in content.childrens" v-bind:key="sub.guid">
        <li>
          {{ sub.name }}
          <EditLink v-if="!iconsHidden" @click="$bvModal.show(`edit-${sub.guid}`)"/>
          <DeleteLink v-if="!iconsHidden" @click="$bvModal.show(`delete-${sub.guid}`)"/>
        </li>
        <DeleteModal
          :componentData="sub"
          :modalTitle="'Contenido'"
          :message="'el elemento'"
          @remove="splice($event)"
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
      subcontent: ""
    };
  },
  methods: {
    splice(index: string): void {
      this.content.childrens = this.content.childrens.filter(
        (data: any) => data.guid !== index
      );
      this.$emit("update", this.content);
    },
    push(subContent: Component): void {
      this.content.childrens.push(new Component(crypto.randomUUID(), subContent.childrensDataType, subContent.name));
      this.$emit("update", this.content);
      this.subcontent = "";
    },
  },
};
</script>
