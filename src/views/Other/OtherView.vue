<template>
  <div>
    <ul>
      <div v-for="value in values" v-bind:key="value.guid">
        <li v-if="!hide">
          {{ value.name }}
          <b-link
            v-if="!iconsHidden"
            @click="$bvModal.show(`edit-${value.guid}`)"
          >
            <b-icon icon="pencil-square" aria-hidden="true" />
          </b-link>
          <b-link
            v-if="!iconsHidden"
            @click="$bvModal.show(`delete-${value.guid}`)"
          >
            <b-icon icon="x-circle-fill" aria-hidden="true" />
          </b-link>
        </li>
        <EditModal
          :modal-title="'valor'"
          :component-data="value"
          :component-data-type="'Value'"
        />
        <DeleteModal
          :modal-title="'valor'"
          :component-data="value"
          :message="'el valor'"
          @remove="splice(value.guid)"
        />
      </div>
      <div v-if="!iconsHidden">
        <b-link @click="$bvModal.show(`add-${guid}`)">
          <b-icon icon="plus-circle-fill" aria-hidden="true" /> Añadir valor
        </b-link>
      </div>
    </ul>
    <AddModal
      :guid="guid"
      :modal-title="'valor'"
      :component-data-type="'Value'"
      @save="save($event)"
    />
  </div>
</template>

<script lang="ts">
import { Component } from "@/Config/types";
import AddModal from "../Modal/AddModal.vue";
import EditModal from "../Modal/EditModal.vue";
import DeleteModal from "../Modal/DeleteModal.vue";

export default {
  name: "OtherView",
  components: {
    AddModal,
    EditModal,
    DeleteModal,
  },
  props: {
    otherData: {
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
      guid: crypto.randomUUID(),
      other: {} as Component,
      hide: false,
      add: false,
      valueNew: "",
      values: new Array<Component>(),
    };
  },
  methods: {
    cancel(): void {
      this.valueNew = "";
      this.add = false;
    },
    save(value: string): void {
      this.$nextTick(() => {
        this.other.childrens.push(new Component(crypto.randomUUID(), value));
        this.values.push(new Component(crypto.randomUUID(), value));
        this.cancel();
        this.$emit("update", this.other);
      });
    },
    splice(index: string): void {
      this.$nextTick(() => {
        this.other.childrens = this.other.childrens.filter(
          (data: any) => data.guid !== index
        );
        this.values = this.values.filter(
          (data: Component) => data.guid !== index
        );
        this.$emit("update", this.other);
      });
    },
  },
  mounted(): void {
    this.other = this.otherData;
    this.other.childrens = this.otherData.childrens;
  },
};
</script>
