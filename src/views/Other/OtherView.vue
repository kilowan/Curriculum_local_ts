<template>
  <div>
    <ul>
      <div v-for="value in values" v-bind:key="value.guid">
        <li v-if="!hide">
          {{ value.name }}
          <EditLink v-if="!iconsHidden" @click="$bvModal.show(`edit-${value.guid}`)"/>
          <DeleteLink v-if="!iconsHidden" @click="$bvModal.show(`delete-${value.guid}`)"/>
        </li>
        <EditModal
          :modalTitle="'valor'"
          :componentData="value"
          :componentDataType="11"
        />
        <DeleteModal
          :modalTitle="'valor'"
          :componentData="value"
          :message="'el valor'"
          @remove="splice(value.guid)"
        />
      </div>
      <div v-if="!iconsHidden">
        <AddLink :text="'valor'" @click="$bvModal.show(`add-${guid}`)"/>
      </div>
    </ul>
    <AddModal
      :guid="guid"
      :componentDataType="11"
      @save="save($event)"
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
  name: "OtherView",
  components: {
    AddModal,
    EditModal,
    DeleteModal,
    AddLink,
    DeleteLink,
    EditLink
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
    save(value: Component): void {
      this.$nextTick(() => {
        let component = new Component(value.guid, value.childrensDataType, value.name);
        this.other.childrens.push(component);
        this.values.push(component);
        this.cancel();
        this.$emit("update", this.other);
      });
    },
    splice(guid: string): void {
      this.$nextTick(() => {
        this.other.childrens = this.other.childrens.filter(
          (data: any) => data.guid !== guid
        );
        this.values = this.values.filter(
          (data: Component) => data.guid !== guid
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
