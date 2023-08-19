<template>
  <div>
    <div
      v-for="socialMediaData in socialMediaList"
      v-bind:key="socialMediaData.guid"
      class="d-flex"
    >
      <social-media-view :socialMediaData="socialMediaData" />
      <EditLink v-if="!iconsHidden" @click="$bvModal.show(`edit-${socialMediaData.guid}`)"/>
      <DeleteLink v-if="!iconsHidden" @click="$bvModal.show(`delete-${socialMediaData.guid}`)"/>
      <b-modal
        :id="`edit-${socialMediaData.guid}`"
        title="Editar red social"
        ok-title="Guardar"
        @ok="edit(socialMediaData)"
      >
        <label>Url:</label>
        <input type="text" v-model="socialMediaData.name" /> <br />
        <label>Tipo:</label>
        <b-form-select
          disabled
          :options="types"
          v-model="socialMediaData.type"
        ></b-form-select>
        <br />
      </b-modal>
      <delete-modal
        :modal-title="'Red social'"
        :message="'la red social'"
        :component-data="socialMediaData"
        @remove="del(socialMediaData)"
      />
    </div>
    <AddLink v-if="!iconsHidden" :hidden="count === 0" :text="'Red social'" @click="$bvModal.show('add-social-media')"/>
    <b-modal
      :id="'add-social-media'"
      title="Añadir Red Social"
      ok-title="Guardar"
      @ok="add(socialmedia)"
      @ok-prevent="socialmedia.name == ''"
    >
      <label>Tipo</label>
      <b-form-select :options="types" v-model="socialmedia.type" /> <br />
      <div v-if="socialmedia.type === 1">
        <label>Id linkedin</label>
        <input type="text" v-model="socialmedia.name" />
      </div>
      <div v-else-if="socialmedia.type === 2">
        <label>Id infojobs</label>
        <input type="text" v-model="socialmedia.name" />
      </div>
      <div v-else>
        <label>Id github</label>
        <input type="text" v-model="socialmedia.name" />
      </div>
      <br /> </b-modal
    ><br />
  </div>
</template>

<script lang="ts">
import SocialMediaView from "./SocialMediaView.vue";
import { SocialMediaType, Component } from "../../Config/types";
import DeleteModal from "../Modal/DeleteModal.vue";
import AddLink from "@/components/AddLink.vue";
import DeleteLink from "@/components/DeleteLink.vue";
import EditLink from "@/components/EditLink.vue";

export default {
  name: "SocialMediaListView",
  components: {
    SocialMediaView,
    DeleteModal,
    AddLink,
    DeleteLink,
    EditLink
},
  props: {
    iconsHidden: {
      type: Boolean,
      required: true,
      default: false,
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
      socialMediaList: new Array<Component>(),
    };
  },
  methods: {
    add(socialMedia: Component): void {
      socialMedia.guid = crypto.randomUUID();
      this.socialMediaList.push(socialMedia);
      var type = this.types.find(
        (element: any) => element.value === socialMedia.type
      );
      if (type !== undefined) type.disabled = true;
      this.$emit("update", this.socialMediaList);
      this.socialmedia = {} as Component;
      this.count--;
    },
    del(media: Component): void {
      this.$nextTick(() => {
        let type = this.types.find(
          (element: any) => element.value === media.type
        );
        if (type !== undefined) type.disabled = false;
        this.socialMediaList = this.socialMediaList.filter(
          (data: Component) => data.guid !== media.guid
        );
        this.count++;
        this.$emit("update", this.socialMediaList);
      });
    },
    edit(data: Component): void {
      let sm = this.socialMediaList.find(
        (element: Component) => element.type === data.type
      );
      if (sm !== undefined) sm.name = data.name;

      this.$emit("update", data);
    },
  },
};
</script>
