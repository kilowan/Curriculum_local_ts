<template>
  <b-modal
    v-if="componentData != undefined"
    :id="`edit-${componentData.guid}`"
    :title="`Editar ${modalTitle}`"
    ok-title="Guardar"
  >
    <KeyValue
      v-if="componentData.type != undefined && modalTitle == 'red social'"
      :type="2"
      :disabled="true"
      :options="types"
      :field="'Tipo'"
      :value="componentData.type"
    />
    <KeyValue
      v-if="componentData.name != undefined"
      :type="1"
      :field="modalTitle == 'red social' ? 'Url' : 'Nombre'"
      :value="componentData.name"
    />
    <KeyValue
      v-if="componentData.level != undefined"
      :type="1"
      :field="'Nivel'"
      :value="componentData.level"
    />
    <KeyValue
      v-if="componentData.place != undefined"
      :type="1"
      :field="'Centro/Lugar'"
      :value="componentData.place"
    />
    <KeyValue
      v-if="componentData.initDate != undefined"
      :type="3"
      :field="'Fecha de inicio'"
      :value="componentData.initDate"
    />
    <KeyValue
      v-if="componentData.finishDate != undefined"
      :type="3"
      :field="'Fecha de fin'"
      :value="componentData.finishDate"
    />
    <KeyValue
      v-if="componentData.graduationDate != undefined"
      :type="3"
      :field="'Graduación'"
      :value="componentData.graduationDate"
    />
  </b-modal>
</template>

<script lang="ts">
import { Component } from "@/Config/Base/Component/Component";
import { SocialMediaType } from "@/Config/Base/Enums";
import { Option } from "@/Config/Base/Option";
import KeyValue from "@/components/KeyValue.vue";
export default {
  name: "EditModal",
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
