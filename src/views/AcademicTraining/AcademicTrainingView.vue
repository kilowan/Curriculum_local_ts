<template>
  <div v-if="academic != undefined">
    <div v-if="edit && !iconsHidden">
      <input type="text" v-model="academic.name" />
      <SaveLink v-if="!iconsHidden" @click="edit = false"/>
      <DeleteLink @click="$emit('delete', academic.guid)"/>
    </div>
    <div v-else>
      {{ academic.name }}
      <EditLink v-if="!iconsHidden" @click="edit = true"/>
      <DeleteLink @click="$emit('delete', academic.guid)"/>
    </div>
    <ul>
      <li v-if="edit">
        <label>{{ academic.place.field }}:</label>
        <input type="text" v-model="academic.place.value" />
      </li>
      <li v-else>{{ academic.place.field }}: {{ academic.place.value }}</li>
      <div v-if="academic.graduationDate">
        <li v-if="edit">
          <label>{{ academic.graduationDate.field }}:</label>
          <input
            type="date"
            v-model="academic.graduationDate.value"
            min="2015-01-01"
            max="2030-12-31"
          />
        </li>
        <li v-else>
          {{ academic.graduationDate.field }}: {{ formatDate(academic.graduationDate.value) }}
        </li>
      </div>
      <strong v-if="contents.length > 0" class="m-2">{{ academic.childrensTitle }}:</strong>
      <contents-view
        :contents="contents"
        :iconsHidden="iconsHidden"
        @reload="$emit('reload')"
      />
      <div v-if="add">
        <input class="m-2" type="text" v-model="element" />
        <b-button class="m-2" @click="save(element)">Guardar</b-button>
        <b-button class="m-2" @click="cancel">Cancelar</b-button>
      </div>
      <AddLink v-if="!iconsHidden && !add" :text="'contenido'" @click="add = true"/>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component } from "@/Config/Base/Component/Component";
import ContentsView from "../Content/ContentListView.vue";
import AddLink from "@/components/AddLink.vue";
import DeleteLink from "@/components/DeleteLink.vue";
import EditLink from "@/components/EditLink.vue";
import SaveLink from "@/components/SaveLink.vue";
import { ComponentType } from "@/Config/Base/Enums";

export default {
  name: "AcademicTrainingView",
  components: {
    ContentsView,
    AddLink,
    DeleteLink,
    EditLink,
    SaveLink
},
  props: {
    academic: {
      type: Component,
      required: true,
    },
    iconsHidden: {
      type: Boolean,
      required: true,
    },
    guid: {
      type: String,
      required: true,
    },
  },
  data(): any {
    return {
      contents: new Array<Component>(),
      add: false,
      element: "",
      edit: false,
    };
  },
  methods: {
    cancel(): void {
      this.element = "";
      this.add = false;
      this.edit = false;
    },
    save(content: string): void {
      this.$nextTick(() => {
        if (content !== "") {
          let data = new Component(crypto.randomUUID(), ComponentType.Content, content);
          this.academic.childrens.push(data);
          this.contents.push(data);
        }
        
        this.cancel();
        this.$emit("reload");
      });
    },
    formatDate(date: string): number {
      return new Date(date).getFullYear();
    },
  }
};
</script>
