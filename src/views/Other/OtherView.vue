<template>
  <div>
    <ul>
      <div v-for="(value, secondindex) in values" v-bind:key="secondindex">
        <li v-if="!hide">
          {{ value.name }}
          <b-link
            v-if="!iconsHidden"
            @click="$bvModal.show(`edit-value-${secondindex}`)"
          >
            <b-icon icon="pencil-square" aria-hidden="true" />
          </b-link>
          <b-link
            v-if="!iconsHidden"
            @click="$bvModal.show(`delete-value-${secondindex}`)"
          >
            <b-icon icon="x-circle-fill" aria-hidden="true" />
          </b-link>
        </li>
        <EditModal 
          :modal-id="'value'"
          :modal-title="'valor'"
          :component-data="value"
          :component-datatype="'Value'"
        />
        <DeleteModal 
          :modal-id="'value'"
          :modal-title="'valor'"
          :component-data="value"
          :message="'el valor'"
          @remove="splice(secondindex)"
        />
      </div>
      <div v-if="!iconsHidden">
        <b-link @click="$bvModal.show(`add-value-${otherIndex}`)">
          <b-icon icon="plus-circle-fill" aria-hidden="true" /> Añadir valor
        </b-link>
      </div>
    </ul>
    <AddModal 
      :modal-id="'value'"
      :modal-title="'valor'"
      :component-datatype="'Value'"
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
    DeleteModal
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
    otherIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      index: 0,
      other: {} as Component,
      hide: false,
      add: false,
      valueNew: "",
      values: new Array<Component>(),
    };
  },
  methods: {
    cancel() {
      this.valueNew = "";
      this.add = false;
    },
    save(value: string) {
      this.$nextTick(() => {
        this.other.childrens.push({
          id: this.index,
          guid: crypto.randomUUID(),
          name: value,
        });
        this.values.push({
          id: this.index,
          guid: crypto.randomUUID(),
          name: value,
        });

        this.index++;
        this.cancel();
        this.$emit("update", this.other);
      });
    },
    splice(index: number) {
      this.other.childrens.splice(index, 1);
      this.values.splice(index, 1);
      this.$emit("update", this.other);
    },
  },
  mounted() {
    this.other = this.otherData;
    this.other.childrens = this.otherData.childrens;
  },
};
</script>
