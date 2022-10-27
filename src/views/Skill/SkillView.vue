<template>
  <ul>
    <div>
      <contents-view
        :ref="'contents'"
        :contents="skill.contents"
        :iconsHidden="iconsHidden"
        @update="update($event)"
      />
    </div>
    <div v-if="add">
      <input class="m-2" type="text" v-model="element" />
      <b-button class="m-2" @click="save(element)">Guardar</b-button>
      <b-button class="m-2" @click="cancel">Cancelar</b-button>
    </div>
    <b-link v-if="!iconsHidden" @click="add = true">
      <b-icon icon="plus-circle-fill" aria-hidden="true" /> Añadir contenido
    </b-link>
  </ul>
</template>

<script lang="ts">
import ContentsView from "../Content/ContentsView.vue";
import { ContentType, Training, Content, SubContent } from "../../Config/types";

export default {
  name: "ComplementaryExperienceView",
  components: {
    ContentsView,
  },
  props: {
    skill: {
      type: Object,
      required: true,
    },
    iconsHidden: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      ContentType: ContentType,
      skillData: {} as Training,
      contents: new Array<Content>(),
      add: false,
      element: "",
      index: 0,
    };
  },
  methods: {
    cancel() {
      this.element = "";
      this.add = false;
    },
    save(content: string) {
      this.$nextTick(() => {
        this.contents.push({
          id: this.index,
          name: content,
          subContents: new Array<SubContent>(),
        });

        this.skillData.contents.push({
          id: this.index,
          name: content,
          subContents: new Array<SubContent>(),
        });
        this.index++;
        this.cancel();
        this.$emit("update", this.skillData);
      });
    },
    update(contents: Array<Content>) {
      this.$nextTick(() => {
        this.skillData.contents = contents;
        this.$emit("update", this.skillData);
      });
    },
  },
  mounted() {
    this.skillData = this.skill;
    this.$refs.contents._data.contentsData = this.skill.contents;
    this.index = this.skill.contents.length === 0 || this.skill.contents === undefined || this.skill.contents === null? 0 : this.skill.contents.length-1;
  },
};
</script>
