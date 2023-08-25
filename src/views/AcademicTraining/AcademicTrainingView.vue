<template>
  <div v-if="input != undefined">
    <div v-if="edit && !iconsHidden">
      <input type="text" v-model="input.name" />
      <SaveLink v-if="!iconsHidden" @click="edit = false"/>
      <DeleteLink @click="$emit('delete', input.guid)"/>
    </div>
    <div v-else>
      {{ input.name }}
      <EditLink v-if="!iconsHidden" @click="edit = true"/>
      <DeleteLink @click="$emit('delete', input.guid)"/>
    </div>
    <ul>
      <li v-if="edit">
        <label>{{ input.place.field }}:</label>
        <input type="text" v-model="input.place.value" />
      </li>
      <li v-else>{{ input.place.field }}: {{ input.place.value }}</li>
      <div v-if="input.graduationDate">
        <li v-if="edit">
          <label>{{ input.graduationDate.field }}:</label>
          <input
            type="date"
            v-model="input.graduationDate.value"
            min="2015-01-01"
            max="2030-12-31"
          />
        </li>
        <li v-else>
          {{ input.graduationDate.field }}: {{ formatDate(input.graduationDate.value) }}
        </li>
      </div>
      <li  v-if="input.childrens != undefined && input.childrens.length > 0">
        <strong class="m-2">{{ input.childrensTitle }}:</strong>
        <ul>
          <contents-view
            :input="input.childrens"
            :iconsHidden="iconsHidden"
            @reload="$emit('reload')"
          />
        </ul>
      </li>
      <div v-if="add">
        <input class="m-2" type="text" v-model="element" />
        <b-button class="m-2" @click="save(element)">Guardar</b-button>
        <b-button class="m-2" @click="cancel">Cancelar</b-button>
      </div>
      <AddLink v-if="!iconsHidden && !add" :text="getModalTitle" @click="add = true"/>
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
import { Training } from "@/Config/Training/Training";

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
    input: {
      type: Training,
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
          this.input.childrens.push(data);
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
