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
        <div v-for="language in languageList" v-bind:key="language.guid">
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
      <b-link
        v-if="!iconsHidden"
        :id="guid"
        @click="$bvModal.show('add-modal')"
      >
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
    DeleteModal,
  },
  props: {
    iconsHidden: {
      type: Boolean,
      required: true,
    },
  },
  data(): any {
    return {
      hide: false,
      add: false,
      languageLevelList: [],
      languageList: new Array<Component>(),
      language: {} as Component,
      guid: crypto.randomUUID(),
    };
  },
  methods: {
    refresh(): void {
      this.$emit("refresh");
    },
    splice(index: string): void {
      this.$emit(
        "update",
        this.languageList.filter((data: any) => data.guid !== index)
      );
    },
    cancel(): void {
      this.add = false;
      this.language.name = "";
      this.language.level = "";
    },
    update(langs: Array<Component>): void {
      this.$nextTick(() => {
        this.$emit("update", langs);
      });
    },
    save(language: Component): void {
      this.$nextTick(() => {
        let lang = new Component(crypto.randomUUID(), language.name);
        lang.level = language.level;
        this.languageList.push(lang);
        this.$emit("update", this.languageList);
        this.language = {} as Component;
      });
    },
  },
};
</script>
