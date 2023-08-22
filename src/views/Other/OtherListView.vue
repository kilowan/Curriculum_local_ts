<template>
  <div v-if="!hide">
    <dt id="otros" class="otros" v-if="input.childrens">
      Otros datos
      <HideLink v-if="!iconsHidden" @click="hide = true"/>
    </dt>
    <dd id="other" v-if="input.childrens != undefined">
      <ul>
        <div v-for="otherData in input.childrens" v-bind:key="otherData.guid">
          <li>
            {{ otherData.name }}
            <EditLink v-if="!iconsHidden" @click="$bvModal.show(`edit-${otherData.guid}`)"/>
            <DeleteLink v-if="!iconsHidden" @click="$bvModal.show(`delete-${otherData.guid}`)"/>
            <other-view
              :otherData="otherData"
              :iconsHidden="iconsHidden"
              @reload="$emit('reload', input)"
            />
          </li>
          <edit-modal
            :modalTitle="'Otros'"
            :componentData="otherData"
            :componentDataType="5"
          />
          <delete-modal
            :modalTitle="'elemento'"
            :message="'el elemento'"
            :componentData="otherData"
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
import { Component, Module, ComponentType } from "@/Config/types";
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
    input: {
      type: Module,
      required: true
    }
  },
  data(): any {
    return {
      hide: false,
      add: false,
      otherNew: ""
    };
  },
  methods: {
    cancel(): void {
      this.otherNew = "";
      this.add = false;
    },
    save(otherNew: string): void {
      this.$nextTick(() => {
        this.input.childrens.push(
          new Component(crypto.randomUUID(), 
          ComponentType.SubContent, 
          otherNew
        ));
        this.$emit("update", this.input);
        this.cancel();
      });
    },
    splice(guid: string): void {
      this.input.childrens = this.input.childrens.filter((data: any) => data.guid !== guid);
      this.$emit("update", this.input);
    },
  },
};
</script>
