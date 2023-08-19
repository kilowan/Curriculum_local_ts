<template>
  <div v-if="!hide">
    <dt id="otros" class="otros" v-if="other">
      Otros datos
      <HideLink v-if="!iconsHidden" @click="hide = true"/>
    </dt>
    <dd id="other" v-if="other">
      <ul>
        <div v-for="otherData in other" v-bind:key="otherData.guid">
          <li>
            {{ otherData.name }}
            <EditLink v-if="!iconsHidden" @click="$bvModal.show(`edit-${otherData.guid}`)"/>
            <DeleteLink v-if="!iconsHidden" @click="$bvModal.show(`delete-${otherData.guid}`)"/>
            <other-view
              :otherData="otherData"
              :iconsHidden="iconsHidden"
              @update="refresh($event)"
            />
          </li>
          <edit-modal
            :modal-title="'Otros'"
            :component-data="otherData"
            :component-data-type="'Other'"
            @update="update($event)"
          />
          <delete-modal
            :modal-title="'elemento'"
            :message="'el elemento'"
            :component-data="otherData"
            @remove="splice(otherData.guid)"
          />
        </div>
      </ul>
      <div v-if="add">
        <input type="text" v-model="otherNew" />
        <b-button class="m-2" @click="save(otherNew)">Guardar</b-button>
        <b-button class="m-2" @click="cancel">Cancelar</b-button>
      </div>
      <AddLink v-if="!iconsHidden && !add" :text="'Otros Datos'" @click="add = true"/>
    </dd>
    <dd class="clear"></dd>
  </div>
</template>

<script lang="ts">
import otherView from "./OtherView.vue";
import { Component } from "@/Config/types";
import DeleteModal from "../Modal/DeleteModal.vue";
import EditModal from "../Modal/EditModal.vue";
import AddLink from "@/components/AddLink.vue";
import DeleteLink from "@/components/DeleteLink.vue";
import HideLink from "@/components/HideLink.vue";
import EditLink from "@/components/EditLink.vue";

export default {
  name: "OtherListView",
  components: {
    otherView,
    EditModal,
    DeleteModal,
    AddLink,
    DeleteLink,
    HideLink,
    EditLink
},
  props: {
    iconsHidden: {
      type: Boolean,
      required: true,
    },
    guid: {
      type: String,
      rewuired: true,
    },
  },
  data(): any {
    return {
      hide: false,
      add: false,
      counter: 0,
      otherNew: "",
      other: new Array<Component>(),
    };
  },
  methods: {
    cancel(): void {
      this.otherNew = "";
      this.add = false;
    },
    save(otherNew: string): void {
      this.$nextTick(() => {
        this.other.push({
          guid: crypto.randomUUID(),
          name: otherNew,
          childrens: new Array<Component>(),
        });
        this.$emit("update", this.other);
        this.cancel();
      });
    },
    refresh(other: Component): void {
      let dat = this.other.find((data: any) => data.guid === other.guid);
      dat = other;
      this.other = this.other.filter((data: any) => data.guid !== other.guid);
      this.other.push(dat);
      this.$emit("update", this.other);
    },
    update(others: Array<Component>): void {
      this.$nextTick(() => {
        this.$emit("update", others);
      });
    },
    splice(index: string): void {
      this.other = this.other.filter((data: any) => data.guid !== index);
      this.$emit("update", this.other);
    },
  },
};
</script>
