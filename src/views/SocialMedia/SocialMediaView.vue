<template>
  <div v-if="input.type === 1">
    <b-icon icon="linkedin" aria-hidden="true" />
    <a :href="'https://www.linkedin.com/in/' + input.name + '/'">{{
      "https://www.linkedin.com/in/" + input.name + "/"
    }}</a>
  </div>
  <div v-else-if="input.type === 3">
    <b-icon icon="github" aria-hidden="true" />
    <a :href="'https://github.com/' + input.name + '/'">{{
      "https://github.com/" + input.name + "/"
    }}</a>
  </div>
  <div v-else>
    <b-icon icon="link" aria-hidden="true" />
    <a
      :href="
        'https://www.infojobs.net/candidate/my-infojobs.xhtml?dgv=' +
        input.name
      "
      >{{
        "https://www.infojobs.net/candidate/my-infojobs.xhtml?dgv=" +
        input.name
      }}</a
    >
  </div>
</template>

<script lang="ts">
import { SocialMediaType } from "../../Config/types";
import { Component } from "../../Config/types";

export default {
  name: "SocialMediaView",
  props: {
    input: {
      type: Component,
      required: true,
    },
  },
  data() {
    return {
      sociamMediaTypes: [
        { value: SocialMediaType.Linkedin, text: "Linkedin" },
        { value: SocialMediaType.Infojobs, text: "Infojobs" },
        { value: SocialMediaType.GitHub, text: "GitHub" },
      ],
    };
  },
};
</script>
