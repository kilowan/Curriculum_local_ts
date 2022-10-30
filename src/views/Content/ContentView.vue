<template>
  <div>
    <ul>
      <div v-for="sub in subContents" v-bind:key="sub.id">
        <li>
          {{ sub.name }}
          <b-link
            v-if="!iconsHidden"
            @click="$bvModal.show(`edit-subcontent-${sub.id}`)"
          >
            <b-icon icon="pencil-square" aria-hidden="true" />
          </b-link>
          <b-link
            v-if="!iconsHidden"
            @click="$bvModal.show(`delete-subcontent-${sub.id}`)"
          >
            <b-icon icon="x-circle-fill" aria-hidden="true" />
          </b-link>
        </li>
        <DeleteModal 
          :modal-id="'subcontent'"
          :component-data="sub"
          :modal-title="'Contenido'"
          :message="'el elemento'"
          @remove="splice($event)"
        />
        <EditModal 
          :modal-id="'subcontent'"
          :modal-title="'Contenido'"
          :component-data="sub"
          :component-datatype="'SubContent'"
        />
      </div>
      <b-link
        v-if="!iconsHidden"
        @click="$bvModal.show(`add-subcontent-${contentIndex}`)"
      >
        <b-icon icon="plus-circle-fill" aria-hidden="true" />Añadir SubContenido
      </b-link>
    </ul>
    <AddModal 
      :modal-id="'subcontent'"
      :component-datatype="'Subcontent'"
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
    DeleteModal
  },
  props: {
    iconsHidden: {
      type: Boolean,
      required: true,
    },
    contentIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      contentData: {} as Component,
      subcontent: "",
      subContents: new Array<Component>(),
      index: 0,
    };
  },
  methods: {
    splice(index: number) {
      this.subContents = this.subContents.filter(
        (data: any) => data.id !== index
      );
      this.$emit("update", this.subContents);
    },
    push(subContent: string) {
      this.subContents.push({ id: this.index, name: subContent });
      this.index++;
      this.$emit("update", this.subContents);
      this.subcontent = "";
    },
  },
};
</script>
