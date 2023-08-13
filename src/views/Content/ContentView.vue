<template>
  <div>
    <ul>
      <div v-for="sub in subContents" v-bind:key="sub.guid">
        <li>
          {{ sub.name }}
          <b-link
            v-if="!iconsHidden"
            @click="$bvModal.show(`edit-${sub.guid}`)"
          >
            <b-icon icon="pencil-square" aria-hidden="true" />
          </b-link>
          <b-link
            v-if="!iconsHidden"
            @click="$bvModal.show(`delete-${sub.guid}`)"
          >
            <b-icon icon="x-circle-fill" aria-hidden="true" />
          </b-link>
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
      <b-link v-if="!iconsHidden" @click="$bvModal.show(`add-${guid}`)">
        <b-icon icon="plus-circle-fill" aria-hidden="true" />Añadir SubContenido
      </b-link>
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

export default {
  name: "ContentView",
  components: {
    AddModal,
    EditModal,
    DeleteModal,
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
