<template>
  <div v-if="project != undefined">
    <ul>
      <div
        v-for="description in project.childrens"
        v-bind:key="description.guid"
      >
        <li>
          {{ description.name }}
          <EditLink v-if="!iconsHidden" @click="$bvModal.show(`edit-${description.guid}`)"/>
          <DeleteLink v-if="!iconsHidden" @click="$bvModal.show(`delete-${description.guid}`)"/>
        </li>
        <EditModal
          :modalTitle="'descripción'"
          :componentData="description"
          :componentDataType="10"
          @cancel="cancel"
        />
        <DeleteModal
          :modalTitle="'Descripción'"
          :componentData="description"
          :message="'la descripción'"
          @remove="splice(description)"
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
import EditModal from "../Modal/EditModal.vue";
import DeleteModal from "../Modal/DeleteModal.vue";
import AddLink from "@/components/AddLink.vue";
import DeleteLink from "@/components/DeleteLink.vue";
import EditLink from "@/components/EditLink.vue";
import { Component } from "@/Config/Base/Component/Component";
import { ComponentType } from "@/Config/Base/Enums";

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
      type: Component,
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
      desc: ""
    };
  },
  methods: {
    cancel(): void {
      this.add = false;
      this.desc = "";
    },
    save(description: string): void {
      this.$nextTick(() => {
        let element = new Component(crypto.randomUUID(), ComponentType.End, description);
        this.project.childrens.push(element);
        this.cancel();
        this.$emit("reload");
      });
    },
    splice(element: Component): void {
      this.project.childrens.splice(this.project.childrens.indexOf(element), 1);
      this.$emit("reload");
    }
  }
};
</script>
