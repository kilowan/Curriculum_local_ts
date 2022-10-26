<template>
  <div>
    <ul>
      <div v-for="sub in subContents" v-bind:key="sub.id">
        <li>
          {{ sub.name }}
          <b-link
            v-if="!iconsHidden"
            @click="$bvModal.show(`edit-subcontent-${sub.id}`)"
          >
            <b-icon icon="pencil-square" aria-hidden="true" />
          </b-link>
          <b-link
            v-if="!iconsHidden"
            @click="$bvModal.show(`delete-subcontent-${sub.id}`)"
          >
            <b-icon icon="x-circle-fill" aria-hidden="true" />
          </b-link>
        </li>
        <b-modal
          :id="`delete-subcontent-${sub.id}`"
          title="Eliminar Contenido"
          ok-title="Eliminar"
          @ok="splice(sub.id)"
        >
          <div style="text-align: center; margin: 0 auto; width: 380px">
            <h1>¿Seguro que quieres eliminar el elemento '{{ sub.name }}'?</h1>
          </div>
        </b-modal>
        <b-modal
          :id="`edit-subcontent-${sub.id}`"
          title="Editar Contenido"
          ok-title="Guardar"
          @cancel="cancel"
        >
          <div style="text-align: center; margin: 0 auto; width: 380px">
            <input class="m-2" type="text" v-model="sub.name" />
          </div>
        </b-modal>
      </div>
      <b-link
        v-if="!iconsHidden"
        @click="$bvModal.show(`add-subcontent-${contentIndex}`)"
      >
        <b-icon icon="plus-circle-fill" aria-hidden="true" />Añadir SubContenido
      </b-link>
    </ul>
    <b-modal
      :id="`add-subcontent-${contentIndex}`"
      title="Añadir SubContenido"
      ok-title="Guardar"
      @ok="addOne(subcontent)"
    >
      <div style="text-align: center; margin: 0 auto; width: 380px">
        <input
          class="m-2"
          type="text"
          placeholder="Nuevo subcontenido"
          v-model="subcontent"
        />
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { SubContent, Content } from "@/Config/types";

export default {
  name: "ContentView",
  props: {
    content: {
      type: Object,
      required: true,
    },
    iconsHidden: {
      type: Boolean,
      required: true,
    },
    contentIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      contentData: {} as Content,
      subcontent: "",
      subContents: new Array<SubContent>(),
      index: 0,
    };
  },
  methods: {
    splice(index: number) {
      this.subContents = this.subContents.filter(
        (data: any) => data.id !== index
      );
      this.$emit("update", this.subContents);
    },
    addOne(subContent: string) {
      this.subContents.push({ id: this.index, name: subContent });
      this.index++;
      this.$emit("update", this.subContents);
      this.subcontent = "";
    },
    cancel() {
      this.contentData = this.content;
    },
  },
  mounted() {
    this.contentData = this.content;
    this.subContents = this.content.subContents;
    this.index = this.content.subContents.length === 0 || this.content.subContents === undefined || this.content.subContents === null? 0 : this.content.subContents.length-1;
  },
};
</script>
