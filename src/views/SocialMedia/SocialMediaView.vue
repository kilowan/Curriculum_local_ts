<template>
  <div v-if="input.type === 1">
    <b-icon icon="linkedin" aria-hidden="true" />
    <a :href="'https://www.linkedin.com/in/' + input.name.value + '/'">{{
      "https://www.linkedin.com/in/" + input.name.value + "/"
    }}</a>
  </div>
  <div v-else-if="input.type === 3">
    <b-icon icon="github" aria-hidden="true" />
    <a :href="'https://github.com/' + input.name.value + '/'">{{
      "https://github.com/" + input.name.value + "/"
    }}</a>
  </div>
  <div v-else>
    <b-icon icon="link" aria-hidden="true" />
    <a
      :href="
        'https://www.infojobs.net/candidate/my-infojobs.xhtml?dgv=' +
        input.name.value
      "
      >{{
        "https://www.infojobs.net/candidate/my-infojobs.xhtml?dgv=" +
        input.name.value
      }}</a
    >
  </div>
</template>

<script lang="ts">
import { Component } from "@/Config/Base/Component/Component";
import { SocialMediaType } from "@/Config/Base/Enums";
import { Option } from "@/Config/Base/Option";

export default {
  name: "SocialMediaView",
  props: {
    input: {
      type: Component,
      required: true,
    },
  },
  data(): any {
    return {
      sociamMediaTypes: [
        new Option(SocialMediaType.Linkedin, "Linkedin", false),
        new Option(SocialMediaType.Infojobs, "Infojobs", false),
        new Option(SocialMediaType.GitHub, "GitHub", false),
      ],
    };
  },
};
</script>
