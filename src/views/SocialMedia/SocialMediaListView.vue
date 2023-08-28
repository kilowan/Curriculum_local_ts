<template>
  <div>
    <div
      v-for="socialMediaData in input"
      v-bind:key="socialMediaData.guid"
      class="d-flex"
    >
      <social-media-view :input="socialMediaData" />
      <EditLink
        v-if="!iconsHidden"
        @click="$bvModal.show(`edit-${socialMediaData.guid}`)"
      />
      <DeleteLink
        v-if="!iconsHidden"
        @click="$bvModal.show(`delete-${socialMediaData.guid}`)"
      />
      <edit-modal :modalTitle="'red social'" :componentData="socialMediaData" />
      <delete-modal
        :modal-title="'Red social'"
        :message="'la red social'"
        :component-data="socialMediaData"
        @remove="splice(socialMediaData)"
      />
    </div>
    <AddLink
      v-if="!iconsHidden"
      :hidden="count === 0"
      :text="'Red social'"
      @click="$bvModal.show('add-social-media')"
    />
    <b-modal
      :id="'add-social-media'"
      title="Añadir Red Social"
      ok-title="Guardar"
      @ok="add(socialmedia)"
      @ok-prevent="socialmedia.name == ''"
    >
      <label>Tipo</label>
      <b-form-select :options="types" v-model="socialmedia.type" /> <br />
      <KeyValue
        :type="1"
        :field="
          socialmedia.type === 1
            ? 'Id linkedin'
            : socialmedia.type === 2
            ? 'Id infojobs'
            : 'Id github'
        "
        :value="socialmedia.name"
      /><br />
    </b-modal>
    <br />
  </div>
</template>

<script lang="ts">
import SocialMediaView from "./SocialMediaView.vue";
import DeleteModal from "../Modal/DeleteModal.vue";
import EditModal from "../Modal/EditModal.vue";
import AddLink from "@/components/AddLink.vue";
import DeleteLink from "@/components/DeleteLink.vue";
import EditLink from "@/components/EditLink.vue";
import KeyValue from "@/components/KeyValue.vue";
import { SocialMediaType } from "@/Config/Base/Enums";
import { Component } from "@/Config/Base/Component/Component";

export default {
  name: "SocialMediaListView",
  components: {
    SocialMediaView,
    DeleteModal,
    AddLink,
    DeleteLink,
    EditLink,
    EditModal,
    KeyValue,
  },
  props: {
    iconsHidden: {
      type: Boolean,
      required: true,
      default: false,
    },
    input: {
      type: Array,
      required: true,
    },
  },
  data(): any {
    return {
      types: [
        { value: SocialMediaType.Linkedin, text: "Linkedin", disabled: false },
        { value: SocialMediaType.Infojobs, text: "Infojobs", disabled: false },
        { value: SocialMediaType.GitHub, text: "GitHub", disabled: false },
      ],
      socialmedia: {} as Component,
      count: 3,
      guid: crypto.randomUUID(),
    };
  },
  methods: {
    add(socialMedia: Component): void {
      socialMedia.guid = crypto.randomUUID();
      this.input.push(socialMedia);
      var type = this.types.find(
        (element: any) => element.value === socialMedia.type
      );
      if (type !== undefined) type.disabled = true;
      this.$emit("update", this.input);
      this.socialmedia = {} as Component;
      this.count--;
    },
    select(type: number) {
      this.componentData.type = type;
    },
    splice(element: Component): void {
      let type = this.types.find(
        (element: any) => element.value === element.type
      );
      if (type !== undefined) type.disabled = false;

      this.input.splice(this.input.indexOf(element), 1);
      this.count++;
      this.$emit("update", this.input);
    },
  },
};
</script>
