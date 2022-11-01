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
          v-for="language in languageList" v-bind:key="language.id"
        >
          <li>
            <strong>{{ language.name }}:</strong> {{ language.level }}
            <b-link
              v-if="!iconsHidden"
              @click="$bvModal.show(`edit-language-${language.id}`)"
            >
              <b-icon icon="pencil-square" aria-hidden="true" />
            </b-link>
            <b-link
              v-if="!iconsHidden"
              @click="$bvModal.show(`delete-language-${language.id}`)"
            >
              <b-icon icon="x-circle-fill" aria-hidden="true" />
            </b-link>
          </li>
          <EditModal
            :modal-id="'language'"
            :modal-title="'Idioma'"
            :component-data="language"
            :component-datatype="'Language'"
            @update="update(languageList)"
          />
          <DeleteModal
            :modal-id="'language'"
            :modal-title="'idioma'"
            :message="'el idioma'"
            :component-data="language"
            @remove="splice(language.id)"
          />
        </div>
      </ul>
      <b-link v-if="!iconsHidden" @click="$bvModal.show('add-language')">
        <b-icon icon="plus-circle-fill" aria-hidden="true" /> Añadir idioma
      </b-link>
    </dd>
    <dd class="clear"></dd>
    <AddModal
      :modal-id="'language'"
      :modal-title="'Idioma'"
      :component-datatype="'Language'"
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
  name: "AcademicTrainingView",
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
  data() {
    return {
      hide: false,
      add: false,
      languageLevelList: [],
      languageList: new Array<Component>(),
      language: {} as Component,
      sameInstance: false,
      index: 1,
    };
  },
  methods: {
    loadIdentifier(index: number) {
      if (index >= this.$store.state.identifier)
        this.$store.state.identifier = index;
    },
    splice(index: number) {
      this.languageList.splice(index, 1);
      this.$emit("update", this.languageList);
    },
    update(langs: any) {
      this.$nextTick(() => {
        this.$emit("update", langs);
      });
    },
    save(language: any) {
      this.$nextTick(() => {
        this.languageList.push(language);
        this.$emit("update", this.languageList);
        this.language = {} as Component;
      });
    },
  },
  mounted() {
    if (
      this.languageList.length !== 0 &&
      this.languageList !== undefined &&
      this.languageList !== null
    ) {
      var sorted = this.languageList.sort((a: any, b: any) => {
        return a.id - b.id;
      });
      var last: Component = sorted[sorted.length - 1];
      this.loadIdentifier(last.id);
    }
  },
};
</script>
