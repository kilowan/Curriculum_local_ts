<template>
  <div v-if="!hide">
    <dt id="idiomas" class="idiomas">
      Idiomas
      <HideLink v-if="!iconsHidden" @click="(hide = true), $emit('hide')"/>
    </dt>
    <dd id="languages">
      <ul>
        <div v-for="language in input.childrens" v-bind:key="language.guid">
          <li>
            <strong>{{ language.name }}:</strong> {{ language.level }}
            <EditLink v-if="!iconsHidden" @click="$bvModal.show(`edit-${language.guid}`)"/>
            <DeleteLink v-if="!iconsHidden" @click="$bvModal.show(`delete-${language.guid}`)"/>
          </li>
          <EditModal
            :modalTitle="'Idioma'"
            :componentData="language"
            :componentDataType="4"
          />
          <DeleteModal
            :modalTitle="'idioma'"
            :message="'el idioma'"
            :componentData="language"
            @remove="splice(language)"
          />
        </div>
      </ul>
      <AddLink v-if="!iconsHidden" :text="'idioma'" @click="$bvModal.show(`add-${guid}`)"/>
    </dd>
    <dd class="clear"></dd>
    <AddModal
      :guid="guid"
      :componentDataType="4"
      @save="save($event)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Module } from "../../Config/types";
import AddModal from "../Modal/AddModal.vue";
import EditModal from "../Modal/EditModal.vue";
import DeleteModal from "../Modal/DeleteModal.vue";
import AddLink from "@/components/AddLink.vue";
import DeleteLink from "@/components/DeleteLink.vue";
import HideLink from "@/components/HideLink.vue";
import EditLink from "@/components/EditLink.vue";

export default {
  name: "LanguagesView",
  components: {
    AddModal,
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
      languageLevelList: [],
      language: {} as Component,
      guid: crypto.randomUUID(),
    };
  },
  methods: {
    splice(element: Component): void {
      this.input.childrens.splice(this.input.childrens.indexOf(element), 1);
      this.$emit("update", this.input);
    },
    cancel(): void {
      this.add = false;
      this.language.name = "";
      this.language.level = "";
    },
    save(language: Component): void {
      this.$nextTick(() => {
        let lang = new Component(crypto.randomUUID(), language.childrensDataType, language.name);
        lang.level = language.level;
        this.input.childrens.push(lang);
        this.$emit("update", this.input);
        this.language = {} as Component;
      });
    },
  },
};
</script>
