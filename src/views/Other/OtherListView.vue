<template>
  <div v-if="!hide">
    <dt id="otros" class="otros" v-if="other">
      Otros datos
      <b-link v-if="!iconsHidden" @click="(hide = true)">
        <b-icon icon="eye-slash-fill" />
      </b-link>
    </dt>
    <dd id="other" v-if="other">
      <ul>
        <div v-for="otherData in other" v-bind:key="otherData.guid">
          <li>
            {{ otherData.name }}
            <b-link
              v-if="!iconsHidden"
              @click="$bvModal.show(`edit-other-${otherData.guid}`)"
            >
              <b-icon icon="pencil-square" aria-hidden="true" />
            </b-link>
            <b-link
              v-if="!iconsHidden"
              @click="$bvModal.show(`delete-other-${otherData.guid}`)"
            >
              <b-icon icon="x-circle-fill" aria-hidden="true" />
            </b-link>
            <other-view
              :otherData="otherData"
              :iconsHidden="iconsHidden"
              :otherIndex="otherData.id"
              @update="refresh($event)"
            />
          </li>
          <edit-modal 
            :modal-id="'other'"
            :modal-title="'Otros'"
            :component-data="otherData"
            :component-datatype="'Other'"
            @update="update($event)"
          />
          <delete-modal 
            :modal-id="'other'"
            :modal-title="'elemento'"
            :message="'el elemento'"
            :component-data="otherData"
            @remove="splice(otherData.id)"
          />
        </div>
      </ul>
      <div v-if="add">
        <input type="text" v-model="otherNew" />
        <b-button class="m-2" @click="save(otherNew)">Guardar</b-button>
        <b-button class="m-2" @click="cancel">Cancelar</b-button>
      </div>
      <b-link
        v-if="!iconsHidden && !add"
        @click="(add = true)"
      >
        <b-icon icon="plus-circle-fill" aria-hidden="true" /> Añadir Otros Datos
      </b-link>
    </dd>
    <dd class="clear"></dd>
  </div>
</template>

<script lang="ts">
import otherView from "./OtherView.vue";
import { Component } from "@/Config/types";
import DeleteModal from "../Modal/DeleteModal.vue";
import EditModal from "../Modal/EditModal.vue";

export default {
  name: "OtherListView",
  components: {
    otherView,
    EditModal,
    DeleteModal
  },
  props: {
    iconsHidden: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      index: 0,
      hide: false,
      add: false,
      counter: 0,
      otherNew: "",
      other: new Array<Component>(),
    };
  },
  methods: {
    cancel() {
      this.otherNew = "";
      this.add = false;
    },
    save(otherNew: string) {
      this.$nextTick(() => {
        this.other.push({
          id: this.index,
          name: otherNew,
          childrens: new Array<Component>(),
        });
        this.index++;
        this.$emit("update", this.other);
        this.cancel();
      });
    },
    refresh(other: Component) {
      var dat = this.other.find((data: any) => data.id === other.id);
      dat = other;
      this.other = this.other.filter((data: any) => data.id !== other.id);
      this.other.push(dat);
      this.$emit("update", this.other);
    },
    update(others: any) {
      this.$nextTick(() => {
        this.$emit('update', others);
      });
    },
    splice(index: number) {
      this.other = this.other.filter((data: any) => data.id !== index);
      this.$emit("update", this.other);
    },
  },
};
</script>
