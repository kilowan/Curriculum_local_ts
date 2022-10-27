<template>
  <div>
    <div
      v-for="(socialMediaData, index) in socialMediaList"
      v-bind:key="index"
      class="d-flex"
    >
      <social-media-view :socialMediaData="socialMediaData" />
      <b-link v-if="!iconsHidden" @click="$bvModal.show(`edit-social-media-${index}`)">
        <b-icon icon="pencil-square" aria-hidden="true" />
      </b-link>
      <b-link
        v-if="!iconsHidden"
        @click="$bvModal.show(`delete-media-${index}`)"
      >
        <b-icon icon="x-circle-fill" aria-hidden="true" />
      </b-link>
      <b-modal
        :id="`edit-social-media-${index}`"
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
      <b-modal
        :id="`delete-media-${index}`"
        title="Eliminar Red social"
        ok-title="Eliminar"
        @ok="del(socialMediaData, index)"
      >
        <div style="text-align: center; margin: 0 auto; width: 380px">
          <h1>
            ¿Seguro que quieres eliminar el elemento '{{
              socialMediaData.name
            }}'?
          </h1>
        </div>
      </b-modal>
    </div>
    <b-link v-if="!iconsHidden" :hidden="count === 0" @click="$bvModal.show('add-social-media')">
      <b-icon icon="plus-circle-fill" aria-hidden="true" /> Añadir Red social
    </b-link>
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
import { SocialMediaType, SocialMedia } from "../../Config/types";

export default {
  name: "SocialMediaListView",
  components: {
    SocialMediaView,
  },
  props: {
    iconsHidden: {
      type: Boolean,
      required: true,
      default: false,
    }
  },
  data() {
    return {
      types: [
        { value: SocialMediaType.Linkedin, text: "Linkedin", disabled: false },
        { value: SocialMediaType.Infojobs, text: "Infojobs", disabled: false },
        { value: SocialMediaType.GitHub, text: "GitHub", disabled: false },
      ],
      socialmedia: {} as SocialMedia,
      count: 3,
      socialMediaList: new Array<SocialMedia>(),
    };
  },
  methods: {
    add(socialMedia: SocialMedia) {
      this.socialMediaList.push(socialMedia);
      var type = this.types.find(
        (element: any) => element.value === socialMedia.type
      );
      type.disabled = true;
      this.$emit("update", this.socialMediaList);
      this.socialmedia = {} as SocialMedia;
      this.count--;
    },
    del(media: SocialMedia, index: number) {
      this.$nextTick(() => {
        var type = this.types.find(
          (element: any) => element.value === media.type
        );
        type.disabled = false;
        this.socialMediaList.splice(index, 1);
        this.count++;
        this.$emit("update", this.socialMediaList);
      });
    },
    edit(data: SocialMedia) {
      var sm = this.socialMediaList.find(
        (element: any) => element.type === data.type
      );
      sm.name = data.name;

      this.$emit('update', data);
    },
  },
};
</script>
