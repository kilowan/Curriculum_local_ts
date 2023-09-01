<template>
  <div id="contact-info" class="vcard">
    <div v-if="!active">
      <!--name-->
      <h1 class="fn">
        <input
          type="text"
          v-model="fullName.value"
          :placeholder="fullName.field"
        />
      </h1>
      <!--phoneNumber-->
      <b-icon icon="telephone-fill" aria-hidden="true" />
      <input
        type="text"
        v-model="phoneNumber.value"
        :placeholder="phoneNumber.field"
      /><br />
      <!--email-->
      <b-icon icon="envelope" aria-hidden="true" />
      <input
        type="text"
        v-model="email.value"
        :placeholder="email.field"
      />
    </div>
    <div v-else>
      <h1 class="fn">{{ fullName.value }}</h1>
      <div>
        <b-icon icon="telephone-fill" aria-hidden="true" />
        <span>{{ phoneNumber.value }}</span
        ><br />
      </div>
      <div>
        <b-icon icon="envelope" aria-hidden="true" />
        <a :href="`mailto:${email.value}`">{{ email.value }}</a><br />
      </div>
    </div>
    <!--social media-->
    <social-media-list-view
      v-if="socialMedia"
      :input="socialMedia"
      :iconsHidden="active"
      @update="$emit('update', $event)"
    />
    <!--description-->
    <div id="objective">
      <b-form-textarea
      v-if="!active"
      :placeholder="description.field? description.field: 'Description'"
      v-model="description.value"
      rows="3"
      max-rows="5"
    />
      <p v-else>{{ description.value }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { FieldValue } from "@/Config/Base/FieldValue/FieldValue";
import SocialMediaListView from "./SocialMedia/SocialMediaListView.vue";

export default {
  name: "PersonalDataView",
  components: {
    SocialMediaListView,
  },
  props: {
    fullName: {
      type: FieldValue,
      required: true,
    },
    phoneNumber: {
      type: FieldValue,
      required: true,
    },
    email: {
      type: FieldValue,
      required: true,
    },
    description: {
      type: FieldValue,
      required: true,
    },
    socialMedia: {
      type: Array,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  data(): any {
    return {};
  },
};
</script>
