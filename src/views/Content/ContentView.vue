<template>
  <div>
    <ul>
      <div v-for="sub in subContents" v-bind:key="sub.guid">
        <li>
          {{ sub.name }}
          <EditLink v-if="!iconsHidden" @click="$bvModal.show(`edit-${sub.guid}`)"/>
          <DeleteLink v-if="!iconsHidden" @click="$bvModal.show(`delete-${sub.guid}`)"/>
        </li>
        <DeleteModal
          :component-data="sub"
          :modal-title="'Contenido'"
          :message="'el elemento'"
          @remove="splice($event)"
        />
        <EditModal
          :modal-title="'Contenido'"
          :component-data="sub"
          :component-data-type="'SubContent'"
        />
      </div>
      <AddLink v-if="!iconsHidden" :text="'SubContenido'" @click="$bvModal.show(`add-${guid}`)"/>
    </ul>
    <AddModal
      :guid="guid"
      :component-data-type="'Subcontent'"
      :modal-title="'SubContenido'"
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
    guid: {
      type: String,
      required: true,
    },
  },
  data(): any {
    return {
      contentData: {} as Component,
      subcontent: "",
      subContents: new Array<Component>(),
    };
  },
  methods: {
    splice(index: string): void {
      this.subContents = this.subContents.filter(
        (data: any) => data.guid !== index
      );
      this.$emit("update", this.subContents);
    },
    push(subContent: string): void {
      this.subContents.push(new Component(crypto.randomUUID(), subContent));
      this.$emit("update", this.subContents);
      this.subcontent = "";
    },
  },
};
</script>
