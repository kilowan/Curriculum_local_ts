<template>
  <div v-if="!edit">
    <div v-if="type.value == 1">
      <b-icon icon="linkedin" aria-hidden="true" />
      <a :href="`${linkedin + name.value}/`"> {{ linkedin + name.value }}/ </a>
    </div>
    <div v-else-if="type.value == 3">
      <b-icon icon="github" aria-hidden="true" />
      <a :href="`${github + name.value}/`"> {{ github + name.value }}/ </a>
    </div>
    <div v-else>
      <b-icon icon="link" aria-hidden="true" />
      <a :href="infojobs + name.value">
        {{ infojobs + name.value }}
      </a>
    </div>
  </div>
  <div v-else>
    <label>Tipo: </label>
    <b-form-select :disabled="!add" :options="types" v-model="type.value">
    </b-form-select
    ><br />
    <label>Url:</label>
    <input type="text" v-model="name.value" />
  </div>
</template>

<script lang="ts">
const linkedin = "https://www.linkedin.com/in/";
const github = "https://github.com/";
const infojobs = "https://www.infojobs.net/candidate/my-infojobs.xhtml?dgv=";

import { SocialMediaType } from "@/Config/Base/Enums";
import { FieldValue } from "@/Config/Base/FieldValue/FieldValue";
import { Option } from "@/Config/Base/Option";
import { SocialMedia } from "@/Config/SocialMedia/SocialMedia";

export default {
  name: "SocialMediaView",
  props: {
    name: {
      type: FieldValue,
      required: true,
    },
    type: {
      type: FieldValue,
      required: true,
    },
    edit: {
      type: Boolean,
      default: false,
    },
    add: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array,
      required: false,
    },
  },
  data(): any {
    return {
      types: [
        new Option(SocialMediaType.Linkedin, "Linkedin", false),
        new Option(SocialMediaType.Infojobs, "Infojobs", false),
        new Option(SocialMediaType.GitHub, "GitHub", false),
      ],
      linkedin: linkedin,
      github: github,
      infojobs: infojobs,
    };
  },
  methods: {
    getValue(value: string): string{
      return value;
    }
  },
  mounted() {
    if(this.list && this.list.length > 0 && this.add) {
      this.list.forEach((media: SocialMedia) => {
        this.types = this.types.map((option: Option) => {
          if(option.value === media.type.value) option.disabled = true;
          return option;
        });
      });
    };
  },
};
</script>
