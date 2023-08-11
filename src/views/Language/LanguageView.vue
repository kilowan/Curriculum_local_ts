<template>
  <div v-if="!hide">
    <dt id="idiomas" class="idiomas">
      Idiomas
      <b-link v-if="!iconsHidden" @click="(hide = true), $emit('hide')">
        <b-icon icon="eye-slash-fill" />
      </b-link>
    </dt>
    <dd id="languages">
      <ul>
        <div
          v-for="(language) in languageList"
          v-bind:key="language.guid"
        >
          <li>
            <strong>{{ language.name }}:</strong> {{ language.level }}
            <b-link
              v-if="!iconsHidden"
              @click="$bvModal.show(`edit-${language.guid}`)"
            >
              <b-icon icon="pencil-square" aria-hidden="true" />
            </b-link>
            <b-link
              v-if="!iconsHidden"
              @click="$bvModal.show(`delete-${language.guid}`)"
            >
              <b-icon icon="x-circle-fill" aria-hidden="true" />
            </b-link>
          </li>
          <EditModal 
           :modal-title="'Idioma'"
           :component-data="language"
           :component-data-type="'Language'"
           @update="update(languageList)"
          />
          <DeleteModal 
            :modal-title="'idioma'"
            :message="'el idioma'"
            :component-data="language"
            @remove="splice(language.guid)"
          />
        </div>
      </ul>
      <b-link v-if="!iconsHidden" @click="$bvModal.show(`add-${guid}`)">
        <b-icon icon="plus-circle-fill" aria-hidden="true" /> Añadir idioma
      </b-link>
    </dd>
    <dd class="clear"></dd>
    <AddModal 
      :guid="guid"
      :modal-title="'Idioma'"
      :component-data-type="'Language'"
      @save="save($event)"
    />
  </div>
</template>

<script lang="ts">
import { Component } from "../../Config/types";
import AddModal from "../Modal/AddModal.vue";
import EditModal from "../Modal/EditModal.vue";
import DeleteModal from "../Modal/DeleteModal.vue";

export default {
  name: "LanguagesView",
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
  },
  data() {
    return {
      hide: false,
      add: false,
      languageLevelList: [],
      languageList: new Array<Component>(),
      language: {} as Component,
      guid: crypto.randomUUID()
    };
  },
  methods: {
    refresh() {
      this.$emit("refresh");
    },
    splice(index: string) {
      this.$emit("update", this.languageList.filter(
        (data: any) => data.guid !== index
      ));
    },
    cancel() {
      this.add = false;
      this.language.name = "";
      this.language.level = "";
    },
    update(langs: any) {
      this.$nextTick(() => {
        this.$emit('update', langs);
      });
    },
    save(language: any) {
      this.$nextTick(() => {
        this.languageList.push({
          guid: crypto.randomUUID(),
          name: language.name,
          level: language.level,
        });
        this.$emit("update", this.languageList);
        this.language = {} as Component;
      });
    },
  },
};
</script>
