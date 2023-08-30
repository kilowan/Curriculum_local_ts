<template>
  <b-modal
    v-if="componentData != undefined"
    :id="`edit-${componentData.guid}`"
    :title="`Editar ${modalTitle}`"
    ok-title="Guardar"
  >
    <KeyValue
      v-if="componentData.name != undefined"
      :type="1"
      :field="'Nombre'"
      :value="componentData.name"
    />
    <input
      v-if="componentData.level != undefined"
      type="text"
      v-model="componentData.level.field"
    />
    <input
      v-if="componentData.level != undefined"
      type="text"
      v-model="componentData.level.value"
    />
    <input
      v-if="componentData.place != undefined"
      type="text"
      v-model="componentData.place.field"
    />
    <input
      v-if="componentData.place != undefined"
      type="text"
      v-model="componentData.place.value"
    />
    <input
      v-if="componentData.initDate != undefined"
      type="text"
      v-model="componentData.initDate.field"
    />
    <input
      v-if="componentData.initDate != undefined"
      type="date"
      v-model="componentData.initDate.value"
      min="2015-01-01"
      max="2030-12-31"
    />
    <input
      v-if="componentData.finishDate != undefined"
      type="text"
      v-model="componentData.finishDate.field"
    />
    <input
      v-if="componentData.finishDate != undefined"
      type="date"
      v-model="componentData.finishDate.value"
      min="2015-01-01"
      max="2030-12-31"
    />
    <input
      v-if="componentData.graduationDate != undefined"
      type="text"
      v-model="componentData.graduationDate.field"
    />
    <input
      v-if="componentData.graduationDate != undefined"
      type="date"
      v-model="componentData.graduationDate.value"
      min="2015-01-01"
      max="2030-12-31"
    />
  </b-modal>
</template>

<script lang="ts">
import { Component } from "@/Config/Base/Component/Component";
import { SocialMediaType } from "@/Config/Base/Enums";
import { Option } from "@/Config/Base/Option";
import KeyValue from "@/components/KeyValue.vue";
export default {
  name: "EditNewModal",
  props: {
    componentData: {
      type: Component,
      required: true,
    },
    modalTitle: {
      type: String,
      required: true,
    },
  },
  data(): any {
    return {
      types: [
        new Option(SocialMediaType.Linkedin, "Linkedin", false),
        new Option(SocialMediaType.Infojobs, "Infojobs", false),
        new Option(SocialMediaType.GitHub, "GitHub", false),
      ],
    };
  },
  components: { KeyValue },
};
</script>
