<template>
  <div>
    <ul>
      <div
        v-for="description in projectData.childrens"
        v-bind:key="description.guid"
      >
        <li>
          {{ description.name }}
          <EditLink v-if="!iconsHidden" @click="$bvModal.show(`edit-${description.guid}`)"/>
          <DeleteLink v-if="!iconsHidden" @click="$bvModal.show(`delete-${description.guid}`)"/>
        </li>
        <EditModal
          :modal-title="'descripción'"
          :component-data="description"
          :component-data-type="'Description'"
          @cancel="cancel"
        />
        <DeleteModal
          :modal-title="'Descripción'"
          :component-data="description"
          :message="'la descripción'"
          @remove="splice(description.guid)"
        />
      </div>
    </ul>
    <div v-if="add">
      <input type="text" v-model="desc" />
      <b-button @click="save(desc)">Guardar</b-button>
      <b-button @click="cancel">Cancelar</b-button>
    </div>
    <AddLink v-if="!add && !iconsHidden" :text="'descripción'" @click="add = true"/>
  </div>
</template>

<script lang="ts">
import { Component } from "../../Config/types";
import EditModal from "../Modal/EditModal.vue";
import DeleteModal from "../Modal/DeleteModal.vue";
import AddLink from "@/components/AddLink.vue";
import DeleteLink from "@/components/DeleteLink.vue";
import EditLink from "@/components/EditLink.vue";

export default {
  name: "ProjectView",
  components: {
    EditModal,
    DeleteModal,
    AddLink,
    DeleteLink,
    EditLink
},
  props: {
    project: {
      type: Object,
      required: true,
    },
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
      add: false,
      description: "",
      desc: "",
      descriptions: new Array<Component>(),
      projectData: {} as Component,
    };
  },
  methods: {
    cancel(): void {
      this.add = false;
    },
    save(description: string): void {
      this.$nextTick(() => {
        let element = new Component(crypto.randomUUID(), description);
        this.descriptions.push(element);
        this.projectData.childrens.push(element);
        this.add = false;
        this.desc = "";
        this.$emit("update", this.projectData);
      });
    },
    splice(guid: string): void {
      this.projectData.childrens = this.projectData.childrens.filter(
        (data: Component) => data.guid !== guid
      );
      this.descriptions = this.descriptions.filter(
        (data: Component) => data.guid !== guid
      );
      this.$emit("update", this.projectData);
    },
  },
  mounted(): void {
    this.projectData = this.project;
  },
};
</script>
