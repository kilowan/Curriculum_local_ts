<template>
  <div>
    <div
      v-for="socialMediaData in input"
      v-bind:key="socialMediaData.guid"
      class="d-flex"
    >
      <social-media-view
        :name="socialMediaData.name"
        :type="socialMediaData.type"
      />
      <edit-link
        v-show="!iconsHidden"
        @click="$bvModal.show(`edit-${socialMediaData.guid}`)"
      />
      <delete-link
        v-show="!iconsHidden"
        @click="$bvModal.show(`delete-${socialMediaData.guid}`)"
      />
      <edit-new-modal
        :modalTitle="'red social'"
        :componentData="socialMediaData"
        :childrensDataType="13"
      />
      <delete-modal
        :modal-title="'Red social'"
        :message="'la red social'"
        :component-data="socialMediaData"
        @remove="splice(socialMediaData)"
      />
    </div>
    <add-new-link
      v-show="!iconsHidden && input.length < 3"
      :type="13"
      @click="$bvModal.show(`add-${guid}`)"
    />
    <add-new-modal
      :guid="guid"
      :modalTitle="'Red social'"
      :childrensDataType="13"
      :list="input"
      @save="add($event)"
    />
    <br />
  </div>
</template>

<script lang="ts">
import SocialMediaView from "./SocialMediaView.vue";
import DeleteModal from "../Modal/DeleteModal.vue";
import EditNewModal from "../Modal/EditNewModal.vue";
import AddNewModal from "../Modal/AddNewModal.vue";
import AddNewLink from "@/components/AddNewLink.vue";
import DeleteLink from "@/components/DeleteLink.vue";
import EditLink from "@/components/EditLink.vue";
import { SocialMediaType } from "@/Config/Base/Enums";
import { Option } from "@/Config/Base/Option";
import { SocialMedia } from "@/Config/SocialMedia/SocialMedia";

export default {
  name: "SocialMediaListView",
  components: {
    SocialMediaView,
    DeleteModal,
    AddNewLink,
    DeleteLink,
    EditLink,
    EditNewModal,
    AddNewModal,
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
      socialmedia: {} as SocialMedia,
      guid: crypto.randomUUID(),
    };
  },
  methods: {
    add(socialMedia: SocialMedia): void {
      this.input.push(socialMedia);
      this.$emit("update", this.input);
      this.socialmedia = {} as SocialMedia;
    },
    splice(element: SocialMedia): void {

      this.input.splice(this.input.indexOf(element), 1);
      this.$emit("update", this.input);
    },
  },
};
</script>
